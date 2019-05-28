class ValidatorList {
    constructor(msg = 'Ошибка ввода данных'){
        this.errorMessage = msg;
    }
    toString() {
        return this.errorMessage;
    }
}

export class Required extends ValidatorList {
    constructor () {
        super('Поле должно быть заполненным');
    }
    test(value) {
        return value.length > 0;
    }
}

export class RequiredTemp extends ValidatorList {
    constructor () {
        super('Поле должно быть заполненным');
    }
    test(value) {
        return value.length > 0 && value !== 'Описание товара...';
    }
}

export class MinLength extends ValidatorList {
    constructor () {
        super('Должно быть минимум 7 символов');
    }
    test(value) {
        return value.length >= 7;
    }
}

export class MaxLength extends ValidatorList {
    constructor () {
        super('Должно быть максимум 100 символов');
    }
    test(value) {
        return value.length <= 100;
    }
}

export class Email extends ValidatorList {
    constructor () {
        super('Неверный е-мейл адрес');
    }
    test(value) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(value);
    }
}

export class Selected extends ValidatorList {
    constructor () {
        super('Выберите категорию');
    }

    test(index) {
        return index >= 0 || index === 'new' || index === 'used';
    }
}

