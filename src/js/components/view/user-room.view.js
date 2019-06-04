import { EventEmiter } from '../service/event-emiter.service';
import { renderMixin } from '../mixins/render.mixin';
import { CONFIG } from '../../config';

export class UserRoomView extends EventEmiter {
    constructor() {
        super();
        this.userId = null;
        this.key = CONFIG.storageUserKey;

        this.addMixin();
        this.init();
        this.events();
    }

    /**
     * add mixin to make easier looking at elements
     */
    addMixin() {
        for (let key in renderMixin) {
            UserRoomView.prototype[key] = renderMixin[key];
        }
    }

    init() {
        let id = localStorage.getItem(this.key);

        if (id !== null) {
            this.userId = id;
            this.openRoom();
        }
    }

    events() {
        window.addEventListener('hashchange', () => {
            if (localStorage.getItem(this.key) === null) {
                this.closeRoom();
            }
        });

        this.findId('navbar_room-exit').addEventListener('click', (event) => {
            event.preventDefault();
            this.closeRoom();
            this.clearUser();
        });

        this.findId('navbar_room').addEventListener('click', (event) => {
            event.preventDefault();
            window.location.hash = '#room';
        });

    }

    openRoom() {
        this.hide(this.findId('navbar_btn-login'));
        this.show(this.find('.navbar_room-buttons'));
    }

    closeRoom() {
        this.show(this.findId('navbar_btn-login'));
        this.hide(this.find('.navbar_room-buttons'));
    }

    setUser(user) {
        this.userId = user.id;
        localStorage.setItem(this.key, this.userId);
    }

    clearUser() {
        this.userId = '';
        localStorage.removeItem(this.key);
    }
}