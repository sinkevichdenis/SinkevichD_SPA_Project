import { SidebarView } from './components/view/sidebar.view';
import { BoardView } from './components/view/board.view';
import { GeneralView } from './components/view/general.view';
import { AddDataService } from "./components/service/add-data.service";

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded');
    new SidebarView();
    new BoardView();
    new GeneralView();
    new AddDataService();
});
