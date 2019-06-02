import { SidebarView } from './components/view/sidebar.view';
import { BoardView } from './components/view/board.view';
import { GeneralView } from './components/view/general.view';
import { AddProductView } from './components/view/add-product.view';
import { FilterView } from './components/view/filter.view';
import { SearchView } from './components/view/search.view';

document.addEventListener('DOMContentLoaded', () => {
	const filterView = new FilterView();
	new SidebarView(filterView);
	new BoardView(filterView);
	new GeneralView();
	new AddProductView();
	new SearchView();

});
