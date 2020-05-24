import {$} from '@core/dom';

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const resize = event.target.dataset.resize;
    let value;
    const sideProp = resize === 'col' ? 'bottom' : 'right';

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
    $resizer.css({
        opacity: 1,
        zIndex: 1000,
        [sideProp]: '-5000px'
    })

    document.onmousemove = (ev) => {
        if (resize === 'col') {
            const delta = Math.floor(ev.pageX - coords.right);
            value = coords.width + delta;
            $resizer.css({
                transform: `translateX(${delta}px)`,
            })
        } else {
            const delta = Math.floor(ev.pageY - coords.bottom);
            value = coords.height + delta;
            $resizer.css({
                transform: `translateY(${delta}px)`,
            })
        }
    }

    document.onmouseup = (ev) => {
        document.onmousemove = null;
        document.onmouseup = null
        if (resize === 'col') {
            $parent.css({
                width: `${value}px`
            })
            $resizer.css({

                transform: `translateX(0)`
            })
            cells.forEach(el => el.style.width = value + 'px')
        } else {
            $parent.css({
                height: `${value}px`
            })

            $resizer.css({
                transform: `translateY(0px)`,
            })
        }
        $resizer.css({
            opacity: 0,
            zIndex: 'unset',
            [sideProp]: '0'
        })
    }
}
