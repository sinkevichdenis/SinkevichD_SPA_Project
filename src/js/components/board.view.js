import { EventEmiter } from './event-emiter.service';
import { Router } from './router.service'
import { Ajax } from './ajax.service';
import { renderMixin } from '../render.mixin';

export class BoardView extends  EventEmiter {
    constructor() {
        super();
        this._template = null;
        this._ajax = new Ajax('http://localhost:3006/products', 'getProductsList', this.ajaxAddEvents);
        this._router = new Router();
        this._products = null;

        this.initAjax();
        this.initRoutes();

        this.addMixin();
    }

    /* Service part */
    ajaxAddEvents() {
        // add subscriber on hashChange event in Ajax
        return () => {
            this.on('hashChanged', () => this.serverConnect());
        }
    }

    initAjax() {
        this._ajax.on('getProductsList', data => {
            this._products = data;
        });

        // get data from json-server and then create event
        this._ajax.get(() => {
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        })
    }

    initRoutes() {
        this._router.addRoute('', () => this.renderProductsList());
        this._router.addRoute('404', () => this.renderErrorPage());
        this._router.addRoute('#login', () => this.renderLoginPage());
        this._router.addRoute('#registration', () => this.renderRegistrationPage());
        this._router.addRoute('#empty', () => this.renderEmptyPage());
        this._router.addRoute('#add', () => this.renderAddProductPage());
        this._router.addRoute('#product', (id) => this.renderSinglePage(id));
    }

    addMixin() {
        for (let key in renderMixin) {
            BoardView.prototype[key] = renderMixin[key];
        }
    }

    /* Render pages part */
    renderErrorPage() {
        this.show(this.find('.error'));
        this.hide(this.findId('main-container'));
    }

    renderEmptyPage(){
        this.show(this.find('.board_empty'));
    }

    renderLoginPage() {
        this.show(this.find('.user_login'));
    }

    renderRegistrationPage() {
        this.show(this.find('.user_registration'));
    }

    renderAddProductPage() {
        this.show(this.find('.board_add-product'));
    }

    renderSinglePage(id) {
        //check product's id in hash
        if (id >= this._products.length) {
            this.renderEmptyPage();
        }
        const product = this._products[id];

        this.find('.product_image').src = `./src/assets/product_images/${product.images}`;
        this.find('.product_image').alt = product.title;
        this.find('.product_title').innerHTML = product.title;
        this.find('.product_content').innerHTML = product.content;
        this.find('.product_price').innerHTML = product.price;
        this.find('.product_user').innerHTML = product.userName;
        this.find('.product_number').innerHTML = product.userPhone;
        this.find('.product_place').innerHTML = product.place;
        this.find('.product_date').innerHTML = product.date;

        this.show(this.find('.product_single'));
    }

    renderProductsList() {
        this.getTemplate();

        let list = this.findId('board');
        this.show(list);
        const template = Handlebars.compile(this._template);
        let html = '';

        this._products.forEach(item => {
            html += template(item);
        });
        list.innerHTML = html;

        this.addHashLinks(list, '.board_product', 'product/');
    }

    getTemplate() {
        if (this.findId('board_list-template')) {
            this._template = this.findId('board_list-template').innerHTML;
        }
    }

    addHashLinks(elem, selector, prefix) {
        elem.querySelectorAll(selector).forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                if (event.currentTarget.classList.contains('board_product')){
                    window.location.hash = `${prefix}${event.currentTarget.dataset.href}`;
                }
            });
        });
    }
}