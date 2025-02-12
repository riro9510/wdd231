import { createMenu } from './menu.js';  
import {createFooter} from "./footer.js";

const navBarMenu = {
    "Comics": "./index.html",
    "Characters": "./characters.html",
    "Authors": "./authors.html",
    "Contact Us": "./form.html",
};


const menu = createMenu(navBarMenu);
const footer = createFooter();
document.body.appendChild(menu);
document.body.appendChild(footer);
