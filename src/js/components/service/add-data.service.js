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
		this._forms = Array.from(this.findAll('form'));
		this._formData = null;
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
	showSuccessfulPage(text){
		let page = this.find('.product_loaded');
		this.findId('title_loaded-page').innerHTML = text;
		this.show(page);

		setTimeout(() => {
			this.hide(page);
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
        })
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
		}
	}

    createUserData() {
        this._formData = {
            'login': this.findId('reg_login').value,
            'password': this.findId('reg_password').value,
            'email': this.findId('reg_email').value,
            'date': Date.now()
        };

        console.log(this._formData);
        this.postData(CONFIG.serverJsonUsers, 'postNewUser');
        this.showSuccessfulPage('Ваше объявление успешно добавлено.');
    }


    /**
     * collect product's data
     */
	createProductData() {
		this._formData = {
			'userId': null,
			'userName': this.findId('add_name').value,
			'userPhone': this.findId('add_phone').value,
			'direction': this.findId('add_dir').options[this.findId('add_dir').selectedIndex].value,
			'subdirection': this.findId('add_subdir').options[this.findId('add_subdir').selectedIndex].value,
			'images': null,
			'title': this.findId('add_title').value,
			'text': this.findId('add_text').value,
			'condition': this.findId('add_condition').options[this.findId('add_condition').selectedIndex].value,
			'price': this.findId('add_price').value + ' p',
			'place': this.findId('add_place').value,
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