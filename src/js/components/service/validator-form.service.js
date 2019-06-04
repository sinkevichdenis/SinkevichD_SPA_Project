import { EventEmiter } from './event-emiter.service';

export class ValidatorFormService extends EventEmiter {
	constructor(id, helper) {
		super();
		this._helper = helper;
		this._formElements = [];
		this._isValid = false;
		this._form = document.getElementById(id);

		this.init();
	}

	/**
	 * form validation in general
     */
	init() {
		let classChanger = new this._helper(this._form, ['validation-error']);

		this._form.querySelector('button').addEventListener('click', () => {
			this._formElements.forEach(item => {
				item.check();
			});

			this._isValid = this.getStatus();
			if (!this._isValid) {
				classChanger.addClass();

				this._form.addEventListener('input', () => {
					this._isValid = this.getStatus();
					this._isValid && classChanger.removeClass();
				});

				this._form.addEventListener('change', () => {
					this._isValid = this.getStatus();
					this._isValid && classChanger.removeClass();
				});
			}

			this.emit('changedFormStatus', this._isValid);
		});
	}


	/**
	 * add new elements to testing
     * @param item
     */
	registerElements (item) {
		this._formElements.push(item);
	}

	/**
	 * get validation status
     * @returns {boolean}
     */
	getStatus() {
		let status = true;

		this._formElements.forEach(item => {
			if (!item._isValid) {
				status = false;
			}
		});

		return status;
	}

}
