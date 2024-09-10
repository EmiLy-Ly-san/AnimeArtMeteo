import { backgroundsData } from "./backgrounds.js";

/*******************************************************************GLOBAL SCOPE VARIABLES */
/*********BUTTONS NAV VARIABLES*/
const menuBtn = document.querySelectorAll(".menuBtn");
const unrolledMenuContainer = document.querySelector(".unrolledMenuContainer");
const menuIcon = document.getElementById("menuIcon");
const mainNav = document.querySelector(".mainNav");
const secondNav = document.querySelector(".secondNav");
const extensionNav =
  document.querySelector(".navExtension"); /*DOUBLON AVEC CELUI D'AU DESSUS ??*/
let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
let buttonsCityNavArray = Array.from(getButtonsCityNav());
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
let emptyButtonsArray;
const expandBtn = document.querySelector(".expandBtn");
const expandIcon = document.getElementById("expandIcon");

/*********RESEARCHING TOWN VARIABLES */
const geolocaliseMeBtn = document.querySelector(".geolocaliseMeBtn");
/*Seraching via menu*/
const inputAddCity = document.getElementById("addCity");
const addCityBtn = document.querySelector(".addCityBtn");
/*Searching via quick options*/
const inputCityUser = document.querySelectorAll(".inputCityUser");
let inputCityUserValue;
const searchBtn = document.querySelectorAll(".searchBtn");

/*********BACKGROUNDS VARIABLES */
let backgroundContainer = document.querySelector(".background-container");
let backgroundContainerBig = document.querySelector(
  ".background-container-big"
);
let backgroundSeason;
//AUTUMNWINTER BACKGROUNDS
const backgroundsAutumnWinterSun = backgroundsData.autumnWinter.filter(
  function (background) {
    return background.weather === "sun";
  }
);
const backgroundsAutumnWinterRain = backgroundsData.autumnWinter.filter(
  function (background) {
    return background.weather === "rain";
  }
);
const backgroundsAutumnWinterSnow = backgroundsData.autumnWinter.filter(
  function (background) {
    return background.weather === "snow";
  }
);
const backgroundsAutumnWinterClouds = backgroundsData.autumnWinter.filter(
  function (background) {
    return background.weather === "clouds";
  }
);
const backgroundsAutumnWinterThunderstorm = backgroundsData.autumnWinter.filter(
  function (background) {
    return background.weather === "thunderstorm";
  }
);
//SPRINGSUMMER BACKGROUNDS
const backgroundsSpringSummerSun = backgroundsData.springSummer.filter(
  function (background) {
    return background.weather === "sun";
  }
);
const backgroundsSpringSummerRain = backgroundsData.springSummer.filter(
  function (background) {
    return background.weather === "rain";
  }
);
const backgroundsSpringSummerClouds = backgroundsData.springSummer.filter(
  function (background) {
    return background.weather === "clouds";
  }
);

const backgroundsSpringSummerThunderstorm = backgroundsData.springSummer.filter(
  function (background) {
    return background.weather === "thunderstorm";
  }
);
let randomIndex;
let randomBackgroundArray;
let randomBackground;
let backgroundId;
let backgroundLink = document.querySelector(".backgroundLink");

/*********CITY INFORMATIONS AND API VARIABLES */
let townSearched;
let idTownSearched;
let tempSearched;
let iconWeatherSearched;
let descriptionSearched;
let datas;
let townGeo;
let idGeo;
let urlGeo;
let tempGeo;
let descriptionGeo;
let iconWeatherGeo;
let hasAlreadyLoadedTheCurrentCity;

/*********BACKGROUND CARD VARIABLES */
const autumnWinterSection = document.querySelector(".autumnWinterSection");
const springSummerSection = document.querySelector(".springSummerSection");
const backgroundsAutumnWinterCards =
  document.querySelectorAll(".autumnWinterCard");
