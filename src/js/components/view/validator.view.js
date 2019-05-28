import { ValidatorFormService } from '../service/validator-form.service';
import { ValidatorChangerService } from '../service/validator-changer.service';
import { ValidatorElementService } from '../service/validator-element.service';
import { EventEmiter } from "../service/event-emiter.service";
import {MaxLength, OnlyRus} from "../service/validator-list.service";

export class ValidatorView extends EventEmiter{
    constructor() {
        super();
    }

    validateProductForm() {
        const funcHelper = ValidatorChangerService;
        const form = new ValidatorFormService('form-add-product', funcHelper);
        form.on('changedFormStatus', status => this.emit('validatedForm', status));

        const control1 = new ValidatorElementService('input', 'add_title', ['Required', 'MinLength'], funcHelper);
        const control2 = new ValidatorElementService('input', 'add_text', ['MaxLength', 'RequiredTemp'], funcHelper);
        const control3 = new ValidatorElementService('input', 'add_place', ['Required'], funcHelper);
        const control4 = new ValidatorElementService('input', 'add_name', ['Required'], funcHelper);
        const control5 = new ValidatorElementService('input', 'add_phone', ['MinLength'], funcHelper);
        const control6 = new ValidatorElementService('input', 'add_price', ['Required'], funcHelper);
        const control7 = new ValidatorElementService('select', 'add_dir', ['Selected'], funcHelper, 'select');
        const control8 = new ValidatorElementService('select', 'add_subdir', ['Selected'], funcHelper, 'select');
        const control9 = new ValidatorElementService('select', 'add_condition', ['Selected'], funcHelper, 'select');


        form.registerElements(control1);
        form.registerElements(control2);
        form.registerElements(control3);
        form.registerElements(control4);
        form.registerElements(control5);
        form.registerElements(control6);
        form.registerElements(control7);
        form.registerElements(control8);
        form.registerElements(control9);
    }


}