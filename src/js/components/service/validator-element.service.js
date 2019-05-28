import * as ValidatorList from './validator-list.service.js';

export function ValidatorElementService(type, id, validators, helper) {
    switch (type) {
        case 'input':
            return new ValidatorInput(id, validators, helper);
        case 'select':
            //return new ValidatorSelect(id, validators, helper);
        default:
            throw new Error('Invalid form type!');
    }
}

class ValidatorInput {
    constructor (id, validators, helper) {
        this._id = id;
        this._elem = document.getElementById(id);
        this._validators = new Set(validators);
        this._helper = helper;
        this._validationErrors = new Set();
        this._isValid = this.getValidation.bind(this)();

        this.init();
    }

    init() {
        const self = this;
        this._elem.addEventListener('input', this.check.bind(self));
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
            errorContainer.style.height = stringCount * 25 + 'px';
        } else {
            classChanger.removeClass();
            errorContainer.style.height = '0';
        }
    }

    /**
     * get validation all form
     */
    getValidation() {
        let isValid = true;

        this._validators.forEach(item => {
            let validator = new ValidatorList[item]();
            isValid = this.testValidator.call(this, validator);
        });
        return isValid;
    }

    /**
     * get validation every item
     */
    testValidator(validator){
        let isValid = true;

        if (!(validator.test(this._elem.value))) {
            isValid = false;
            this._validationErrors.add(validator.toString());
        } else {
            this._validationErrors.delete(validator.toString());
        }
        return isValid;
    }
}