import { ValidatorFormService } from '../service/validator-form.service';
import { ValidatorChangerService } from '../service/validator-changer.service';
import { ValidatorElementService } from '../service/validator-element.service';
import { EventEmiter } from '../service/event-emiter.service';

export class ValidatorView extends EventEmiter{
	constructor() {
		super();
		this._form = null;
		this._users = null;
		this._controls = [];
		this._funcHelper = ValidatorChangerService;
	}

	/**
	 * validate add-product form
     * @param {string} id - form's id
     */
	validateProductForm(id) {
		this._form = new ValidatorFormService(id, this._funcHelper);
		this._form.on('changedFormStatus', status => {
			this.emit('validatedForm', status);
		});

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

	/**
     * validate registration form
     * @param {string} id - form's id
     */
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
			this._form.registerElements(item);
		});
	}

	/**
	 * validate enter form
     * @param {element} form - enter form
     * @param {array} users - list of all users
     */
	validateEnterForm(form, users) {
		this._users = [...users];
		form.button.addEventListener('click', () => {
			let user = this._users.filter(item => item.login === form.login.value);

			if (user.length === 0) {
				form.loginErr.innerHTML = '<div> Неверный логин </div>';
				form.loginErr.style.height = '23px';

				setTimeout(() => {
					form.loginErr.innerHTML = '';
					form.loginErr.style.height = '0';
				}, 2000);
				return false;
			}

			if (user[0].password !== form.password.value) {
				form.passwordErr.innerHTML = '<div> Неверный пароль </div>';
				form.passwordErr.style.height = '23px';

				setTimeout(() => {
					form.passwordErr.innerHTML = '';
					form.passwordErr.style.height = '0';
				}, 2000);
				return false;
			}

			this.emit('getUserData', user[0]);
			this.emit('validatedForm', true);
			return true;
		});
	}

	/**
	 * set list of users
     * @param {array} users - list of all users
     */
	setUsers(users) {
		this._users = [...users];
	}

}