let backgroundsAutumnWinterCardsArray = Array.from(
  backgroundsAutumnWinterCards
);
const backgroundsSpringSummerCards =
  document.querySelectorAll(".springSummerCard");
let backgroundsSpringSummerCardsArray = Array.from(
  backgroundsSpringSummerCards
);
const getFavoritesBackgroundsAll = () =>
  document.querySelectorAll(".favoriteBackgroundCard");
const favoritesBackgroundsArray = Array.from(getFavoritesBackgroundsAll());
const GarbageButtonBackgroundCard = document.querySelectorAll(".garbageButton");
const VisibilityButtonBackgroundCard =
  document.querySelectorAll(".visibilityButton");
const heartBtn = document.querySelector(".heart-button");
const heartIcon = document.getElementById("heartIcon");

/*********CITY CARD VARIABLES */
const getBigCityCardTitle = () => document.querySelector(".bigCityCardTitle");
const garbageCityBtn = document.querySelectorAll(".garbageCityBtn");
const addCardCityBtn = document.querySelector(".addCardCityBtn");
const garbageCardCityBtn = document.querySelector(".garbageCardCityBtn");
const bigCityCard = document.getElementById("cityCardModal");
const visibilityCityBtn = document.querySelectorAll(".visibilityCityBtn");
const reducedCardvisibilityBtn = document.querySelector(
  ".reducedCardvisibilityBtn"
);
const getMiniCityCardTitle = () => document.querySelector(".miniCardTown");
const favoritesCitiesCardsAll = document.querySelectorAll(".favoriteCityCard");
let favoriteCityCardArray = Array.from(favoritesCitiesCardsAll);

/*******************************************************************GENERALS FONCTIONS */
function switchIcon(icon) {
  const currentSrc = icon.getAttribute("src");
  const nextSrc = icon.getAttribute("data-icon");
  icon.setAttribute("src", nextSrc);
  icon.setAttribute("data-icon", currentSrc);
}

function getEmptyButtons(buttonsArray) {
  return buttonsArray.filter(function (button) {
    return button.textContent === "";
  });
}

function getEmptyButtonsMainNav(buttonsArray) {
  return buttonsArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnMainNav");
    })
    .filter(function (btn) {
      return btn.textContent == "";
    });
}

function getEmptyButtonsSecondNav(buttonsArray) {
  return buttonsArray.filter(function (btn) {
    return btn.classList.contains("citiesBtnSecondNav");
  });
}

function getFilledButtonsMainNav(buttonsArray) {
  return buttonsArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnMainNav");
    })
    .filter(function (btn) {
      return btn.textContent != "";
    });
}

function getFilledButtonsSecondNav(buttonsArray) {
  return buttonsArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnSecondNav");
    })
    .filter(function (btn) {
      return btn.textContent != "";
    });
}

function getEmptyCards(cardsArray) {
  return cardsArray.filter(function (card) {
    return card.id === "";
  });
}

function isTownLoaded(array, city) {
  const filledElements = array.filter((element) => {
    // double negation veut dire "n'est pas , n'est pas" et revient donc a dire ici "a un text.content"
    return !!element.textContent;
  });
  hasAlreadyLoadedTheCurrentCity = filledElements.some(
    (btn) => btn.textContent === city
  );
}

function matchWithIdCardToRemove(element, array) {
  const idToFind = element.dataset.id;
  const cardToFind = array.find((card) => card.id === `${idToFind}`);
  console.log({ cardToFind });
  cardToFind.remove();
  const index = array.indexOf(cardToFind);
  console.log({ index });
  array.splice(index, 1);
  isBgLiked();
}

//REMOVE CITY BUTTON NAV
let textToFind;
let buttonToFind;

function removeCityBtn(elementWithCityNameInTextContent) {
  //in listener garbageCard
  textToFind = elementWithCityNameInTextContent.textContent;
  findTheButtonNavToDelete(textToFind);
  replaceBtnNavToDeleteByNewEmptyButton();
  /*removeButtonFromTheNav();*/
}

