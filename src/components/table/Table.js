import {ExelComponent} from '@core/ExelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, shouldResize, nextSelector} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import * as actions from '@/redux/actions.js'
import {defaultCellsStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            subscribe: ['tableTitle'],
            ...options
        });
    }

    toHTML() {
      //  console.log(this.store)
        return createTable(20, this.$getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current.attr('data-value', text)
            .text(parse(text));
           this.updateTextInStore(text)
        })
        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })
        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value);
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell);
        this.updateTextInStore($cell.data.value);
        const cellStyles = $cell.getStyles(Object.keys(defaultCellsStyles));
        this.$dispatch(actions.changeStyles(cellStyles));
    }

    async tableResize(event) {
        try {
            const data = await resizeHandler(this.$root, event);
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.log('table resize error: ', e)
        }
    }


    onMousedown(event) {
        if (shouldResize(event)) {
           this.tableResize(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($(event.target))
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ];
        const {key} = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id));
            this.selectCell($next)
        }
    }

    updateTextInStore(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value: text
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}


