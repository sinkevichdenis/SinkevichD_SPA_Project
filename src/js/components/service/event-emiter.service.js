export class EventEmiter {
    constructor() {
        this._events = {};
    }

    /**
     * sibscribe on event
     * @param {string} event - event name
     * @param {function} listener - necessary action
     * @returns {EventEmiter}
     */
    on(event, listener) {
        (this._events[event] || (this._events[event] = [])).push(listener);
        return this;
    }

    /**
     * summon action
     * @param event - event name
     * @param arg - return argument
     * @returns {EventEmiter}
     */
    emit(event, arg) {
        (this._events[event] || []).forEach(listener => listener(arg));
        return this;
    }
}
