import {
  idTownSearched,
  tempSearched,
  iconWeatherSearched,
  descriptionSearched,
  recoverTown,
} from "./recoverTown.js";
import {
  isTownLoaded,
  hasAlreadyLoadedTheCurrentCity,
  getEmptyCards,
} from "./utilities.js";
import {
  getVariablesInLocalStorage,
  setElementFromVariablesinLocalStorage,
} from "./localStorageGestion.js";

/***1.GENERATE CITY OBJECT */
const getMiniCityCardTitle = () => document.querySelector(".miniCardTown");
const favoritesCitiesCardsAll = document.querySelectorAll(".favoriteCityCard");
export let favoriteCityCardArray = Array.from(favoritesCitiesCardsAll);
let emptyButtonsArray;

function getEmptyButtons() {
  let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
  let buttonsCityNavArray = Array.from(getButtonsCityNav());
  return buttonsCityNavArray.filter(function (button) {
    return button.textContent === "";
  });
}

function getEmptyButtonsMainNav() {
  let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
  let buttonsCityNavArray = Array.from(getButtonsCityNav());
  return buttonsCityNavArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnMainNav");
    })
    .filter(function (btn) {
      return btn.textContent == "";
    });
}

function getEmptyButtonsSecondNav() {
  let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
  let buttonsCityNavArray = Array.from(getButtonsCityNav());
  return buttonsCityNavArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnSecondNav");
    })
    .filter(function (btn) {
      return btn.textContent == "";
    });
}

export const newCitiesTostoreInLocalStorage = {};

export async function generateCityObject(value) {
  const newCity = value;
  console.log({ newCity });
  await recoverTown(newCity);
  const miniCityCard = {
    id: idTownSearched,
    cityName: newCity,
    temperature: tempSearched,
    icon: iconWeatherSearched,
    descriptionWeather: descriptionSearched,

    generateCityButton: function () {
      const getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
      let buttonsCityNavArray = Array.from(getButtonsCityNav());
      isTownLoaded(buttonsCityNavArray, newCity);
      if (!hasAlreadyLoadedTheCurrentCity) {
        emptyButtonsArray = getEmptyButtons();
        let emptyButtonsMainNav = getEmptyButtonsMainNav();
        const emptyButtonsSecondNav = getEmptyButtonsSecondNav();
        console.log({ emptybuttonsmain: emptyButtonsMainNav.length });
        if (emptyButtonsMainNav.length !== 0) {
          emptyButtonsMainNav[0].textContent = newCity;
          emptyButtonsMainNav[0].disabled = false;
          emptyButtonsMainNav[0].classList.remove("btn-primary", "opacity-75");
          emptyButtonsMainNav[0].classList.add("border-secondary");
          emptyButtonsMainNav[0].dataset.id = idTownSearched;
          emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);

          emptyButtonsSecondNav.forEach(function (btn) {
            emptyButtonsMainNav.push(btn);
            emptyButtonsSecondNav.shift(btn);
          });
        } else {
          emptyButtonsSecondNav[0].textContent = newCity;
          emptyButtonsSecondNav[0].disabled = false;
          emptyButtonsSecondNav[0].classList.remove(
            "btn-primary",
            "opacity-75"
          );
          emptyButtonsSecondNav[0].classList.add("border-secondary");
          emptyButtonsSecondNav[0].dataset.id = idTownSearched;
          console.log({ myButton: emptyButtonsSecondNav[0] });
        }
      }
    },
    fillMiniCityCard: function () {
      isTownLoaded(favoriteCityCardArray, newCity);
      if (!hasAlreadyLoadedTheCurrentCity) {
        const emptyCards = getEmptyCards(favoriteCityCardArray);
        emptyCards[0].id = idTownSearched;
        const cardToFill = document.getElementById(`${idTownSearched}`);
        cardToFill.querySelector(
          ".miniCardTown"
        ).textContent = `${miniCityCard.cityName}`;
        cardToFill.querySelector(
          ".miniCardTemp"
        ).textContent = `${miniCityCard.temperature}°C`;
        cardToFill.querySelector(
          ".miniCardIconWeather"
        ).src = `https://openweathermap.org/img/wn/${miniCityCard.icon}@2x.png`;
        cardToFill.querySelector(
          ".miniCardDescription"
        ).textContent = `${miniCityCard.descriptionWeather}`;
        cardToFill.querySelector(".garbageCityBtn").dataset.id = idTownSearched;
        cardToFill.querySelector(
          ".visibilityCityBtn"
        ).dataset.cityName = `${miniCityCard.cityName}`;
        cardToFill
          .querySelector(".visibilityCityBtn")
          .setAttribute("data-bs-dismiss", "modal");
        cardToFill
          .querySelector(".visibilityCityBtn")
          .setAttribute("data-bs-toggle", "modal");
        cardToFill
          .querySelector(".visibilityCityBtn")
          .setAttribute("data-bs-target", "#cityCardModal");
      }
    },
    storeInLocalStorage: function () {
      const currentCitiesInLocalStorage = localStorage.getItem("citiesStored");
      if (currentCitiesInLocalStorage) {
        const currentCities = JSON.parse(currentCitiesInLocalStorage);
        const cityAlreadyStored =
          currentCities?.[miniCityCard.id] &&
          currentCities?.[miniCityCard.id] === miniCityCard.cityName;

        // Do not double store in localStorage for performance
        if (!cityAlreadyStored) {
          setElementFromVariablesinLocalStorage(
            `${miniCityCard.id}`,
            `${miniCityCard.cityName}`
          );
        }
      }
    },
  };
  miniCityCard.generateCityButton();
  miniCityCard.fillMiniCityCard();
  miniCityCard.storeInLocalStorage();
  console.log({ miniCityCard });
}

