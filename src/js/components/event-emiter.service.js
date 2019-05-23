export class EventEmiter {
    constructor() {
        this._events = {};
    }

    on(event, listener) {
        (this._events[event] || (this._events[event] = [])).push(listener);
        return this;
    }

    emit(event, arg) {
        (this._events[event] || []).forEach(listener => listener(arg));
        return this;
    }
}
