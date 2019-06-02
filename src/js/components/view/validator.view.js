import { ValidatorFormService } from '../service/validator-form.service';
import { ValidatorChangerService } from '../service/validator-changer.service';
import { ValidatorElementService } from '../service/validator-element.service';
import { EventEmiter } from '../service/event-emiter.service';

export class ValidatorView extends EventEmiter{
	constructor() {
		super();
		this._form = null;
		this._controls = [];
		this._funcHelper = ValidatorChangerService;
	}

	validateProductForm(id) {
        this._form = new ValidatorFormService(id, this._funcHelper);
        this._form.on('changedFormStatus', status => this.emit('validatedForm', status));

        this._controls[0] = new ValidatorElementService('input', 'add_title', ['Required', 'MinLength'], this._funcHelper);
        this._controls[1] = new ValidatorElementService('input', 'add_text', ['MaxLength', 'Required'], this._funcHelper);
        this._controls[2] = new ValidatorElementService('input', 'add_place', ['Required'], this._funcHelper);
        this._controls[3] = new ValidatorElementService('input', 'add_name', ['Required'], this._funcHelper);
        this._controls[4] = new ValidatorElementService('input', 'add_phone', ['MinLength'], this._funcHelper);
        this._controls[5] = new ValidatorElementService('input', 'add_price', ['Required'], this._funcHelper);
        this._controls[6] = new ValidatorElementService('select', 'add_dir', ['Selected'], this._funcHelper, 'select');
        this._controls[7] = new ValidatorElementService('select', 'add_subdir', ['Selected'], this._funcHelper, 'select');
        this._controls[8] = new ValidatorElementService('select', 'add_condition', ['Selected'], this._funcHelper, 'select');

        this._controls.forEach(item => {
            this._form.registerElements(item);
		});
	}

    validateRegForm(id) {
        this._form = new ValidatorFormService(id, this._funcHelper);
        this._form.on('changedFormStatus', status => {
            this.emit('validatedForm', status);
        });
        this._controls[0] = new ValidatorElementService('input', 'reg_login', ['Required'], this._funcHelper);
        this._controls[1] = new ValidatorElementService('input', 'reg_password', ['Required', 'MinLength'], this._funcHelper);
        this._controls[2] = new ValidatorElementService('input', 'reg_password-repeat', ['Required', 'Repeated'], this._funcHelper);
        this._controls[3] = new ValidatorElementService('input', 'reg_email', ['Email'], this._funcHelper);

        this._controls.forEach(item => {
            this._form. registerElements(item);
        });
    }

}
