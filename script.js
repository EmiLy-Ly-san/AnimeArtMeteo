import { backgroundsData } from "./backgrounds.js";
/*******GENRALS FUNCTIONS */
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

function getEmptyCards(cardsArray) {
  return cardsArray.filter(function (card) {
    return card.id === "";
  });
}

/*******GEOLOCALISE ME */
let townGeo;
let urlGeo;
let tempGeo;
let descriptionGeo;
let iconWeatherGeo;
const geolocaliseMeBtn = document.querySelector(".geolocaliseMeBtn");
geolocaliseMeBtn.addEventListener("click", geolocaliseMe);

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
        fillCityCard(townGeo, tempGeo, descriptionGeo, iconWeatherGeo);
        setSeasonBackground(descriptionGeo);
        isBgLiked();
      },
      error,
      options
    );
    async function error() {
      alert("Vous avez refuse la geolocalisation.");
      townGeo = "Paris";
      await recoverTown(townGeo);
      fillCityCard(
        townGeo,
        tempSearched,
        descriptionSearched,
        iconWeatherSearched
      );
      setSeasonBackground(descriptionSearched);
      isBgLiked();
    }
  } else {
    alert("La geolocalisation ne peut pas etre utilisee.");
    townGeo = "Paris";
    recoverTown(townGeo);
    fillCityCard(
      townGeo,
      tempSearched,
      descriptionSearched,
      iconWeatherSearched
    );
    setSeasonBackground(descriptionSearched);
    isBgLiked();
  }
}

async function recoverGeolocTown() {
  const request = await fetch(urlGeo, {
    method: "GET",
  });
  if (!request.ok) {
    alert("Un probleme est survenu");
  } else {
    let datas = await request.json();
    console.log({ datas });
    townGeo = datas.name;
    console.log({ townGeo });
    tempGeo = datas.main.temp;
    console.log({ tempGeo });
    descriptionGeo = datas.weather[0].main;
    console.log({ descriptionGeo });
    iconWeatherGeo = datas.weather[0].icon;
    console.log({ iconWeatherGeo });
  }
}

/********BACKGROUND DISPLAY */
/*const response = fetch("backgrounds.json");
const backgrounds = response.json();*/
let backgroundContainer = document.querySelector(".background-container");
let backgroundContainerBig = document.querySelector(
  ".background-container-big"
);
let backgroundSeason;

console.log({ backgroundsData });
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

let randomIndex;
let randomBackgroundArray;
let randomBackground;
let backgroundId;

function getBackgroundSpringSummer(description) {
  switch (description) {
    case "Clear":
      randomIndex = indexGenerator(backgroundsSpringSummerSun.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerSun);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Drizzle":
    case "Rain":
    case "Mist":
      randomIndex = indexGenerator(backgroundsSpringSummerRain.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerRain);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Clouds":
    case "Atmosphere":
      randomIndex = indexGenerator(backgroundsSpringSummerClouds.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerClouds);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Thunderstorm":
      randomIndex = indexGenerator(backgroundsSpringSummerThunderstorm.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerClouds);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    default:
      backgroundContainer =
        "url(assets/backgrounds/summer-spring/sun/1e4fe3db756c83c5c3f7ed904e002436.jpg)";
      backgroundContainerBig.style.backgroundImage =
        "url(assets/backgrounds/summer-spring/sun/1e4fe3db756c83c5c3f7ed904e002436.jpg)";
      backgroundContainer.setAttribute("data-backgroundId", "ss60");
  }
}

function getBackgroundAutumnWinter(description) {
  switch (description) {
    case "Clear":
      randomIndex = indexGenerator(backgroundsAutumnWinterSun.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterSun);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Drizzle":
    case "Rain":
    case "Mist":
      randomIndex = indexGenerator(backgroundsAutumnWinterRain.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterRain);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Clouds":
    case "Atmosphere":
      randomIndex = indexGenerator(backgroundsAutumnWinterClouds.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterClouds);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Snow":
      randomIndex = indexGenerator(backgroundsAutumnWinterSnow.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterSnow);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    case "Thunderstorm":
      randomIndex = indexGenerator(backgroundsAutumnWinterThunderstorm.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterThunderstorm);
      randomBackground = randomBackgroundArray[randomIndex].file;
      backgroundId = randomBackgroundArray[randomIndex].id;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainer.setAttribute("data-backgroundId", `${backgroundId}`);
      break;
    default:
      backgroundContainer =
        "url(/assets/backgrounds/autumn-winter/sun/2e22f614e218b2d8e9b6ad04a74db87f.jpg)";
      backgroundContainerBig.style.backgroundImage =
        "url(/assets/backgrounds/autumn-winter/sun/2e22f614e218b2d8e9b6ad04a74db87f.jpg)";
      backgroundContainer.setAttribute("data-backgroundId", "ah92");
  }
}

