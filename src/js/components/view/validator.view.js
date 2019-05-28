import { ValidatorFormService } from '../service/validator-form.service';
import { ValidatorChangerService } from '../service/validator-changer.service';
import { ValidatorElementService } from '../service/validator-element.service';
import { EventEmiter } from "../service/event-emiter.service";

export class ValidatorView extends EventEmiter{
    constructor() {
        super();
    }

    validateProductForm() {
        const funcHelper = ValidatorChangerService;
        const form = new ValidatorFormService('form-add-product', funcHelper);
        form.on('changedFormStatus', status => this.emit('validatedForm', status));

        const control1 = new ValidatorElementService('input', 'add_title', ['Required', 'MinLength'], funcHelper);
        const control2 = new ValidatorElementService('input', 'add_place', ['Required'], funcHelper);
        const control3 = new ValidatorElementService('input', 'add_name', ['Required'], funcHelper);

        form.registerElements(control1);
        form.registerElements(control2);
        form.registerElements(control3);
    }


}