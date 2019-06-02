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

	init() {
		let classChanger = new this._helper(this._form, ['validation-error']);
        console.log(this._form);

        this._form.querySelector('button').addEventListener('click', () => {
            console.log('button');
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
            console.log('before', this._isValid);
            this._isValid = false;
            console.log('after', this._isValid);

		});
	}


	registerElements (item) {
		this._formElements.push(item);
	}

	getStatus() {
		let status = true;

		this._formElements.forEach(item => {
            console.log('item', item._isValid);
            if (!item._isValid) {
				status = false;
			}
		});

		return status;
	}

}
