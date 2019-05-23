export class Router {
    constructor() {
        this.routes = {};
        this.pages = document.querySelectorAll('.page');
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.render(decodeURI(window.location.hash));
            window.scrollTo(0, 0);
        });
    }

    addRoute(route, action) {
        this.routes[route] = action;
    }

    render(hash) {
        let temp = hash.split('/')[0];
        let index = hash.split('/')[1];

        document.getElementById('main-container').classList.add('visible');
        this.pages.forEach((page) => {
            page.classList.remove('visible');
        });

        this.routes[temp] ? this.routes[temp](index) : this.routes['404'](index);
    }
}