/******LIKED BACKGROUND HEART***** */
const heartBtn = document.querySelector(".heart-button");
const heartIcon = document.getElementById("heartIcon");
const favoritesBackgroundsAll = document.querySelectorAll(
  ".favoriteBackgroundCard"
);
const favoritesBackgroundsArray = Array.from(favoritesBackgroundsAll);

function isBgLiked() {
  const dataBgId = backgroundContainer.getAttribute("data-backgroundId");
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

heartBtn.addEventListener("click", () => {
  if (heartIcon.getAttribute("src") == "assets/icons/hearts.png") {
    heartIcon.setAttribute("src", "assets/icons/empty-heart.svg");
    const dataBgId = backgroundContainer.getAttribute("data-backgroundId");
    const cardToFind = favoritesBackgroundsArray.find(
      (card) => card.id === `${dataBgId}`
    );
    cardToFind.classList.add("display-none");

    //remove card with the same data id than backgroundContainer
  } else {
    /*const filledFavoritesBackgroundCards = favoritesBackgroundsArray.filter(
      (card) => {
        return !!card.id;
      }
    );
    const dataBgId = backgroundContainer.getAttribute("data-backgroundId");
    const hasAlreadyLoadedTheCurrentBackground =
      filledFavoritesBackgroundCards.some((card) => card.id === dataBgId);
    if (!hasAlreadyLoadedTheCurrentBackground) {*/
    heartIcon.setAttribute("src", "assets/icons/hearts.png");
    placeInCollectionBackground();
  }
});

/******COLLECTION BACKGROUND ***** */
const visibilityButton = document.querySelectorAll(".visibilityButton");

const garbageButton = document.querySelectorAll(".garbageButton");

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

function createNewCardIfNecessary(arrayOfEmptyCard, section) {
  if (arrayOfEmptyCard.length === 0) {
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
    newCard.setAttribute("data-backgroundId", `${backgroundId}`);
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
    newBackgroundContainer.id = randomBackgroundArray[randomIndex].id;
    const newVisibilityButton = document.createElement("button");
    newCardFooter.append(newVisibilityButton);
    newVisibilityButton.classList.add("visibilityButton", "btn", "w-25");
    newVisibilityButton.setAttribute("type", "button");
    const newVisibilityIcon = document.createElement("img");
    newVisibilityButton.append(newVisibilityIcon);
    newVisibilityIcon.setAttribute("src", "assets/icons/visibility-blue.svg");
    newVisibilityIcon.setAttribute(
      "alt",
      "icon to select and enlarge this city"
    );
    arrayOfEmptyCard.push(newCard);
    newVisibilityButton.addEventListener("click", () => {
      const bgToDisplay = newVisibilityButton.getAttribute("data-src");
      backgroundContainer.style.backgroundImage = `url(${bgToDisplay})`;
      backgroundContainerBig.style.backgroundImage = `url(${bgToDisplay})`;
    });
    newGarbageButton.addEventListener("click", () => {
      const idToFind = newGarbageButton.id;
      console.log({ idToFind });
      console.log({ favoritesBackgroundsArray });
      const cardToFind = favoritesBackgroundsArray.find(
        (card) => card.id === `${idToFind}`
      );
      cardToFind.classList.add("display-none");
    });
  }
}

function placeInCollectionBackground() {
  const miniBackgroundCard = {
    id: randomBackgroundArray[randomIndex].id,
    file: randomBackgroundArray[randomIndex].file,
    season: randomBackgroundArray[randomIndex].season,
    putAwayInSubCollection: function () {
      if (miniBackgroundCard.season === "autumnWinter") {
        const emptyBackgroundsAutumnWinterCards = getEmptyCards(
          backgroundsAutumnWinterCardsArray
        );
        createNewCardIfNecessary(
          emptyBackgroundsAutumnWinterCards,
          autumnWinterSection
        );
        emptyBackgroundsAutumnWinterCards[0].id = miniBackgroundCard.id;
        const cardToFill = document.getElementById(`${miniBackgroundCard.id}`);
        cardToFill.querySelector(
          ".container-img-background"
        ).style.backgroundImage = `url(${miniBackgroundCard.file})`;
        cardToFill.setAttribute(
          "data-backgroundId",
          `${miniBackgroundCard.id}`
        );
      } else {
        const emptyBackgroundsSpringSummerCards = getEmptyCards(
          backgroundsSpringSummerCardsArray
        );
        createNewCardIfNecessary(
          emptyBackgroundsSpringSummerCards,
          springSummerSection
        );
        console.log({ emptyBackgroundsSpringSummerCards });
        emptyBackgroundsSpringSummerCards[0].id = miniBackgroundCard.id;
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
        ).id = `${miniBackgroundCard.id}`;
        console.log({ cardToFill });
      }
    },
  };
  console.log({ miniBackgroundCard });
  miniBackgroundCard.putAwayInSubCollection();
  favoritesBackgroundsArray.push(miniBackgroundCard);
}

