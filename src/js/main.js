import { SidebarView } from './components/sidebar.view';
import { RouterView} from "./components/router.view";

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded');
    new SidebarView();
    new RouterView();
});
