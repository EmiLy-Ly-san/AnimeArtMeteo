import {
  geolocaliseMe,
  townGeo,
  idGeo,
  tempGeo,
  iconWeatherGeo,
  descriptionGeo,
} from "./geolocalisation";
import { fillCityCard, generateCityObject } from "./cityCard.js";
import {
  buttonsCityNavArray,
  attachListenersToBtnCityNavButtons,
} from "./navigation.js";
import { runEvents } from "./events.js";

/****RUN APPLICATION */
(async function runApplication() {
  await geolocaliseMe();
  fillCityCard(townGeo, idGeo, tempGeo, iconWeatherGeo, descriptionGeo);
  var myModal = new bootstrap.Modal(
    document.getElementById("cityCardModal"),
    {}
  );
  document.onreadystatechange = function () {
    myModal.show();
  };
})(); //immediatly invoked function IIF*/

/****PRESET CITY NAV */
buttonsCityNavArray[0].textContent = "Tokyo";
buttonsCityNavArray[0].dataset.id = "1850144";
buttonsCityNavArray[1].textContent = "Paris";
buttonsCityNavArray[1].dataset.id = "2988507";
buttonsCityNavArray[2].textContent = "Montreal";
buttonsCityNavArray[2].dataset.id = "6077243";
buttonsCityNavArray[3].textContent = "Singapour";
buttonsCityNavArray[3].dataset.id = "1880252";
for await (const button of buttonsCityNavArray.slice(0, 4)) {
  console.log(button.textContent);
  generateCityObject(button.textContent);
}
attachListenersToBtnCityNavButtons();

/****RUN EVENTS */
runEvents();
