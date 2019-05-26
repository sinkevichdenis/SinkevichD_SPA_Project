import { renderMixin } from '../mixins/render.mixin';

export class GeneralView {
    constructor() {
        this.addMixin();
        this.closeWindowEvent();
        this.initAllButtons();
        this.initNavbarSearch();
    }

    /**
     * add mixin to make easier looking at elements
     */
    addMixin() {
        for (let key in renderMixin) {
            GeneralView.prototype[key] = renderMixin[key];
        }
    }

    /**
     *  make possible to close top pages
     */
    closeWindowEvent() {
        //add opportunity to close window
        this.findAll('.close, .overlay').forEach(item => {
            item.addEventListener('click', event => {
                let target = event.currentTarget;
                this.hide(target.closest('.page'));

                if (window.location.hash === '#registration')
                {
                    window.history.go(-2);
                    return;
                }

                window.history.go(-1);
            })
        });
    }

    /**
     *  make possible to redirect pages to button's data-href address
     */
    initAllButtons() {
        this.findAll('button').forEach(item => {
            if (item.type !== 'submit' && item.dataset.href) {
                item.addEventListener('click', () => {
                    event.preventDefault();
                    window.location.hash = item.dataset.href;
                })
            }
        })
    }

    /**
     * initiate search process
     */
    initNavbarSearch() {

    }
}
