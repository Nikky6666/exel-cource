import {ExelComponent} from '@core/ExelComponent';
import {$} from '@core/dom';

export class Formula extends ExelComponent {
    static className = 'excel__formula';
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }
    toHTML() {
        return `
        <div class="formula-info">fx</div>
            <div id="formula" class="formula-input" contenteditable spellcheck="false"></div>
`
    }
    init() {
        super.init();
        this.$formula = this.$root.find('#formula')
       // console.log(this.$formula)
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })
        this.$on('table:input', ($cell) => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
      this.$emit('formula:input', $(event.target).text())
    }
    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        const {key} = event;
        if (keys.includes(key)) {
            event.preventDefault()
            this.$emit('formula:enter');
        }
    }
}