visibilityButton.forEach(function (button) {
  button.addEventListener("click", () => {
    const bgToDisplay = button.getAttribute("data-src");
    backgroundContainer.style.backgroundImage = `url(${bgToDisplay})`;
    backgroundContainerBig.style.backgroundImage = `url(${bgToDisplay})`;
  });
});

garbageButton.forEach(function (button) {
  button.addEventListener("click", () => {
    const idToFind = button.id;
    console.log({ idToFind });
    console.log({ favoritesBackgroundsArray });
    const cardToFind = favoritesBackgroundsArray.find(
      (card) => card.id === `${idToFind}`
    );
    cardToFind.classList.add("display-none");
  });
});

/******DROPDOWN MENU*******/
const menuBtn = document.querySelector("#menuBtn");
const unrolledMenuContainer = document.querySelector(".unrolledMenuContainer");
const menuIcon = document.getElementById("menuIcon");

menuBtn.addEventListener("click", () => {
  unrolledMenuContainer.classList.toggle("hidden");
  switchIcon(menuIcon);
});

/*******NAVBAR EXTENSION***** */
const expandBtn = document.querySelector(".expandBtn");
const extensionNav = document.querySelector(".navExtension");
const expandIcon = document.getElementById("expandIcon");

expandBtn.addEventListener("click", () => {
  extensionNav.classList.toggle("display-none");
  switchIcon(expandIcon);
});

/*******RECOVER A NEW TOWN WITH API */
let townSearched;
let idTownSearched;
let tempSearched;
let iconWeatherSearched;
let descriptionSearched;
let datas;

async function recoverTown(town) {
  const urlforSearching =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    town +
    "&appid=075e3c803b57e9d25a7e50c00e33a2ff&units=metric";
  const request = await fetch(urlforSearching, {
    method: "GET",
  });
  if (!request.ok) {
    alert("Un probleme est survenu");
  } else {
    datas = await request.json();
    console.log({ datas });
    idTownSearched = datas.id;
    console.log({ idTownSearched });
    tempSearched = datas.main.temp;
    console.log({ tempSearched });
    descriptionSearched = datas.weather[0].main;
    console.log({ descriptionSearched });
    iconWeatherSearched = datas.weather[0].icon;
    console.log({ iconWeatherSearched });
  }
}

/****PRESELECTED CITIES */

const buttonsCityNav = document.querySelectorAll(".citiesBtn");
const buttonsCityNavArray = Array.from(buttonsCityNav);

buttonsCityNavArray[0].textContent = "Tokyo";
buttonsCityNavArray[1].textContent = "Paris";
buttonsCityNavArray[2].textContent = "Montreal";
buttonsCityNavArray[3].textContent = "Singapour";

for await (const button of buttonsCityNavArray.slice(0, 4)) {
  console.log(button.textContent);
  generateCityObject(button.textContent);
}

console.log({ buttonsCityNavArray });

/****ADDING A NEW CITY */

// console.log({ emptyButtons });
const inputAddCity = document.getElementById("addCity");
const addCityBtn = document.querySelector(".addCityBtn");

addCityBtn.addEventListener("click", () => {
  generateCityObject(inputAddCity.value);
});

/******CITIES COLLECTION GESTION */
const favoritesCitiesCardsAll = document.querySelectorAll(".favoriteCityCard");
let favoriteCityCardArray = Array.from(favoritesCitiesCardsAll);

