import {ExelComponent} from '@core/ExelComponent';
import * as actions from '@/redux/actions'
import {$} from '@core/dom';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            subscribe: ['tableTitle'],
            ...options
        });
    }
    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const title = this.$getState().tableTitle;
        return `
            <input type="text" class="input" value="${title}" />
            <div>
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">delete</span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">exit_to_app</span>
                </div>
            </div>`;
    }


    onInput(e) {
        console.log('')
        const $target = $(e.target);
        this.$dispatch(actions.changeTitle($target.text()))
    }

    onClick(event) {
        const $target = $(event.target);
        if ($target.data.button === 'remove') {
            const decision = confirm('Вы действительно хотите удалить эту таблицу?');
            if (decision) {
                localStorage.removeItem(`excel:${ActiveRoute.param}`);
                ActiveRoute.navigate('')
            }
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}
