 export class Emitter {
    constructor() {
        this.listeners = {};
    }
    // уведомлем слушателей
    emit(eventName, ...args) {
        if (Array.isArray(this.listeners[eventName])) {
            this.listeners[eventName].forEach(listener => {
                listener(...args)
            })
        }
    }
 //   добавляем нового слушателя
    subscribe(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
        return () => {
            this.listeners[eventName] = this.listeners[eventName].filter(listener => {
                return listener!==fn
            })
        }
    }
}