function findTheButtonNavToDelete(textToFind) {
  buttonToFind = buttonsCityNavArray.find(
    (btn) => btn.textContent === `${textToFind}`
  );
}

let newButtonLi;
let newEmptyButton;
function replaceBtnNavToDeleteByNewEmptyButton() {
  createNewEmptyButton();
  placeInTheGoodNav();
}

function createNewEmptyButton() {
  newButtonLi = document.createElement("li");
  newButtonLi.classList.add("nav-item", "citiesNavigation");
  newEmptyButton = document.createElement("button");
  newEmptyButton.classList.add(
    "citiesBtn",
    "btn",
    "btn-primary",
    "opacity-75",
    "rounded-pill",
    "text-secondary",
    "fw-bold"
  );
  newButtonLi.append(newEmptyButton);
  newEmptyButton.textContent = "";
  newEmptyButton.dataset.id = "";
  newEmptyButton.disabled = true;
  newEmptyButton.setAttribute("data-bs-toggle", "modal");
  newEmptyButton.setAttribute("data-bs-target", "#cityCardModal");
}

function placeInTheGoodNav() {
  if (mainNav.contains(buttonToFind) === true) {
    mainNav.append(newButtonLi);
    newButtonLi.append(newEmptyButton);
    newEmptyButton.classList.add("citiesBtnMainNav");
    buttonsCityNavArray.push(newEmptyButton);
    attachListenersToBtnCityNavButtons();
    const buttonToFindLi = buttonToFind.closest("li");
    buttonToFindLi.remove();
    buttonToFind.remove();
    buttonsCityNavArray = buttonsCityNavArray.filter(
      (btn) => btn !== buttonToFind
    );
  } else {
    secondNav.append(newButtonLi);
    newButtonLi.append(newEmptyButton);
    newEmptyButton.classList.add("citiesBtnSecondNav");
    buttonsCityNavArray.push(newEmptyButton);
    attachListenersToBtnCityNavButtons();
    const buttonToFindLi = buttonToFind.closest("li");
    buttonToFindLi.remove();
    buttonToFind.remove();
    buttonsCityNavArray = buttonsCityNavArray.filter(
      (btn) => btn !== buttonToFind
    );
  }
}

/*function removeButtonFromTheNav() {
  const buttonToFindLi = buttonToFind.closest("li");
  buttonToFindLi.remove();
  buttonToFind.remove();
  buttonsCityNavArray = buttonsCityNavArray.filter(
    (btn) => btn !== buttonToFind
  );
  console.log(
    "J ai fini ! buttonsCityNavArray",
    buttonsCityNavArray.map((btn) => btn.textContent)
  );
}*/

//REORGANIZE NAV
let emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);
let emptyButtonsSecondNav = getEmptyButtonsSecondNav(buttonsCityNavArray);
let filledButtonsSecondNav = getFilledButtonsSecondNav(buttonsCityNavArray);
let filledButtonsMainNav = getFilledButtonsMainNav(buttonsCityNavArray);
let buttonToUpgrade;

function reorganizeNavifNecessary() {
  //in listener garbageCard
  /*getButtonsCityNav();*/
  findIfBtnToUpgradeIsInSecondNav();
  if (buttonToUpgrade && buttonToUpgrade === filledButtonsSecondNav[0]) {
    switchFirstEmptyBtnMainNavWithBtnToUpgradeSecondNav();
    createNewEmptyButtonInSecondNav();
  }
}

function findIfBtnToUpgradeIsInSecondNav() {
  emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);
  console.log({ emptyButtonsMainNav });
  emptyButtonsSecondNav = getEmptyButtonsSecondNav(buttonsCityNavArray);
  filledButtonsSecondNav = getFilledButtonsSecondNav(buttonsCityNavArray);
  filledButtonsMainNav = getFilledButtonsMainNav(buttonsCityNavArray);
  if (emptyButtonsMainNav && emptyButtonsMainNav.length > 0) {
    buttonToUpgrade = filledButtonsSecondNav[0];
  }
}

