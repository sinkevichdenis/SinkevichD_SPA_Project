import { EventEmiter } from './event-emiter';
import { BoardModel } from "./board.model";

export class BoardView extends  EventEmiter {
    constructor() {
        super();
        this._template = null;
        this._model = new BoardModel('http://localhost:3006/products', 'getProductsList');
        this.init();
    }

    init() {
        this._model.on('getProductsList', data => this.renderProductsList(data));
    }

    getTemplate() {
        if (document.getElementById('board_list-template')) {
            this._template = document.getElementById('board_list-template').innerHTML;
        }
    }

    renderProductsList(data) {
        this.getTemplate();

        let list = document.getElementById('board');
        const template = Handlebars.compile(this._template);
        let html = '';

        data.forEach(item => {
            html += template(item);
        });
        list.innerHTML = html;

    }
}