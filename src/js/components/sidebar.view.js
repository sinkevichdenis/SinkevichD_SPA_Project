import { EventEmiter } from './event-emiter.service';
import { Ajax } from './ajax.service';

export class SidebarView extends  EventEmiter {
    constructor() {
        super();
        this._template = null;
        this._ajax = new Ajax('http://localhost:3006/sidebar', 'getSidebarList');
        this.init();
    }

    /**
     * subscribe at server data
     */
    init() {
        this._ajax.on('getSidebarList', data => this.renderSidebar(data));
        this._ajax.get();
    }

    /**
     * get Html template
     */
    getTemplate() {
        if (document.getElementById('sidebar_list-template')) {
            this._template = document.getElementById('sidebar_list-template').innerHTML;
        }
    }

    /**
     * create sidebar list
     * @param {object} data - server data
     */
    renderSidebar(data) {
        this.getTemplate();

        const list = document.querySelector('.sidebar_accordion');
        const template = Handlebars.compile(this._template);
        let html = '';

        data.forEach(item => {
            html += template(item);
        });
        list.innerHTML = html;

        this.renderSubtitles(data)
    }

    /**
     * create subdirection's lists
     * @param {object} data - server data
     */
    renderSubtitles(data) {
        let list = document.querySelectorAll('.card-body');

        data.forEach((item, indexItem) => {
            item.subdirection.forEach((name, indexName) => {
                let elem = document.createElement('a');
                elem.setAttribute('class', 'sidebar_link');
                elem.setAttribute('href', '#');
                elem.setAttribute('data-href', `${indexItem}/subdirect${indexName}`);
                elem.innerText = name;
                list[indexItem].innerHTML += elem.outerHTML;
            })
        });

        list.forEach(item => {
            this.addHashLinks(item, 'a', 'dir/');
        })
    }

    /**
     * add hash links in element
     * @param {object} elem - main element
     * @param {string} selector - goal selector in element
     * @param {string} prefix - prefix for hash address
     */
    addHashLinks(elem, selector, prefix) {
        elem.querySelectorAll(selector).forEach((item) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.hash = `${prefix}${item.dataset.href}`;
            });
        });
    }

}
