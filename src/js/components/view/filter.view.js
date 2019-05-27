import { EventEmiter } from '../service/event-emiter.service';
import { renderMixin } from '../mixins/render.mixin';

export class FilterView extends EventEmiter {
    constructor() {
        super();
        this._filterTemp = {
            dir: null,
            subdir: null,
            condition: 'all',
            onlyImage: false,
            onlyNew: false
        };
        this._filter = Object.assign({}, this._filterTemp );

        this.changeFilter();
        this.init();
        this.events();
    }

    /**
     * add mixin to make easier looking at elements
     */
    addMixin() {
        for (let key in renderMixin) {
            FilterView.prototype[key] = renderMixin[key];
        }
    }

    /**
     * subsribe on async actions
     */
    init() {
        this.on('clearedFilter', () => this.changeFilter());
        this.on('usedFilter', (data) => this.changeFilter(data));
    }

    /**
     * add events
     */
    events() {
        window.addEventListener('hashchange', () =>{
            this.changeSidebarFilter(window.location.hash);
        })
    }

    /**
     * change filter object by checkboxs
     * @param {object} data - filter object
     */

    changeFilter(data=this._filterTemp) {
        this._filter.condition = data.condition;
        this._filter.onlyImage = data.onlyImage;
        this._filter.onlyNew = data.onlyNew;
        this.emit('changedFilter', this._filter);
    }

    /**
     * change filter object by directions
     * @param {object} data - filter object
     */
    changeSidebarFilter(data) {
        if (!data.includes('#dir')){
            this._filter.dir = null;
            this._filter.subdir = null;
            return;
        }

        data = data.split('#dir/')[1];
        data = data.split('/subdirect');
        this._filter.dir = data[0];
        this._filter.subdir = data[1];
        this.emit('changedFilter', this._filter);
    }

    /**
     * return filter object
     * @returns {({} & {dir: null, subdir: null, condition: string, onlyImage: boolean, onlyNew: boolean}) | *}
     */
    getFilter() {
        return this._filter;
    }
}
