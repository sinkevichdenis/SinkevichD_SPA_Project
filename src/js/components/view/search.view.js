export class SearchView{
	constructor() {
		this._input = document.getElementById('search');
		this.init();
		this.events();
	}


	/**
     * init changes from input to hash
     */
	init() {
		this._input.addEventListener('input', (event) => {
			let timerId = null;
			event.preventDefault();
			timerId && clearInterval(timerId);
			timerId = setTimeout(() => {
				window.location.hash = `#search/${this._input.value}`;
			}, 500);
		});
	}

	/**
     * init changes from hash to input
     */
	events() {
		window.addEventListener('hashchange', () => {
			if (!window.location.hash.includes('#search')) {
				this._input.value = '';
			} else {
				this._input.value = decodeURI(window.location.hash.split('#search/')[1]);
			}

			if (this._input.value === '' && window.location.hash === '#search/') {
				window.location.hash = '';
			}
		});
	}
}
