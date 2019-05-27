import { EventEmiter } from '../service/event-emiter.service';
import { Router } from '../service/router.service'
import { Ajax } from '../service/ajax.service';
import { renderMixin } from '../mixins/render.mixin';
import { CONFIG } from '../../config';

export class BoardView extends  EventEmiter {
    constructor(filterView) {
        super();
        this._template = null;
        this._ajax = new Ajax(CONFIG.serverJsonProducts, 'getProductsList', true);
        this._filter = filterView;
        this._filterTemp = null;
        this._router = new Router();
        this._products = null;

        this.init();
        this.initRoutes();

        this.addMixin();
    }

    /* Service part */
    init() {
        this._ajax.on('getProductsList', data => {
            this._products = data.reverse();
        });

        // get data from json-server and then create event
        this._ajax.get(() => {
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });
    }

    initRoutes() {
        this._router.addRoute('', () => this.renderProductsList(this._products));
        this._router.addRoute('#dir', () => this.renderProductsList(this._products));
        this._router.addRoute('#search', (data) => this.renderSearchList(data));
        this._router.addRoute('404', () => this.renderErrorPage(), 'TopPage');
        this._router.addRoute('#login', () => this.renderOtherPage('.user_login'), 'TopPage');
        this._router.addRoute('#registration', () => this.renderOtherPage('.user_registration'), 'TopPage');
        this._router.addRoute('#empty', () => this.renderOtherPage('.board_empty'));
        this._router.addRoute('#add', () => this.renderOtherPage('.board_add-product'));
        this._router.addRoute('#room', () => this.renderErrorPage());
        this._router.addRoute('#product', (id) => this.renderSinglePage(id), 'TopPage');
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
        const product = this._products.filter(item => item.id === id)[0];

        this.find('.product_image').src = product.images;
        this.find('.product_image').alt = product.title;
        this.find('.product_title').innerHTML = product.title;
        this.find('.product_content').innerHTML = product.text;
        this.find('.product_price').innerHTML = product.price;
        this.find('.product_user').innerHTML = product.userName;
        this.find('.product_number').innerHTML = product.userPhone;
        this.find('.product_place').innerHTML = product.place;
        this.find('.product_date').innerHTML = product.date;

        this.show(this.find('.product_single'));
    }

    filterProducts(allProducts){
        allProducts = (allProducts) ? allProducts : this._products;

        let filteredProducts = allProducts.filter(item => {
            return (this._filterTemp.dir === null || this._filterTemp.subdir === null)
                ? true : (this._filterTemp.dir === item.direction);
        });

        filteredProducts = filteredProducts.filter(item => {
            return (this._filterTemp.dir === null || this._filterTemp.subdir === null)
                ? true : (this._filterTemp.subdir === item.subdirection);
        });

        filteredProducts = filteredProducts.filter(item => {
            return (this._filterTemp.condition === item.condition
                || this._filterTemp.condition === 'all');
        });

        filteredProducts = filteredProducts.filter(item => {
            return (!this._filterTemp.onlyImage)
                ? true : (item.images !== CONFIG.defaultProductImage);
        });

        // count time through milliseconds
        filteredProducts = filteredProducts.filter(item => {
            return (!this._filterTemp.onlyNew)
                ? true : (Date.now() - Number(item.date) <= 432000000)
        });

        return filteredProducts;
    }

    renderSearchList(value) {
        let filteredProducts = this._products.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase());
        });

        this.renderProductsList(filteredProducts);
    }

    renderProductsList(allProducts) {
        this._filterTemp = this._filter.getFilter();
        const filteredProducts = (this._filterTemp) ? this.filterProducts(allProducts) : this._products;

        if (!filteredProducts.length) {
            this.renderOtherPage('.board_empty');
            return false;
        }

        this.getPageTemplate();

        let list = this.findId('board');
        this.show(list);
        const template = Handlebars.compile(this._template);
        let html = '';
        filteredProducts.forEach(item => {
            html += template(item);
        });
        list.innerHTML = html;

        this.addHashLinks(list, '.board_product', 'product/');
    }

    getPageTemplate() {
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