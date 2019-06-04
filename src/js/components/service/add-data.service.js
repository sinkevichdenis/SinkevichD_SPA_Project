import { EventEmiter } from './event-emiter.service';
import { Ajax } from './ajax.service';
import { renderMixin } from '../mixins/render.mixin';
import { CONFIG } from '../../config';
import { ValidatorView } from '../view/validator.view';

export class AddDataService extends EventEmiter {
	constructor() {
		super();
		this.addMixin();
		this._ajax = null;
		this._users = null;
		this._forms = Array.from(this.findAll('form'));
		this._formData = null;

		this.initAjax();
		this.events();
	}

	/**
     * add mixin to make easier looking at elements
     */
	addMixin() {
		for (let key in renderMixin) {
			AddDataService.prototype[key] = renderMixin[key];
		}
	}

	initAjax() {
		let ajax = new Ajax(CONFIG.serverJsonUsers, 'getUsersList');

		ajax.on('getUsersList', data => {
			this._users = data;
			this.emit('getUsersData');
		});

		this.on('postNewUser', () => {
			ajax.get();
		});

		ajax.get();
	}

	/**
     * post data
     * @param {string} url
     * @param {string} eventName
     */
	postData(url, eventName) {
		this._ajax = new Ajax(url, eventName, false);
		this._ajax.post(this._formData);
		this.emit('renewedData');
		this.clearForms();
	}

	/**
     * display page about successful send data
     * @param {string} text
     */
	showSuccessfulPage(text, pageClass = undefined){
		let page = this.find('.product_loaded');
		this.findId('title_loaded-page').innerHTML = text;
		this.show(page);

		pageClass && this.hide(this.find(pageClass));

		setTimeout(() => {
			this.hide(page);
			if (window.location.hash === '#registration') {
				window.history.back();
			}
		}, 2500);
	}

	/**
     * add form events
     */
	events() {
		this._forms = this._forms.filter(item => {
			let collection = item.getElementsByClassName('btn-validate');
			return !!(collection.length);
		});

		this._forms.forEach(item => {
			let validateButton = item.getElementsByClassName('btn-validate')[0];
			this.addValidator(item);

			validateButton.addEventListener('click', (event) => {
				event.preventDefault();
			});
		});

		// clear forms when hash changed
		window.addEventListener('hashchange', () => {
			this.clearForms();
		});
	}

	clearForms() {
		this._forms.forEach(item => {
			item.querySelectorAll('input').forEach(elem => elem.value = '');
			item.querySelectorAll('textarea').forEach(elem => elem.value = '');
			item.querySelectorAll('select').forEach(elem => elem.selectedIndex = 0);

			item.querySelectorAll('.validation-error').forEach(elem => elem.classList.remove('validation-error'));
			item.classList.remove('validation-error');
			item.querySelectorAll('.error-list').forEach(elem => {
				elem.style.height = 0;
				elem.innerHTML = '';
			});
		});
	}

	/**
	 * add validator in form
     * @param {element} form
     */
	addValidator(form) {
		switch (form.id) {
		case 'form-add-product':
			let validatorProduct = new ValidatorView();
			validatorProduct.validateProductForm(form.id);
			validatorProduct.on('validatedForm', isFormValid => {
				if (isFormValid) {
					this.createProductData();
					this.codeProductImage();
				}
			});
			break;
		case 'user_registration':
			let validatorReg = new ValidatorView();
			validatorReg.validateRegForm(form.id);
			validatorReg.on('validatedForm', isFormValid => {
				if (isFormValid) {
					this.createUserData();
				}
			});
			break;
		case 'user_enter':
			let validatorEnter = null;
			this.on('getUsersData', () => {
				let user = null;
				// make singleton to don't call validation events twice
				if (validatorEnter === null) {
					validatorEnter = new ValidatorView();
					validatorEnter.validateEnterForm(this.getEnterFormData(), this._users);
					validatorEnter.on('getUserData', data => {
						user = data;
					});
					validatorEnter.on('validatedForm', isFormValid => {
						if (isFormValid) {
							this.emit('enterUser', user);
						}
					});

				} else {
					validatorEnter.setUsers(this._users);
				}
			});
			break;
		}
	}

	getEnterFormData() {
		return {
			'login': this.findId('user_login'),
			'loginErr': this.findId('user_login-error'),
			'password': this.findId('user_password'),
			'passwordErr': this.findId('user_password-error'),
			'button': this.findId('user_btn-enter')
		};
	}

	createUserData() {
		this._formData = {
			'login': this.findId('reg_login').value.trim(),
			'password': this.findId('reg_password').value,
			'email': this.findId('reg_email').value.trim(),
			'date': Date.now()
		};

		this.postData(CONFIG.serverJsonUsers, 'postNewUser');
		this.emit('postNewUser');
		this.showSuccessfulPage('Вы успешно зарегистрировались.', '.user_registration');
	}


	/**
     * collect product's data
     */
	createProductData() {
		let userId = null;
		if (localStorage.getItem(CONFIG.storageUserKey)) {
			userId = localStorage.getItem(CONFIG.storageUserKey);
		}

		this._formData = {
			'userId': userId,
			'userName': this.findId('add_name').value.trim(),
			'userPhone': this.findId('add_phone').value.trim(),
			'direction': this.findId('add_dir').options[this.findId('add_dir').selectedIndex].value,
			'subdirection': this.findId('add_subdir').options[this.findId('add_subdir').selectedIndex].value,
			'images': null,
			'title': this.findId('add_title').value.trim(),
			'text': this.findId('add_text').value.trim(),
			'condition': this.findId('add_condition').options[this.findId('add_condition').selectedIndex].value,
			'price': this.findId('add_price').value + ' p',
			'place': this.findId('add_place').value.trim(),
			'date': Date.now(),
		};
	}

	/**
     * load image
     */
	codeProductImage() {
		let file = this.findId('add_image').files[0];
		if (file) {
			let reader = new FileReader();
			reader.readAsDataURL(file);

			reader.onloadend = () => {
				this._formData.images = reader.result;
				this.postData(CONFIG.serverJsonProducts, 'postNewProduct');
				this.showSuccessfulPage('Ваше объявление успешно добавлено.');
			};

			reader.onerror = (error) => {
				console.error(error);
			};
		} else {
			this._formData.images = CONFIG.defaultProductImage;
			this.postData(CONFIG.serverJsonProducts, 'postNewProduct');
			this.showSuccessfulPage('Ваше объявление успешно добавлено.');
		}
	}

}