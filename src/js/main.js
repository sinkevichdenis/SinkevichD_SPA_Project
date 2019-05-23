import { SidebarView } from './components/sidebar.view';
import {BoardView} from "./components/board.view";

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded');
    new SidebarView();
    new BoardView();
});
