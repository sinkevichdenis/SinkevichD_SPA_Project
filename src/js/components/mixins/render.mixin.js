//mixin to finding, showing and hiding elements during rendering pages
const showClass = 'visible';

export const renderMixin = {
	find: (selector) => {
		return document.querySelector(selector);
	},
	findAll: (selector) => {
		return document.querySelectorAll(selector);
	},
	findId: (selector) => {
		return document.getElementById(selector);
	},
	show: (elem) => {
		return elem.classList.add(showClass);
	},
	hide: (elem) => {
		return elem.classList.remove(showClass);
	},
};
