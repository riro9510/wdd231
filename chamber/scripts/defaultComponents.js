import { createMenu } from './menu.js';  
import {createFooter} from "./footer.js";

const navBarMenu = {
    "Home": "./index.html",
    "Directory": "./directory.html",
    "Join": "join.html",
    "Discover": "#",
};


const menu = createMenu(navBarMenu);
const footer = createFooter();
document.body.appendChild(menu);
document.body.appendChild(footer);
