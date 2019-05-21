import { EventEmiter } from './event-emiter';

export class BoardModel extends  EventEmiter {
    /**
     * get JSON data from server
     * @param {string} url - url address
     * @param {string} eventName - event name of getting data
     */
    constructor (url, eventName) {
        super();
        this._items = null;
        this._url = url;
        this._eventName = eventName;
        this.init();
    }

    /**
     * get data from server
     */
    init() {
        fetch(this._url, { headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(data => {
                this._items = data;
                this.emit(this._eventName, this._items);
            })
            .catch(error => console.error(error));
    }

    /**
     * get data from model
     * @returns {null|*}
     */
    getItems () {
        return this._items;
    }
}
