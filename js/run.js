import {
  townGeo,
  idGeo,
  tempGeo,
  iconWeatherGeo,
  descriptionGeo,
  geolocaliseMe,
} from "./geolocation.js";
import { fillCityCard, generateCityObject } from "./cityCards.js";
import {
  buttonsCityNavArray,
  attachListenersToBtnCityNavButtons,
} from "./navigation.js";
import { runEvents } from "./events.js";

/****RUN APPLICATION */
export async function runApplication() {
  await geolocaliseMe();
  fillCityCard(townGeo, idGeo, tempGeo, iconWeatherGeo, descriptionGeo);
  var myModal = new bootstrap.Modal(
    document.getElementById("cityCardModal"),
    {}
  );
  document.onreadystatechange = function () {
    myModal.show();
  };
  runEvents();
}

/****PRESET CITY NAV */
export async function presetCityNav() {
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
}

/****RUN */
runApplication();
presetCityNav();