function switchFirstEmptyBtnMainNavWithBtnToUpgradeSecondNav() {
  if (buttonToUpgrade) {
    emptyButtonsMainNav[emptyButtonsMainNav.length - 1].textContent =
      buttonToUpgrade.textContent;
    buttonToUpgrade.textContent = "";
    buttonToUpgrade.classList.add(
      "citiesBtn",
      "btn",
      "btn-primary",
      "opacity-75",
      "rounded-pill",
      "text-secondary",
      "fw-bold"
    );
    buttonToUpgrade.classList.remove("border-secondary");
    buttonToUpgrade.remove();
    attachListenersToBtnCityNavButtons();
  }
  emptyButtonsMainNav[emptyButtonsMainNav.length - 1].dataset.id = "";
  emptyButtonsMainNav[emptyButtonsMainNav.length - 1].disabled = true;
  emptyButtonsMainNav[0].disabled = false;
  emptyButtonsMainNav[0].classList.remove(
    "btn-primary",
    "opacity-75",
    "border-secondary"
  );
  emptyButtonsMainNav[0].classList.add("border-secondary");
}

function createNewEmptyButtonInSecondNav() {
  const newEmptyButtonSecondNav = document.createElement("button");
  newEmptyButtonSecondNav.classList.add(
    "citiesBtn",
    "btn",
    "btn-primary",
    "opacity-75",
    "rounded-pill",
    "text-secondary",
    "fw-bold"
  );
  newEmptyButtonSecondNav.textContent = "";
  newEmptyButtonSecondNav.dataset.id = "";
  newEmptyButtonSecondNav.disabled = true;
  newEmptyButtonSecondNav.setAttribute("data-bs-toggle", "modal");
  newEmptyButtonSecondNav.setAttribute("data-bs-target", "#cityCardModal");
  secondNav.append(newEmptyButtonSecondNav);
  attachListenersToBtnCityNavButtons();
}

function matchWithSrcCardToDisplay(button) {
  const bgToDisplay = button.getAttribute("data-src");
  backgroundContainer.style.backgroundImage = `url(${bgToDisplay})`;
  backgroundContainerBig.style.backgroundImage = `url(${bgToDisplay})`;
}

/*******************************************************************RUNNING FUNCTIONS */
/*********GEOLOCALISATION */
function geolocaliseMe() {
  if ("geolocation" in navigator) {
    let options = {
      getHigheAccuracy: true,
    };
    //Finding the current user position with api openweather
    let watch = navigator.geolocation.watchPosition(
      async (position) => {
        navigator.geolocation.clearWatch(watch);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        urlGeo =
          "https://api.openweathermap.org/data/2.5/weather?lon=" +
          position.coords.longitude +
          "&lat=" +
          position.coords.latitude +
          "&appid=075e3c803b57e9d25a7e50c00e33a2ff&units=metric";
        console.log(urlGeo);

        await recoverGeolocTown();
        fillCityCard(townGeo, idGeo, tempGeo, iconWeatherGeo, descriptionGeo);
        fillReducedCityCard(townGeo, tempGeo, iconWeatherGeo);
        setSeasonBackground(descriptionGeo);
        isBgLiked();
      },
      error,
      options
    );
    async function error() {
      alert("You have refused geolocation.");
      townGeo = "Paris";
      await recoverTown(townGeo);
      fillCityCard(
        townGeo,
        idGeo,
        tempSearched,
        descriptionSearched,
        iconWeatherSearched
      );
      fillReducedCityCard(townGeo, tempGeo, iconWeatherGeo);
      setSeasonBackground(descriptionSearched);
      isBgLiked();
    }
  } else {
    alert("Geolocation cannot be used.");
    townGeo = "Paris";
    (async function getFallbackCity() {
      await recoverTown(townGeo);
      fillReducedCityCard(townGeo, tempGeo, iconWeatherGeo);
      fillCityCard(
        townGeo,
        idGeo,
        tempSearched,
        descriptionSearched,
        iconWeatherSearched
      );
      setSeasonBackground(descriptionSearched);
      isBgLiked();
    })();
  }
}

