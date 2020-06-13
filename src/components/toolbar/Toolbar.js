import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultCellsStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentCellStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultCellsStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    storeChanged({currentCellStyles}) {
        this.setState(currentCellStyles)
    }

    onClick(event) {
     const $target = $(event.target);
     if ($target.data.type === 'button') {
         const value = JSON.parse($target.data.value)
         this.$emit('toolbar:applyStyle', value)
     }
    }
    toHTML() {
        return this.template
    }
}
