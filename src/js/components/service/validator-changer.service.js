export class ValidatorChangerService {
	constructor (element, classes) {
		this._element = element;
		this._classes = classes;
	}

	/**
	 * add error class
     */
	addClass() {
		let classList = this._element.classList;

		this._classes.forEach(item => {
			if (classList.contains(String(item))) {
				return false;
			}
			classList.add(String(item));
		});
	}

	/**
     * remove error class
     */
	removeClass() {
		let classList = this._element.classList;

		this._classes.forEach(item => {
			if (classList.contains(String(item))) {
				classList.remove(String(item));
			}
			return true;
		});
	}
}
