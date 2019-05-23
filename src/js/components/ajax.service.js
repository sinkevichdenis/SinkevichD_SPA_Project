import { EventEmiter } from './event-emiter.service';

export class Ajax extends  EventEmiter {
    /**
     * create ajax connection with server
     * @param {string} url - url address
     * @param {string} eventName - event name of getting data
     * @param {undefined, function} onEvent - add events to subscribe
     */

   constructor (url, eventName, onEvent = undefined) {
        super();
        this._items = null;
        this._url = url;
        this._eventName = eventName;
        !!onEvent && onEvent();
   }

    /**
     * get data from server
     * @param {undefined, function} func - add addition function
     */
    get(func = undefined) {
        fetch(this._url, { headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(data => {
                this._items = data;
                this.emit(this._eventName, this._items);

                !!func && func();
            })
            .catch(error => console.error(error));
    }

    /**
     * get data from property-storage
     * @returns {null|*}
     */
    getItems () {
        return this._items;
    }
}