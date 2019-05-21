import { BoardView } from "./components/board.view";
import { SidebarView } from './components/sidebar.view';

document.addEventListener("DOMContentLoaded", (event) => {
    console.log('DOM loaded');
    new SidebarView();
    new BoardView();
});
