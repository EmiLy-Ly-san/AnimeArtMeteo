import {
  isTownLoaded,
  hasAlreadyLoadedTheCurrentCity,
  getEmptyButtons,
  getEmptyButtonsMainNav,
  getEmptyButtonsSecondNav,
} from "./utilities.js";
import { buttonsCityNavArray } from "./navigation.js";
import { idTownSearched } from "./recoverTown.js";

/******CITY CARDS VARIABLES */
export const getBigCityCardTitle = () =>
  document.querySelector(".bigCityCardTitle");

export const addCardCityBtn = document.querySelector(".addCardCityBtn");
export const garbageCardCityBtn = document.querySelector(".garbageCardCityBtn");
const bigCityCard = document.getElementById("cityCardModal");

const getMiniCityCardTitle = () => document.querySelector(".miniCardTown");
const favoritesCitiesCardsAll = document.querySelectorAll(".favoriteCityCard");
let favoriteCityCardArray = Array.from(favoritesCitiesCardsAll);

/***1.GENERATE CITY OBJECT */
let emptyButtonsArray;
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
      isTownLoaded(buttonsCityNavArray, newCity);
      if (!hasAlreadyLoadedTheCurrentCity) {
        emptyButtonsArray = getEmptyButtons(buttonsCityNavArray);
        let emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);
        const emptyButtonsSecondNav =
          getEmptyButtonsSecondNav(emptyButtonsArray);
        if (emptyButtonsMainNav.length !== 0) {
          emptyButtonsMainNav[0].textContent = newCity;
          emptyButtonsMainNav[0].disabled = false;
          emptyButtonsMainNav[0].classList.remove("btn-primary", "opacity-75");
          emptyButtonsMainNav[0].classList.add("border-secondary");
          emptyButtonsMainNav[0].dataset.id = idTownSearched;
          emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);
          while (emptyButtonsMainNav.length !== 0) {
            emptyButtonsSecondNav.forEach(function (btn) {
              emptyButtonsMainNav.push(btn);
              emptyButtonsSecondNav.shift(btn);
            });
          }
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
      }
    },
  };
  miniCityCard.generateCityButton();
  miniCityCard.fillMiniCityCard();
  console.log({ miniCityCard });
  console.log({ buttonsCityNavArray });
}

/***2. RESET AND Fill BIG CITY CARD*/
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
