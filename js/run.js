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
import { newCitiesTostoreInLocalStorage } from "./cityCards.js";

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
let variablesCitiesStoredInLocalStorage;

let setElementFromVariablesinLocalStorage = (property, value, object) => {
  const localStorageData = localStorage.getItem("citiesStored");
  if (typeof localStorageData === "string") {
    const parsedData = JSON.parse(localStorageData);
    parsedData[property] = value;
    localStorage.setItem("citiesStored", JSON.stringify(parsedData));
  } else {
    localStorage.setItem(
      "citiesStored",
      JSON.stringify({
        ...object,
        [property]: value,
      })
    );
  }

  return null;
};

let getVariablesInLocalStorage = (property) => {
  const localStorageData = localStorage.getItem("citiesStored");
  if (typeof localStorageData === "string") {
    const parsedData = JSON.parse(localStorageData);
    const myValue = parsedData?.[property];
    return myValue;
  }
  return null;
};
//Fin LocalStorage

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
  //localstorage
  /*const filledButtonCityNav = buttonsCityNavArray.filter(function (button) {
    return button.textContent !== "";
  });
  console.log({ filledButtons: filledButtonCityNav });
  filledButtonCityNav.forEach(function (btn) {
    setElementFromVariablesinLocalStorage(
      btn.id,
      btn.textContent,
      variablesCitiesStoredInLocalStorage
    );
    generateCityObject(btn.textContent);
  });*/

  for await (const button of buttonsCityNavArray.slice(0, 4)) {
    console.log(button.textContent);
    setElementFromVariablesinLocalStorage(
      button.id,
      button.textContent,
      variablesCitiesStoredInLocalStorage
    );
  }

  const localStorageData = localStorage.getItem("citiesStored");
  console.log({ localDatas: localStorageData });
  const parsedData = JSON.parse(localStorageData);
  let getCitiesCollection = () => Object.values(parsedData);
  console.log({ citiesCo: getCitiesCollection() });
  let citiesCollectionArray = getCitiesCollection();
  citiesCollectionArray.forEach(function (city) {
    generateCityObject(city);
  });

  //Fin LocalStorage
  console.log(buttonsCityNavArray.slice(0, 4));
  attachListenersToBtnCityNavButtons();
}

/****RUN */
runApplication();
presetCityNav();
