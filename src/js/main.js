import { SidebarView } from './components/sidebar.view';
import { BoardView } from './components/board.view';
import { GeneralView } from './components/general.view';
import { AddDataService } from "./components/add-data.service";

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded');
    new SidebarView();
    new BoardView();
    new GeneralView();
    new AddDataService();
});
