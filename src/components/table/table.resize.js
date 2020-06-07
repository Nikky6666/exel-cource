import {$} from '@core/dom';

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        const type = event.target.dataset.resize;
        let value;
        const sideProp = type === 'col' ? 'bottom' : 'right';

        const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
        $resizer.css({
            opacity: 1,
            zIndex: 1000,
            [sideProp]: '-5000px'
        })

        document.onmousemove = (ev) => {
            if (type === 'col') {
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

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null
            if (type === 'col') {
                $parent.css({
                    width: `${value}px`
                })
                cells.forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({
                    height: `${value}px`
                })
            }
            resolve({
                type,
                value,
                id: $parent.data[type]
            })
            $resizer.css({
                opacity: 0,
                zIndex: 'unset',
                [sideProp]: '0',
                transform: `translateX(0) translateY(0)`
            })
        }
    })
}
