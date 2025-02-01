import {createCards} from './weather.js';
import { promotionCards } from './promotion.js';

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