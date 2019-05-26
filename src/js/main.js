import { SidebarView } from './components/view/sidebar.view';
import { BoardView } from './components/view/board.view';
import { GeneralView } from './components/view/general.view';
import { AddDataService } from './components/service/add-data.service';
import { AddProductView } from './components/view/add-product.view';

document.addEventListener("DOMContentLoaded", () => {
    new SidebarView();
    new BoardView();
    new GeneralView();
    new AddProductView();
    new AddDataService();
});
