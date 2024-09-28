import {
  townGeo,
  idGeo,
  tempGeo,
  iconWeatherGeo,
  descriptionGeo,
  geolocaliseMe,
} from "./geolocation.js";
import { fillCityCard, generateCityObject } from "./cityCards.js";
import { attachListenersToBtnCityNavButtons } from "./navigation.js";
import { runEvents } from "./events.js";

import { setElementFromVariablesinLocalStorage } from "./localStorageGestion.js";

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
//LocalStorage

let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
let buttonsCityNavArray = Array.from(getButtonsCityNav());
export async function presetCityNav() {
  buttonsCityNavArray[0].textContent = "Tokyo";
  buttonsCityNavArray[0].dataset.id = "1850144";
  buttonsCityNavArray[1].textContent = "Paris";
  buttonsCityNavArray[1].dataset.id = "2988507";
  buttonsCityNavArray[2].textContent = "Montreal";
  buttonsCityNavArray[2].dataset.id = "6077243";
  buttonsCityNavArray[3].textContent = "Singapour";
  buttonsCityNavArray[3].dataset.id = "1880252";

  buttonsCityNavArray.slice(0, 4).forEach(function (button) {
    console.log(button.textContent);

    setElementFromVariablesinLocalStorage(
      button.dataset.id,
      button.textContent
    );
  });

  const localStorageData = localStorage.getItem("citiesStored");
  console.log({ localDatas: localStorageData });
  const parsedData = JSON.parse(localStorageData);
  const getCitiesCollection = () => Object.values(parsedData);
  console.log({ citiesCo: getCitiesCollection() });
  //Fin get LocalStorage

  const citiesCollectionArray = getCitiesCollection();
  citiesCollectionArray.forEach(function (city) {
    generateCityObject(city);
  });

  attachListenersToBtnCityNavButtons();
}

/****RUN */
runApplication();
presetCityNav();