/***2. RESET AND Fill BIG CITY CARD*/
const bigCityCard = document.getElementById("cityCardModal");
export const getBigCityCardTitle = () =>
  document.querySelector(".bigCityCardTitle");

export const addCardCityBtn = document.querySelector(".addCardCityBtn");
export const garbageCardCityBtn = document.querySelector(".garbageCardCityBtn");

export const fillCityCard = (town, id, temp, iconWeather, description) => {
  document.querySelector(".bigCityCardTitle").textContent = `${town}`;
  bigCityCard.setAttribute("data-id", `${id}`);
  document.querySelectorAll(".temperature").forEach(function (tempText) {
    tempText.textContent = `${temp}°C`;
  });
  document.querySelectorAll(".iconWeather").forEach(function (icon) {
    icon.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`;
  });
  document.querySelector(".descriptionText").textContent = `${description}`;
  let currentDate = new Date();
  document.querySelector(".currentDate").textContent =
    `${currentDate.getFullYear()}` +
    `/${currentDate.getMonth()}` +
    `/${currentDate.getDate()}`;
  document.querySelector(".currentTime").textContent +
    `${currentDate.getHours()}` +
    ` ${currentDate.getMinutes()}`;
  let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
  let buttonsCityNavArray = Array.from(getButtonsCityNav());
  isTownLoaded(buttonsCityNavArray, town);
  if (!hasAlreadyLoadedTheCurrentCity) {
    addCardCityBtn.classList.remove("display-none");
    garbageCardCityBtn.classList.add("display-none");
    addCardCityBtn.dataset.cityName = town;
  } else {
    addCardCityBtn.classList.add("display-none");
    garbageCardCityBtn.classList.remove("display-none");
    garbageCardCityBtn.dataset.id = `${id}`;
  }
};

export const resetBigCityCard = () => {
  const bigCityCardTitle = getBigCityCardTitle();
  bigCityCardTitle.textContent = "";
  bigCityCard.setAttribute("data-id", "");
  document.querySelectorAll(".temperature").forEach(function (tempText) {
    tempText.textContent = "";
  });
  document.querySelectorAll(".iconWeather").forEach(function (icon) {
    icon.src = "";
  });
  document.querySelector(".descriptionText").textContent = "";
  document.querySelector(".currentDate").textContent = "";
  document.querySelector(".currentTime").textContent = "";
};

/***3.Fill Reduced big city card */
export const fillReducedCityCard = (town, temp, iconWeather) => {
  document.querySelector(".reducedCardTitle").textContent = `${town}`;
  document.querySelectorAll(".tempReducedCard").forEach(function (tempText) {
    tempText.textContent = `${temp}°C`;
  });
  document.querySelectorAll(".iconWeatherReducedCard").forEach(function (icon) {
    icon.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`;
  });
};
