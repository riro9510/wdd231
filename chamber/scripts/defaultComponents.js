import { createMenu } from './menu.js';  
import {createFooter} from "./footer.js";
import {createCards} from './weather.js';
import { promotionCards } from './promotion.js';
const navBarMenu = {
    "Home": "#",
    "Directory": "#",
    "Join": "#",
    "Discover": "#"
};

const mainComponent = document.querySelector(".seccion2");
const promotion = document.querySelector("main");
if (mainComponent) {
  const [cards,weatherForecast] = await createCards();
  console.log("cards",cards);
  mainComponent.appendChild(cards);
  mainComponent.appendChild(weatherForecast)
} else {
  console.error("No se encontró ningún elemento con la clase 'seccion2'.");
}
if(promotion){
  const randomCards = await promotionCards();
  promotion.appendChild(randomCards);
}
const menu = createMenu(navBarMenu);
const footer = createFooter();
document.body.appendChild(menu);
document.body.appendChild(footer);
