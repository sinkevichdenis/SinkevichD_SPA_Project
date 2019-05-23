import { renderMixin } from '../render.mixin';
import {BoardView} from "./board.view";

export class GeneralView {
    constructor() {
        this.addMixin();
        this.closeWindowEvent();
        this.initAllButtons();
        this.initNavbarSearch();
    }

    addMixin() {
        for (let key in renderMixin) {
            GeneralView.prototype[key] = renderMixin[key];
        }
    }

    closeWindowEvent() {
        //add opportunity to close window
        this.findAll('.close, .overlay').forEach(item => {
            item.addEventListener('click', event => {
                let target = event.currentTarget;

                while(!target.classList.contains('page')) {
                    target = target.parentNode;
                }
                this.hide(target);
                window.location.hash = '';
            })
        });
    }

    initAllButtons() {
        this.findAll('button').forEach(item => {
            item.addEventListener('click', () => {
                window.location.hash = item.dataset.href;
            })
        })
    }

    initNavbarSearch() {

    }
}
