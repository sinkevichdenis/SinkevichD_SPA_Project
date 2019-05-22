import { EventEmiter } from './event-emiter';
import { RouterModel } from './router.model';
import { BoardView } from "./board.view";

export class RouterView extends EventEmiter {
    constructor() {
        super();
        this._model = new RouterModel();
        this._board = new BoardView();
        this.events();
        this.initRoutes();
        this.init();
    }

    events(){
        window.addEventListener('hashchange', () => {
            console.log('event hashChanged inside');
            this._model.emit('hashChanged', window.location.hash);
        });
    }

    initRoutes(){
        this._model.addRoute('', this._board.renderAll);
        this._model.addRoute('404', this._board.test);
        this._model.addRoute('dir0', this._board.test);
    }

    init(){
        console.log('event hashChanged init');
       window.dispatchEvent(new HashChangeEvent('hashchange'));
    }


}