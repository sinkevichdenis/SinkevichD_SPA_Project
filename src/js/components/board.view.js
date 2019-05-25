import { EventEmiter } from './event-emiter.service';
import { Router } from './router.service'
import { Ajax } from './ajax.service';
import { renderMixin } from '../render.mixin';

export class BoardView extends  EventEmiter {
    constructor() {
        super();
        this._template = null;
        this._ajax = new Ajax('http://localhost:3006/products', 'getProductsList', true);
        this._router = new Router();
        this._products = null;

        this.initAjax();
        this.initRoutes();

        this.addMixin();
    }

    /* Service part */
    initAjax() {
        this._ajax.on('getProductsList', data => {
            this._products = data.reverse();
        });

        // get data from json-server and then create event
        this._ajax.get(() => {
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        })
    }

    initRoutes() {
        this._router.addRoute('', () => this.renderProductsList(), false);
        this._router.addRoute('#', () => this.renderProductsList(), false);
        this._router.addRoute('404', () => this.renderErrorPage(), true);
        this._router.addRoute('#login', () => this.renderOtherPage('.user_login'), true);
        this._router.addRoute('#registration', () => this.renderOtherPage('.user_registration'), true);
        this._router.addRoute('#empty', () => this.renderOtherPage('.board_empty'), false);
        this._router.addRoute('#add', () => this.renderOtherPage('.board_add-product'), false);
        this._router.addRoute('#room', () => this.renderErrorPage(), false);
        this._router.addRoute('#product', (id) => this.renderSinglePage(id), true);
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

    renderOtherPage(selector) {
        this.show(this.find(selector));
    }

    checkProductsId(id) {
        //check product's id in hash
        let isRealId = this._products.some((item) => {
            return id === item.id;
        });

        if (!isRealId) {
            window.history.replaceState({}, 'start page', '#empty');
            //replace don't call hashchange event
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
    }

    renderSinglePage(id) {
        this.checkProductsId(id);

        const product = this._products[id];

        this.find('.product_image').src = `./src/assets/product_images/${product.images}`;
        this.find('.product_image').alt = product.title;
        this.find('.product_title').innerHTML = product.title;
        this.find('.product_text').innerHTML = product.content;
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