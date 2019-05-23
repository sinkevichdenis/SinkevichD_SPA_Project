import { EventEmiter } from './event-emiter.service';
import { Router } from './router.service'
import { Ajax } from "./ajax.service";

export class BoardView extends  EventEmiter {
    constructor() {
        super();
        this._template = null;
        this._ajax = new Ajax('http://localhost:3006/products', 'getProductsList', this.ajaxAddEvents);
        this._router = new Router();
        this._products = null;
        this.init();
        this.initRoutes();
    }

    ajaxAddEvents() {
        // add subscriber on hashChange event in Ajax
        return () => {
            this.on('hashChanged', () => this.serverConnect());
        }
    }

    init() {
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
        this._router.addRoute('404', () => this.renderOtherPage('.error'));
        this._router.addRoute('#product', () => this.renderOtherPage('.error'));
    }

    renderOtherPage(selector) {
        document.querySelector(selector).classList.add('visible');
        document.getElementById('main-container').classList.remove('visible');

    }

    getTemplate() {
        if (document.getElementById('board_list-template')) {
            this._template = document.getElementById('board_list-template').innerHTML;
        }
    }

    renderProductsList() {
        this.getTemplate();

        let list = document.getElementById('board');
        list.classList.add('visible');
        const template = Handlebars.compile(this._template);
        let html = '';

        this._products.forEach(item => {
            html += template(item);
        });
        list.innerHTML = html;

        this.addHashLinks(list, '.board_product', 'product/');
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