async function recoverGeolocTown() {
  const request = await fetch(urlGeo, {
    method: "GET",
  });
  if (!request.ok) {
    alert("Sorry, a problem has occurred");
  } else {
    let datas = await request.json();
    console.log({ datas });
    townGeo = datas.name;
    console.log({ townGeo });
    idGeo = datas.id;
    console.log(idGeo);
    tempGeo = Math.round(datas.main.temp);
    console.log({ tempGeo });
    descriptionGeo = datas.weather[0].main;
    console.log({ descriptionGeo });
    iconWeatherGeo = datas.weather[0].icon;
    console.log({ iconWeatherGeo });
  }
}

/*******RECOVER A NEW MANUAL SEARCHING TOWN */
async function recoverTown(town) {
  const urlforSearching =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    town +
    "&appid=075e3c803b57e9d25a7e50c00e33a2ff&units=metric";
  const request = await fetch(urlforSearching, {
    method: "GET",
  });
  if (!request.ok) {
    alert(
      "Please, write your city with the correct spelling.\nWARNING! Hyphens are not accepted. For example in New-York, write New York instead."
    );
  } else {
    datas = await request.json();
    console.log({ datas });
    idTownSearched = datas.id;
    console.log({ idTownSearched });
    tempSearched = Math.round(datas.main.temp);
    console.log({ tempSearched });
    descriptionSearched = datas.weather[0].main;
    console.log({ descriptionSearched });
    iconWeatherSearched = datas.weather[0].icon;
    console.log({ iconWeatherSearched });
  }
}

/*********GENERATE BACKGROUND */
function setSeasonBackground(description) {
  let currentDate = new Date();
  let month = currentDate.getMonth();
  console.log({ month });
  if (month >= 3 && month < 8) {
    //getMonth() give a number between 0 and 11 (January-December)
    backgroundSeason = "springSummer";
    getBackgroundSpringSummer(description);
  } else {
    backgroundSeason = "autumnWinter";
    getBackgroundAutumnWinter(description);
  }
  console.log({ backgroundSeason });
}

