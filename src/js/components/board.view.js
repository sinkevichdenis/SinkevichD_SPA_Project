import { EventEmiter } from './event-emiter';
import { BoardModel } from "./board.model";

export class BoardView extends  EventEmiter {
    constructor() {
        super();
        this._template = null;
        this._model = new BoardModel('http://localhost:3006/products', 'getProductsList');
        this._products = null;
        this.init();
    }

    init() {
        this._model.on('getProductsList', data => this.renderAll(data));
    }

    renderAll(data){
        console.log('где данные, лебовски?', data);
        try {
            this._products = data;
            this.renderProductsList();
        } catch(e) {

        }
    }

    getTemplate() {
        if (document.getElementById('board_list-template')) {
            this._template = document.getElementById('board_list-template').innerHTML;
        }
    }

    test() {
        alert('STOP');
    }
    test2() {
        alert('STOP DIR');
    }

    renderProductsList() {
        if (document.getElementById('board_list-template')) {
            this._template = document.getElementById('board_list-template').innerHTML;
        }
        console.log('board render', this._template);

        let list = document.getElementById('board');
        list.classList.add('visible');
        const template = Handlebars.compile(this._template);
        let html = '';

        this._products.forEach(item => {
            html += template(item);
        });
        list.innerHTML = html;

        this.addHashLinks(list, '.board_product', '/product');
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