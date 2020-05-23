import {ExelComponent} from '@core/ExelComponent';

export class Formula extends ExelComponent {
    static className = 'excel__formula';
    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }
    toHTML() {
        return `
        <div class="formula-info">fx</div>
            <div class="formula-input" contenteditable spellcheck="false"></div>
`
    }

    onInput(event) {
        console.log(this.$root)
        console.log('Formula: onInput', event.target.textContent)
    }
    onClick() {
        console.log('lick')
    }
}
