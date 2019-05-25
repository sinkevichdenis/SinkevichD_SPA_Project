import { EventEmiter } from './event-emiter.service';
import { Ajax } from './ajax.service';
import { renderMixin } from '../render.mixin';

export class AddDataService extends EventEmiter {
    constructor() {
        super();
        this._ajax = new Ajax('http://localhost:3006/products', 'postNewProduct', false);
        this._form = document.getElementById('form-add-product');
        this._formData = null;
        this.addMixin();
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

    events() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();

            switch (event.target.id) {
                case 'form-add-product':
                    this.createProductData();
                    this.codeProductImage();
                    break;
                default:
                    window.location.hash = '#error';
            }
        })
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
                this._ajax.post(this._formData);
            };

            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        } else {
            this._formData.images = "./src/assets/product_images/no_photo.png";
        }
    }
}