function indexGenerator(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setBackgroundProperties(seasonBackgroundArray) {
  randomIndex = indexGenerator(seasonBackgroundArray.length);
  console.log({ randomIndex });
  randomBackgroundArray = Array.from(seasonBackgroundArray);
  randomBackground = randomBackgroundArray[randomIndex].file;
  backgroundId = randomBackgroundArray[randomIndex].id;
  console.log({ randomBackground });
  backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
  backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
  backgroundContainer.dataset.id = backgroundId;
  backgroundLink.href = `${randomBackgroundArray[randomIndex].source}`;
  console.log({ backgroundLink });
}

function getBackgroundSpringSummer(description) {
  switch (description) {
    case "Clear":
      setBackgroundProperties(backgroundsSpringSummerSun);
      break;
    case "Drizzle":
    case "Rain":
    case "Mist":
    case "Haze":
      setBackgroundProperties(backgroundsSpringSummerRain);
      break;
    case "Clouds":
    case "Atmosphere":
      setBackgroundProperties(backgroundsSpringSummerClouds);
      break;
    case "Thunderstorm":
      setBackgroundProperties(backgroundsSpringSummerThunderstorm);
      break;
    default:
      backgroundContainer.style.backgroundImage =
        "url(assets/backgrounds/summer-spring/sun/1e4fe3db756c83c5c3f7ed904e002436.jpg)";
      backgroundContainerBig.style.backgroundImage =
        "url(assets/backgrounds/summer-spring/sun/1e4fe3db756c83c5c3f7ed904e002436.jpg)";
      backgroundContainer.dataset.id = "ss60";
      backgroundLink.href = "https://www.pinterest.fr/pin/238479742764135468/";
  }
}

function getBackgroundAutumnWinter(description) {
  switch (description) {
    case "Clear":
      setBackgroundProperties(backgroundsAutumnWinterSun);
      break;
    case "Drizzle":
    case "Rain":
    case "Mist":
    case "Haze":
      setBackgroundProperties(backgroundsAutumnWinterRain);
      break;
    case "Clouds":
    case "Atmosphere":
      setBackgroundProperties(backgroundsAutumnWinterClouds);
      break;
    case "Snow":
      setBackgroundProperties(backgroundsAutumnWinterSnow);
      break;
    case "Thunderstorm":
      setBackgroundProperties(backgroundsAutumnWinterThunderstorm);
      break;
    default:
      backgroundContainer.style.backgroundImage =
        "url(/assets/backgrounds/autumn-winter/sun/2e22f614e218b2d8e9b6ad04a74db87f.jpg)";
      backgroundContainerBig.style.backgroundImage =
        "url(/assets/backgrounds/autumn-winter/sun/2e22f614e218b2d8e9b6ad04a74db87f.jpg)";
      backgroundContainer.dataset.id = "ah92";
      backgroundLink.href = "https://www.pinterest.fr/pin/238479742764225963/";
  }
}

/*********COLLECTION BACKGROUND */
const createNewBackgroundCard = (section) => {
  const newCard = document.createElement("div");
  section.append(newCard);
  newCard.classList.add(
    "card",
    "favoriteBackgroundCard",
    "springSummerCard",
    "shadow-sm",
    "overflow-hidden",
    "bg-primary",
    "rounded-40"
  );
  newCard.setAttribute("id", `${backgroundId}`);
  favoritesBackgroundsArray.push(newCard);
  const newBackgroundContainer = document.createElement("div");
  newCard.append(newBackgroundContainer);
  newBackgroundContainer.classList.add(
    "container-img-background",
    "m-4",
    "rounded-40",
    "overflow-hidden",
    "m-4"
  );
  const newCardFooter = document.createElement("div");
  newCard.append(newCardFooter);
  newCardFooter.classList.add(
    "card-footer",
    "d-flex",
    "justify-content-center",
    "bg-primary",
    "m-4",
    "p-4"
  );
  const newGarbageButton = document.createElement("button");
  newCardFooter.append(newGarbageButton);
  newGarbageButton.classList.add("garbageButton", "btn", "w-25");
  const newGarbageIcon = document.createElement("img");
  newGarbageButton.append(newGarbageIcon);
  newGarbageIcon.setAttribute("src", "assets/icons/garbage-blue.svg");
  newGarbageIcon.setAttribute(
    "alt",
    "icon to delete this city from your favorite"
  );
  newGarbageButton.dataset.id = newCard.id;
  const newVisibilityButton = document.createElement("button");
  newCardFooter.append(newVisibilityButton);
  newVisibilityButton.classList.add("visibilityButton", "btn", "w-25");
  newVisibilityButton.setAttribute("type", "button");
  const newVisibilityIcon = document.createElement("img");
  newVisibilityButton.append(newVisibilityIcon);
  newVisibilityIcon.setAttribute("src", "assets/icons/visibility-blue.svg");
  newVisibilityIcon.setAttribute("alt", "icon to select and enlarge this city");
  newVisibilityButton.addEventListener("click", () => {
    matchWithSrcCardToDisplay(newVisibilityButton);
  });
  newGarbageButton.addEventListener("click", () => {
    matchWithIdCardToRemove(newGarbageButton, favoritesBackgroundsArray);
    isBgLiked();
  });
};

function placeInCollectionBackground() {
  const miniBackgroundCard = {
    id: backgroundId,
    file: randomBackground,
    season: backgroundSeason,
    putAwayInSubCollection: function () {
      if (miniBackgroundCard.season === "autumnWinter") {
        createNewBackgroundCard(autumnWinterSection);
      } else {
        createNewBackgroundCard(springSummerSection);
      }
      const cardToFill = document.getElementById(`${miniBackgroundCard.id}`);
      cardToFill.querySelector(
        ".container-img-background"
      ).style.backgroundImage = `url(${miniBackgroundCard.file})`;
      cardToFill.querySelector(
        ".visibilityButton"
      ).dataset.src = `${miniBackgroundCard.file}`;
      console.log({ cardToFill });
      cardToFill.querySelector(
        ".garbageButton"
      ).dataset.id = `${miniBackgroundCard.id}`;
    },
  };
  console.log({ miniBackgroundCard });
  miniBackgroundCard.putAwayInSubCollection();
}

function isBgLiked() {
  const dataBgId = backgroundContainer.dataset.id;
  console.log({ dataBgId });

  const bgToFind = favoritesBackgroundsArray.find(
    (bg) => bg.id === `${dataBgId}`
  );
  console.log({ favoritesBackgroundsArray });
  console.log({ bgToFind });
  if (bgToFind) {
    heartIcon.setAttribute("src", "assets/icons/hearts.png");
  } else {
    heartIcon.setAttribute("src", "assets/icons/empty-heart.svg");
  }
}

const giveMsgOfNoBg = () => {
  const GetLikedBackgroundsAutumnWinter = () =>
    autumnWinterSection.querySelectorAll(".favoriteBackgroundCard");
  const likedBackgroundsAutumnWinter = Array.from(
    GetLikedBackgroundsAutumnWinter()
  );
  const GetLikedBackgroundsSpringSummer = () =>
    springSummerSection.querySelectorAll(".favoriteBackgroundCard");
  const likedBackgroundsSpringSummer = Array.from(
    GetLikedBackgroundsSpringSummer()
  );
  if (likedBackgroundsAutumnWinter.length === 0) {
    const message = document.createElement("p");
    message.classList.add("text-dark", "text-start", "fst-italic");
    message.textContent = "You don't like any Autumn-Winter backgrounds yet.";
    autumnWinterSection.append(message);
  }
  if (likedBackgroundsSpringSummer.length === 0) {
    const message = document.createElement("p");
    message.classList.add("text-dark", "text-start", "fst-italic");
    message.textContent = "You don't like any Spring-Summer backgrounds yet.";
    springSummerSection.append(message);
  }
};

/***************CITY COLLECTION */

async function generateCityObject(value) {
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

/*********BIG CITY CARD FUNCTIONS */
function fillCityCard(town, id, temp, iconWeather, description) {
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
}

function resetBigCityCard() {
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
}

function fillReducedCityCard(town, temp, iconWeather) {
  document.querySelector(".reducedCardTitle").textContent = `${town}`;
  document.querySelectorAll(".tempReducedCard").forEach(function (tempText) {
    tempText.textContent = `${temp}°C`;
  });
  document.querySelectorAll(".iconWeatherReducedCard").forEach(function (icon) {
    icon.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`;
  });
}

/*******************************************************************EVENTS */
geolocaliseMeBtn.addEventListener("click", geolocaliseMe);

/*const newBtnNavFoundEvent = new CustomEvent("newBtnNavFound", {
  detail: getButtonsCityNav.createElement("button"),
});
document.addEventListener("newBtnNavFound", (e) =>
  e.attachListenersToCityNavButtons()
);
document.dispatchEvent(newBtnNavFoundEvent);*/

function attachListenersToBtnCityNavButtons() {
  const buttonsCityNav = getButtonsCityNav();
  buttonsCityNav.forEach(function (cityBtn) {
    cityBtn.addEventListener("click", async () => {
      console.log(
        "Je commence ! buttonsCityNavArray",
        buttonsCityNavArray.map((btn) => btn.textContent)
      );
      resetBigCityCard();
      townSearched = cityBtn.textContent;
      console.log({ townSearched });
      await recoverTown(townSearched);
      setSeasonBackground(descriptionSearched);
      isBgLiked();
      fillCityCard(
        townSearched,
        idTownSearched,
        tempSearched,
        iconWeatherSearched,
        descriptionSearched
      );
      fillReducedCityCard(townSearched, tempSearched, iconWeatherSearched);
    });
  });
}
attachListenersToBtnCityNavButtons();

menuBtn.forEach(function (btn) {
  btn.addEventListener("click", () => {
    unrolledMenuContainer.classList.toggle("hidden");
    switchIcon(menuIcon);
  });
});

expandBtn.addEventListener("click", () => {
  extensionNav.classList.toggle("display-none");
  switchIcon(expandIcon);
});

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
    fillReducedCityCard(inputCityUserValue, tempSearched, iconWeatherSearched);
    inputCityUser.forEach(function (input) {
      input.value = "";
    });
  });
});

reducedCardvisibilityBtn.addEventListener("click", async () => {
  townSearched = cityCardTitle.textContent;
  await recoverTown(townSearched);
  setSeasonBackground(descriptionSearched);
  isBgLiked();
  fillCityCard(
    townSearched,
    idTownSearched,
    tempSearched,
    iconWeatherSearched,
    descriptionSearched
  );
});

heartBtn.addEventListener("click", () => {
  if (heartIcon.getAttribute("src") == "assets/icons/hearts.png") {
    heartIcon.setAttribute("src", "assets/icons/empty-heart.svg");
    matchWithIdCardToRemove(backgroundContainer, favoritesBackgroundsArray);
  } else {
    heartIcon.setAttribute("src", "assets/icons/hearts.png");
    placeInCollectionBackground();
  }
});

VisibilityButtonBackgroundCard.forEach(function (button) {
  button.addEventListener("click", () => {
    matchWithSrcCardToDisplay(button);
  });
});

GarbageButtonBackgroundCard.forEach(function (button) {
  button.addEventListener("click", () => {
    matchWithIdCardToRemove(button, favoritesBackgroundsArray);
  });
});

garbageCityBtn.forEach(function (button) {
  button.addEventListener("click", () => {
    const idToFind = button.dataset.id;
    const cardToFind = favoriteCityCardArray.find(
      (card) => card.id === `${idToFind}`
    );
    const currentMiniCityCardTitle = cardToFind.querySelector(".miniCardTown");
    removeCityBtn(currentMiniCityCardTitle);
    matchWithIdCardToRemove(button, favoriteCityCardArray);
    reorganizeNavifNecessary();
  });
});

garbageCardCityBtn.addEventListener("click", () => {
  removeCityBtn(getBigCityCardTitle());
  reorganizeNavifNecessary();
  /*matchWithTextButtonToRemove(getBigCityCardTitle());*/

  matchWithIdCardToRemove(garbageCardCityBtn, favoriteCityCardArray);
  resetBigCityCard();
});

addCardCityBtn.addEventListener("click", async () => {
  townSearched = addCardCityBtn.dataset.cityName;
  await recoverTown(townSearched);
  setSeasonBackground(descriptionSearched);
  isBgLiked();
  fillCityCard(
    townSearched,
    idTownSearched,
    tempSearched,
    iconWeatherSearched,
    descriptionSearched
  );
  generateCityObject(townSearched);
});

addCityBtn.addEventListener("click", async () => {
  townSearched = inputAddCity.value;
  await recoverTown(townSearched);
  setSeasonBackground(descriptionSearched);
  isBgLiked();
  fillCityCard(
    townSearched,
    idTownSearched,
    tempSearched,
    iconWeatherSearched,
    descriptionSearched
  );
  fillReducedCityCard(townSearched, tempSearched, iconWeatherSearched);
  generateCityObject(townSearched);
});

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
    giveMsgOfNoBg();
  });
});

/*******************************************************************LET APPLICATION */
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
