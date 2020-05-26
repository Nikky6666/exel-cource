import {DOMListener} from '@core/DOMListener';

export class ExelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter
        this.prepare();
        this.unsubscribers = []
    }
    // Настройка компонента до init
    prepare() {

    }

    //Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    // подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    // возвращаем шаблон компонента
    toHTML() {
        return '';
    }
    // инициализация компонента
    // добавляем DOM слушателей
    init() {
        this.initDOMListeners();
    }
    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach(unsub => unsub())
    }
}
