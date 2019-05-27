export class Router {
    constructor() {
        this.routes = {};
        this.pagesTop = document.querySelectorAll('.page-top');
        this.pagesBottom = document.querySelectorAll('.page-bottom');
        this.routesTop = [];
        this.routesBottom = [];
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.render(decodeURI(window.location.hash));
        });
    }

    addRoute(route, action, status) {
        this.routes[route] = action;
        status ? this.routesTop.push(route) : this.routesBottom.push(route);
    }

    render(hash) {
        hash = hash.split('/');
        let temp = hash[0];
        let index = hash[1];

        document.getElementById('main-container').classList.add('visible');

        // don't close bottom page when open top page
        if (this.routesBottom.includes(temp)) {
            this.pagesBottom.forEach((page) => {
                page.classList.remove('visible');
            });
        }

        this.pagesTop.forEach((page) => {
            page.classList.remove('visible');
        });

        this.routes[temp] ? this.routes[temp](index) : this.routes['404'](index);
    }
}
