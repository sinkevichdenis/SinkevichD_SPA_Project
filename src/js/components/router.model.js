import { EventEmiter } from './event-emiter';

export class RouterModel extends EventEmiter{
    constructor() {
        super();
        this.routes = {};
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        this.on('hashChanged', (hash) => this.render(hash));
    }

    addRoute(route, action) {
        this.routes[route] = action;
        console.log('rote', this.routes);
    }

    render(hash) {
        console.log('router render hash', hash);
        let temp = hash.split('/')[0];
        console.log('router render temp', temp);

        this.pages.forEach((page) => {
            page.classList.remove('visible');
        });

        this.routes[temp] ? this.routes[temp]() : this.routes['404']();
    }
}