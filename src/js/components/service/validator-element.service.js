import * as ValidatorList from './validator-list.service.js';

export function ValidatorElementService(type, id, validators, helper, flag) {
	switch (type) {
	case 'input':
		return new ValidatorOfElement(id, validators, helper);
	case 'select':
		return new ValidatorOfElement(id, validators, helper, flag);
	default:
		throw new Error('Invalid form type!');
	}
}

class ValidatorOfElement {
	constructor (id, validators, helper, flag = undefined) {
		this._id = id;
		this._elem = document.getElementById(id);
		this._validators = new Set(validators);
		this._helper = helper;
		this._validationErrors = new Set();
		this._isValid = null;
		this._flag = !!flag;

		this.init(this._flag);
	}

	init(boolean) {
		const self = this;
        boolean ? this._elem.addEventListener('change', this.check.bind(self))
			: this._elem.addEventListener('input', this.check.bind(self));
	}

	check () {
        let classChanger = new this._helper(this._elem, ['validation-error']);
		const errorContainer = document.getElementById(`${this._id}-error`);
		let text = '';
		let stringCount = 0;

		this._isValid = this.getValidation();
		this._validationErrors.forEach(error => {
			text += `<div>${error}</div>`;
			stringCount++;
		});

        errorContainer.innerHTML = text;
		if (!this._isValid) {
			classChanger.addClass();
			errorContainer.style.height = stringCount * 23 + 'px';
		} else {
			classChanger.removeClass();
			errorContainer.style.height = '0';
		}
	}

	/**
     * get validation all tests from element
     */
	getValidation() {
		let isValid = [];

        this._validators.forEach((item) => {
			let validator = new ValidatorList[item]();
			isValid.push(this.testValidator(validator));
		});
        return !isValid.some(item => (item === false));
	}

	/**
     * get validation only one test from element
     */
	testValidator(validator){
		if (!(validator.test(this._elem.value))) {
			this._validationErrors.add(validator.toString());
			return false;
		} else {
			this._validationErrors.delete(validator.toString());
			return true;
		}
	}
}