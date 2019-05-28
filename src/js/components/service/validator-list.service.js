class ValidatorListService {
    constructor(msg = 'Common error message'){
        this.errorMessage = msg;
    }
    toString() {
        return this.errorMessage;
    }
}

export class Required extends ValidatorListService {
    constructor () {
        super('This field is required.');
    }
    test(value) {
        return value.length > 0;
    }
}

export class MinLength extends ValidatorListService {
    constructor () {
        super('Min length should be 7');
    }
    test(value) {
        return value.length >= 7;
    }
}

export class Email extends ValidatorListService {
    constructor () {
        super('Invalid e-mail address');
    }
    test(value) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(value);
    }
}