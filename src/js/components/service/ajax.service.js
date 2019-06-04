import { EventEmiter } from './event-emiter.service';

export class Ajax extends  EventEmiter {
	/**
     * create ajax connection with server
     * @param {string} url - url address
     * @param {string} eventName - event name of getting data
     * @param {boolean} isAddEvents - add events
     */
	constructor (url, eventName, isAddEvents = false) {
		super();
		this._items = null;
		this._url = url;
		this._eventName = eventName;

		isAddEvents && this.initEvent();
	}

	/**
     * add Events (repeat getting data from server)
     */
	initEvent() {
		setInterval(()=> {
			try {
				this.get();
			} catch (e) {
				console.log('Server isn\'t available');
			}
		}, 180000);
	}

	/**
     * get data from property-storage
     * @returns {null|*}
     */
	getItems () {
		return this._items;
	}

	/**
     * get data from server
     * @param {undefined, function} func - add addition function
     */
	get(func = undefined) {
		fetch(this._url, {
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.json())
			.then(data => {
				this._items = data;
				this.emit(this._eventName, this._items);

				!!func && func();
			})
			.catch(error => console.error(error));
	}

	/**
     * send data to server
     * @param {object} formData - data object
     */
	post(formData) {
		fetch(this._url, {
			method: 'POST',
			headers : { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		})
			.then(response => response.json())
			.catch(error => console.error(error));
	}

	/**
	 * delete data from server
     * @param {string} id - id
     */
	delete(id) {
		fetch(`${this._url}/${id}`, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.catch(error => console.error(error));
	}

}
