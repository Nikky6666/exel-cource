import {ExelComponent} from '@core/ExelComponent';
import * as actions from '@/redux/actions'
import {$} from '@core/dom';
import {debounce} from '@core/utils';

export class Header extends ExelComponent {
    static className = 'excel__header';
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
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
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>`;
    }

    onInput(e) {
        const $target = $(e.target);
        this.$dispatch(actions.changeTitle($target.text()))
    }
}
