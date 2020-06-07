import {DOMListener} from '@core/DOMListener';

export class ExelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter
        this.store = options.store
        this.subscribe = options.subscribe || []
        this.prepare();
        this.unsubscribers = [];
    }
    // Настройка компонента до init
    prepare() {

    }

    $dispatch(action) {
        this.store.dispatch(action)
    }
    $getState() {
       return this.store.getState()
    }
    isWatching(key) {
        return this.subscribe.includes(key)
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
    // Сюда приходят изменения только по тем полям, на которые мы подписались
    storeChanged() {}

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
        this.unsubscribers.forEach(unsub => unsub());
    }
}