async function generateCityObject(value) {
  const newCity = value;
  await recoverTown(newCity);
  const miniCityCard = {
    id: idTownSearched,
    cityName: newCity,
    temperature: tempSearched,
    icon: iconWeatherSearched,
    descriptionWeather: descriptionSearched,
    generateCityButton: function () {
      const filledButtons = buttonsCityNavArray.filter((btn) => {
        // double negation veut dire "n'est pas , n'est pas" et revient donc a dire ici "a un text.content"
        return !!btn.textContent;
      });
      const hasAlreadyLoadedTheCurrentCity = filledButtons.some(
        (btn) => btn.textContent === newCity
      );
      if (!hasAlreadyLoadedTheCurrentCity) {
        const emptyButtons = getEmptyButtons(buttonsCityNavArray);
        emptyButtons[0].textContent = newCity;
        emptyButtons[0].disabled = false;
        emptyButtons[0].classList.remove("btn-primary", "opacity-75");
        emptyButtons[0].classList.add("border-secondary");
      } else {
        const emptyButtons = getEmptyButtons(buttonsCityNavArray);
        emptyButtons[0].disabled = true;
      }
    },
    fillMiniCityCard: function () {
      const filledCards = favoriteCityCardArray.filter((card) => {
        return !!card.id;
      });
      const hasAlreadyLoadedTheCurrentCardCity = filledCards.some(
        (btn) => btn.id === idTownSearched
      );
      if (!hasAlreadyLoadedTheCurrentCardCity) {
        const emptyCards = getEmptyCards(favoriteCityCardArray);
        emptyCards[0].id = idTownSearched;
        const cardToFill = document.getElementById(`${idTownSearched}`);
        cardToFill.querySelector(
          ".miniCardTown"
        ).textContent = `${miniCityCard.cityName}`;
        cardToFill.querySelector(
          ".miniCardTemp"
        ).textContent = `${miniCityCard.temperature} °C`;
        cardToFill.querySelector(
          ".miniCardIconWeather"
        ).src = `https://openweathermap.org/img/wn/${miniCityCard.icon}@2x.png`;
        cardToFill.querySelector(
          ".miniCardDescription"
        ).textContent = `${miniCityCard.descriptionWeather}`;
      }
    },
  };
  miniCityCard.generateCityButton();
  miniCityCard.fillMiniCityCard();
  console.log({ miniCityCard });
}

/******SEARCHING A TOWN */
const inputCityUser = document.querySelectorAll(".inputCityUser");
let inputCityUserValue;
const searchBtn = document.querySelectorAll(".searchBtn");
searchBtn.forEach(function (eachSearchBtn) {
  eachSearchBtn.addEventListener("click", async () => {
    console.log(searchBtn);
    inputCityUserValue = inputCityUser[eachSearchBtn.id].value;

    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      town +
      "&appid=075e3c803b57e9d25a7e50c00e33a2ff&units=metric";
    await recoverTown(inputCityUserValue);
    fillCityCard(inputCityUserValue);
  });
});

/*******CITY CARD ENLARGED AND REDUCED******/
buttonsCityNav.forEach(function (cityBtn) {
  cityBtn.addEventListener("click", async () => {
    townSearched = cityBtn.textContent;
    await recoverTown(townSearched);
    setSeasonBackground(descriptionSearched);
    isBgLiked();
    fillCityCard(
      townSearched,
      tempSearched,
      iconWeatherSearched,
      descriptionSearched
    );
  });
});

/******CITY CARD CONTENT***** */
function fillCityCard(town, temp, iconWeather, description) {
  document.querySelectorAll(".cityCardTitle").forEach(function (townText) {
    townText.textContent = `${town}`;
  });
  document.querySelectorAll(".temperature").forEach(function (tempText) {
    tempText.textContent = `${temp} °C`;
  });
  document.querySelector(".iconWeather").textContent = `${iconWeather}`;
  document.querySelector(".descriptionText").textContent = `${description}`;
  let currentDate = new Date();
  document.querySelector(".currentDate").textContent =
    `${currentDate.getFullYear()}` +
    `/${currentDate.getMonth()}` +
    `/${currentDate.getDate()}`;
  document.querySelector(".currentTime").textContent +
    `${currentDate.getHours()}` +
    ` ${currentDate.getMinutes()}`;
}

(async function runApplication() {
  await geolocaliseMe();

  /*generateCitiesPreselectedObjects();*/
})(); //immediatly invoked function IIF*/
