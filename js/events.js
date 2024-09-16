import {
  heartIcon,
  favoritesBackgroundsArray,
  placeInCollectionBackground,
  isBgLiked,
  giveMsgOfNoBgIfNecessary,
} from "./backgroundsUserCollection.js";
import {
  backgroundContainer,
  setSeasonBackground,
} from "./backgroundRandom.js";
import {
  matchWithIdCardToRemove,
  switchIcon,
  matchWithSrcCardToDisplay,
} from "./utilities.js";
import { geolocaliseMe } from "./geolocation.js";
import {
  idTownSearched,
  tempSearched,
  iconWeatherSearched,
  descriptionSearched,
  recoverTown,
} from "./recoverTown.js";
import {
  fillCityCard,
  garbageCardCityBtn,
  addCardCityBtn,
  getBigCityCardTitle,
  resetBigCityCard,
  generateCityObject,
  fillReducedCityCard,
  favoriteCityCardArray,
} from "./cityCards.js";
import {
  removeCityBtn,
  reorganizeNavifNecessary,
} from "./cityButtonsGestion.js";

/****EVENTS */
export function runEvents() {
  const menuBtn = document.querySelectorAll(".menuBtn");
  const unrolledMenuContainer = document.querySelector(
    ".unrolledMenuContainer"
  );
  const menuIcon = document.getElementById("menuIcon");
  menuBtn.forEach(function (btn) {
    btn.addEventListener("click", () => {
      unrolledMenuContainer.classList.toggle("hidden");
      switchIcon(menuIcon);
    });
  });

  const expandBtn = document.querySelector(".expandBtn");
  const extensionNav = document.querySelector(".navExtension");
  const expandIcon = document.getElementById("expandIcon");
  expandBtn.addEventListener("click", () => {
    extensionNav.classList.toggle("display-none");
    switchIcon(expandIcon);
  });

  const searchBtn = document.querySelectorAll(".searchBtn");
  const inputCityUser = document.querySelectorAll(".inputCityUser");
  let inputCityUserValue;
  searchBtn.forEach(function (eachSearchBtn) {
    eachSearchBtn.addEventListener("click", async () => {
      inputCityUserValue = inputCityUser[eachSearchBtn.id].value;
      await recoverTown(inputCityUserValue);
      fillCityCard(
        inputCityUserValue,
        idTownSearched,
        tempSearched,
        iconWeatherSearched,
        descriptionSearched
      );
      fillReducedCityCard(
        inputCityUserValue,
        tempSearched,
        iconWeatherSearched
      );
      inputCityUser.forEach(function (input) {
        input.value = "";
      });
    });
  });

  const heartBtn = document.querySelector(".heart-button");
  heartBtn.addEventListener("click", () => {
    if (heartIcon.getAttribute("src") == "./assets/icons/hearts.png") {
      heartIcon.setAttribute("src", "./assets/icons/empty-heart.svg");
      matchWithIdCardToRemove(backgroundContainer, favoritesBackgroundsArray);
    } else {
      heartIcon.setAttribute("src", "./assets/icons/hearts.png");
      placeInCollectionBackground();
    }
  });

  const reducedCardvisibilityBtn = document.querySelector(
    ".reducedCardvisibilityBtn"
  );
  reducedCardvisibilityBtn.addEventListener("click", async () => {
    const townToEnlarged =
      document.querySelector(".bigCityCardTitle").textContent;
    await recoverTown(townToEnlarged);
    setSeasonBackground(descriptionSearched);
    isBgLiked();
    fillCityCard(
      townToEnlarged,
      idTownSearched,
      tempSearched,
      iconWeatherSearched,
      descriptionSearched
    );
  });

  const geolocaliseMeBtn = document.querySelector(".geolocaliseMeBtn");
  geolocaliseMeBtn.addEventListener("click", geolocaliseMe);

  const visibilityButtonBackgroundCard =
    document.querySelectorAll(".visibilityButton");
  visibilityButtonBackgroundCard.forEach(function (button) {
    button.addEventListener("click", () => {
      matchWithSrcCardToDisplay(button);
    });
  });

  const garbageButtonBackgroundCard =
    document.querySelectorAll(".garbageButton");
  garbageButtonBackgroundCard.forEach(function (button) {
    button.addEventListener("click", () => {
      matchWithIdCardToRemove(button, favoritesBackgroundsArray);
      isBgLiked();
      giveMsgOfNoBgIfNecessary();
    });
  });

  const garbageCityBtn = document.querySelectorAll(".garbageCityBtn");
  garbageCityBtn.forEach(function (button) {
    button.addEventListener("click", () => {
      const idToFind = button.dataset.id;
      const cardToFind = favoriteCityCardArray.find(
        (card) => card.id === `${idToFind}`
      );
      const currentMiniCityCardTitle =
        cardToFind.querySelector(".miniCardTown");
      removeCityBtn(currentMiniCityCardTitle);
      matchWithIdCardToRemove(button, favoriteCityCardArray);
      reorganizeNavifNecessary();
    });
  });

  garbageCardCityBtn.addEventListener("click", () => {
    removeCityBtn(getBigCityCardTitle());
    reorganizeNavifNecessary();
    matchWithIdCardToRemove(garbageCardCityBtn, favoriteCityCardArray);
    resetBigCityCard();
  });

  addCardCityBtn.addEventListener("click", async () => {
    const townToAdd = addCardCityBtn.dataset.cityName;
    await recoverTown(townToAdd);
    setSeasonBackground(descriptionSearched);
    isBgLiked();
    fillCityCard(
      townToAdd,
      idTownSearched,
      tempSearched,
      iconWeatherSearched,
      descriptionSearched
    );
    generateCityObject(townToAdd);
  });

  const addCityBtn = document.querySelector(".addCityBtn");
  const inputAddCity = document.getElementById("addCity");
  addCityBtn.addEventListener("click", async () => {
    const townUser = inputAddCity.value;
    await recoverTown(townUser);
    setSeasonBackground(descriptionSearched);
    isBgLiked();
    fillCityCard(
      townUser,
      idTownSearched,
      tempSearched,
      iconWeatherSearched,
      descriptionSearched
    );
    fillReducedCityCard(townUser, tempSearched, iconWeatherSearched);
    generateCityObject(townUser);
  });

  const visibilityCityBtn = document.querySelectorAll(".visibilityCityBtn");
  visibilityCityBtn.forEach(function (btn) {
    btn.addEventListener("click", async () => {
      const cityToFind = btn.dataset.cityName;
      console.log({ cityToFind });
      await recoverTown(cityToFind);
      fillCityCard(
        cityToFind,
        idTownSearched,
        tempSearched,
        iconWeatherSearched,
        descriptionSearched
      );
      setSeasonBackground(descriptionSearched);
      isBgLiked();
    });
  });

  const backgroundCollectionButton = document.querySelectorAll(
    ".backgroundCollectionButton"
  );
  backgroundCollectionButton.forEach(function (button) {
    button.addEventListener("click", () => {
      giveMsgOfNoBgIfNecessary();
    });
  });
}
