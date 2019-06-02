import { EventEmiter } from '../service/event-emiter.service';
import { Router } from '../service/router.service';
import { Ajax } from '../service/ajax.service';
import { renderMixin } from '../mixins/render.mixin';
import { CONFIG } from '../../config';
import { AddDataService } from '../service/add-data.service';

export class BoardView extends  EventEmiter {
	constructor(filterView) {
		super();
		this._template = null;
		this._ajax = new Ajax(CONFIG.serverJsonProducts, 'getProductsList', true);
		this._filter = filterView;
		this._filterTemp = null;
		this._router = new Router();
        this._addDataService = new AddDataService();
		this._products = null;
		this._moment = moment;

		this._moment.locale('ru');
		this.initAjax();
		this.initRoutes();

		this.addMixin();

	}

	/* Service part */
	/**
     * init Ajax processes
     */
	initAjax() {
		this._ajax.on('getProductsList', data => {
            this._products = data.reverse();
		});

		// get data from json-server and then create event
		this._ajax.get(() => {
			window.dispatchEvent(new HashChangeEvent('hashchange'));
		});

		this._addDataService.on('renewedData', () => this._ajax.get());
	}

	/**
     * init routing pathes
     */
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

	/**
     * add mixin to make easier looking at elements
     */
	addMixin() {
		for (let key in renderMixin) {
			BoardView.prototype[key] = renderMixin[key];
		}
	}

	/* Render pages part */
	/**
     * render error page
     */
	renderErrorPage() {
		this.show(this.find('.error'));
		this.hide(this.findId('main-container'));
	}

	/**
     * render template page
     * @param {string} selector - css selector
     */
	renderOtherPage(selector) {
		this.show(this.find(selector));
	}

	/**
     * check product's id truthy
     * @param {string} id - product's id
     */
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

	/**
     * render single product page
     * @param {string} id - product's id
     */
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
		this.find('.product_date').innerHTML = this._moment(product.date).fromNow();

		this.show(this.find('.product_single'));
	}

	/**
     * product's direct/checkbox-filter
     * @param {array} allProducts - product's list
     * @returns {array} - filtered list
     */
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
				? true : (Date.now() - Number(item.date) <= 432000000);
		});

		return filteredProducts;
	}

	/**
     * product's search-filter
     * @param {string} value - search query
     */
	renderSearchList(value) {
		let filteredProducts = this._products.filter(item => {
			return item.title.toLowerCase().includes(value.toLowerCase());
		});

		this.renderProductsList(filteredProducts);
	}

	/**
     * render product's list page
     * @param {array} allProducts - product's list
     * @returns {boolean}
     */
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

		this.humanizeDate('.board_time');
		this.addHashLinks(list, '.board_product', 'product/');
	}

	/**
     * modify date view
     * @param {string} selector
     */
	humanizeDate(selector) {
		document.querySelectorAll(selector).forEach(item => {
			item.innerHTML = this._moment(parseInt(item.innerHTML)).fromNow();
		});
	}

	/**
     * get Html template
     */
	getPageTemplate() {
		if (this.findId('board_list-template')) {
			this._template = this.findId('board_list-template').innerHTML;
		}
	}

	/**
     * add click-events on new links
     * @param {object} elem - element
     * @param {string} selector - css selector
     * @param {string} prefix - adding hash prefix
     */
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