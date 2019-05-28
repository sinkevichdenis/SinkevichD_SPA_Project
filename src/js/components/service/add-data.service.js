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
        this._validator = new ValidatorView();
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

    postData(url, eventName) {
        this._ajax = new Ajax(url, eventName, false);
        this._ajax.post(this._formData);
    }

    showSuccessfulPage(text){
        let page = this.find('.product_loaded');
        this.findId('title_loaded-page').innerHTML = text;
        this.show(page);

        setTimeout(() => {
            this.hide(page);
        }, 2500);
    }

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

                console.log('END');
            })
        });
    }

    addValidator(form) {
        switch (form.id) {
            case 'form-add-product':
                this._validator.validateProductForm();
                this._validator.on('validatedForm', isFormValid => {
                    console.log('ONisFormValid', isFormValid);
                    if (isFormValid) {
                        this.createProductData();
                        this.codeProductImage();
                    }
                });
                break;
        }
    }

    createData(form) {
        switch (form.id) {
            case 'form-add-product':
                this.createProductData();
                this.codeProductImage();
                break;
            default:
                window.location.hash = '#error';
        }
    }

    createProductData() {
        this._formData = {
            "userId": null,
            "userName": this.findId('add_name').value,
            "userPhone": this.findId('add_phone').value,
            "direction": this.findId('add_dir').options[this.findId('add_dir').selectedIndex].value,
            "subdirection": this.findId('add_subdir').options[this.findId('add_subdir').selectedIndex].value,
            'images': null,
            "title": this.findId('add_title').value,
            "text": this.findId('add_text').value,
            "condition": this.findId('add_condition').options[this.findId('add_condition').selectedIndex].value,
            "price": this.findId('add_price').value + ' p',
            "place": this.findId('add_place').value,
            "date": Date.now(),
        };
    }

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