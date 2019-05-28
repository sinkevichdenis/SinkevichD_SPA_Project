import { EventEmiter } from '../service/event-emiter.service';
import { renderMixin } from '../mixins/render.mixin';
import { Ajax } from '../service/ajax.service';
import { CONFIG } from '../../config';

export class AddProductView extends EventEmiter {
    constructor() {
        super();
        this._ajax = new Ajax(CONFIG.serverJsonSidebar, 'getSidebarList');
        this._menuItems = [];

        this.addMixin();
        this.initAjax();
        this.events();

    }

    /**
     * add mixin to make easier looking at elements
     */
    addMixin() {
        for (let key in renderMixin) {
            AddProductView.prototype[key] = renderMixin[key];
        }
    }

    /**
     * init Ajax processes
     */
    initAjax() {
        this._ajax.on('getSidebarList', (data) => {
            this._menuItems = [...data];
            this.createDirSelect();
        });
        this._ajax.get();
    }

    /**
     * add events on page
     */
    events() {
        this.showImageName();
        this.changeTextarea();
        this.changeSelect();
    }

    /**
     * create direction's select
     */
    createDirSelect () {
        const elem = this.findId('add_dir');
        this._menuItems.forEach((item,index) => {
            let option = new Option(item.direction, index);
            option.classList.add('font-italic');
            elem.appendChild(option);
        })
    }

    /**
     * create subdirection's select
     */
    createSubdirSelect(selectIndex) {
        const elem = this.findId('add_subdir');

        elem.options.length = 1;

        if (selectIndex !== 0) {
            this._menuItems[selectIndex - 1].subdirection.forEach((item,index) => {
                let option = new Option(item, index);
                option.classList.add('font-italic');
                elem.appendChild(option);
            })
        }
    }

    /**
     * manage select's changing
     */
    changeSelect(){
        const dirElem = this.findId('add_dir');
        const subdirElem = this.findId('add_subdir');

        dirElem.addEventListener('change', () => {
            this._indexSelected = dirElem.selectedIndex;
            this.createSubdirSelect(this._indexSelected);
            subdirElem.options[0].selected = true;
        })
    }

    /**
     * show image name before loading
     */
    showImageName() {
        this.findId('add_image').addEventListener('change', (event) => {
            let imageName = event.target.value.split('\\');
            imageName = imageName[imageName.length - 1];
            this.findId('add_image-label').innerHTML = imageName;
        })
    }

    /**
     * change text in textArea
     */
    changeTextarea() {
        const field = this.findId('add_text');
        let textTemplate = field.value;
        let text = '';

        field.addEventListener('focus', () => {
            text = field.value.trim();
            if (text === textTemplate) {
                field.value = '';
            }
        });

        field.addEventListener('blur', () => {
           if (field.value.trim() === textTemplate || field.value.trim()  === '') {
               field.value = textTemplate;
           }
        });
    }
}
