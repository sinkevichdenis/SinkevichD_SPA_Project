import { EventEmiter } from '../service/event-emiter.service';
import { Ajax } from '../service/ajax.service';
import { CONFIG } from '../../config';

export class SidebarView extends  EventEmiter {
    constructor(filterView) {
        super();
        this._template = null;
        this._ajax = new Ajax(CONFIG.serverJsonSidebar, 'getSidebarList');
        this._filter = filterView;
        this._filterForm = document.getElementById('sidebar_form');
        this.initAjax();
        this.initFilter();
    }

    /**
     * subscribe at server data
     */
    initAjax() {
        this._ajax.on('getSidebarList', data => this.renderSidebar(data));
        this._ajax.get();
    }

    /**
     * init filter area
     */
    initFilter(){
        let filter = {
            condition: 'all',
            onlyImage: false,
            onlyNew: false
        };

        this._filterForm.addEventListener('change', () => {
            filter.condition = Array.from(this._filterForm.condition).filter(item => item.checked)[0].value;
            filter.onlyImage = this._filterForm.onlyImage.checked;
            filter.onlyNew = this._filterForm.onlyNew.checked;
        });

        this._filterForm.elements[5].addEventListener('click', () => {
            this._filter.emit('usedFilter', filter);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        });

        this._filterForm.elements[6].addEventListener('click', () => {
            filter = {
                condition: 'all',
                onlyImage: false,
                onlyNew: false
            };
            this._filter.emit('clearedFilter');
            this._filterForm.reset();
        });
    };

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

        this.renderSubtitles(data);
        this.addSidebarEvent(list);
     }

    /**
     * add closing event in sidebar
     * @param {array} list - sidebar list
     */
    addSidebarEvent(list) {
         window.addEventListener('hashchange', () => {
             list.querySelectorAll('.collapse').forEach(item => {
                 item.classList.remove('show');
             })
         })
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
                this._filter.emit('clearedFilter');
                this._filterForm.reset();
            });
        });
    }
}
