import { backgroundsData } from "./backgrounds.js";

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

function getBackgroundSpringSummer(description) {
  switch (description) {
    case "Clear":
      randomIndex = indexGenerator(backgroundsSpringSummerSun.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerSun);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Drizzle":
    case "Rain":
      randomIndex = indexGenerator(backgroundsSpringSummerRain.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerRain);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Clouds":

    case "Atmosphere":
      randomIndex = indexGenerator(backgroundsSpringSummerClouds.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerClouds);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Thunderstorm":
      randomIndex = indexGenerator(backgroundsSpringSummerThunderstorm.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsSpringSummerClouds);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    default:
      backgroundContainer =
        "url(assets/backgrounds/summer-spring/sun/1e4fe3db756c83c5c3f7ed904e002436.jpg)";
      backgroundContainerBig.style.backgroundImage =
        "url(assets/backgrounds/summer-spring/sun/1e4fe3db756c83c5c3f7ed904e002436.jpg)";
  }
}

function getBackgroundAutumnWinter(description) {
  switch (description) {
    case "Clear":
      let randomIndex = indexGenerator(backgroundsAutumnWinterSun.length);
      console.log({ randomIndex });
      let randomBackgroundArray = Array.from(backgroundsAutumnWinterSun);
      let randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Drizzle":
    case "Rain":
    case "Mist":
      randomIndex = indexGenerator(backgroundsAutumnWinterRain.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterRain);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Clouds":
    case "Atmosphere":
      randomIndex = indexGenerator(backgroundsAutumnWinterClouds.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterClouds);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Snow":
      randomIndex = indexGenerator(backgroundsAutumnWinterSnow.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterSnow);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    case "Snow":
      randomIndex = indexGenerator(backgroundsAutumnWinterThunderstorm.length);
      console.log({ randomIndex });
      randomBackgroundArray = Array.from(backgroundsAutumnWinterThunderstorm);
      randomBackground = randomBackgroundArray[randomIndex].file;
      console.log({ randomBackground });
      backgroundContainer.style.backgroundImage = `url(${randomBackground})`;
      backgroundContainerBig.style.backgroundImage = `url(${randomBackground})`;
      break;
    default:
      backgroundContainer =
        "url(/assets/backgrounds/autumn-winter/sun/2e22f614e218b2d8e9b6ad04a74db87f.jpg)";
      backgroundContainerBig.style.backgroundImage =
        "url(/assets/backgrounds/autumn-winter/sun/2e22f614e218b2d8e9b6ad04a74db87f.jpg)";
  }
}

/*******GENRALS FUNCTIONS */
function switchIcon(icon) {
  const currentSrc = icon.getAttribute("src");
  const nextSrc = icon.getAttribute("data-icon");
  icon.setAttribute("src", nextSrc);
  icon.setAttribute("data-icon", currentSrc);
}

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
let cityPreselected;
const buttonsCityNav = document.querySelectorAll(".citiesBtn");
const buttonsCityNavArray = Array.from(buttonsCityNav);
buttonsCityNavArray[0].textContent = "Tokyo";
buttonsCityNavArray[1].textContent = "Paris";
buttonsCityNavArray[2].textContent = "Montreal";
buttonsCityNavArray[3].textContent = "New-York";

function generatePreselectedCityObject(); {
  buttonsCityNavArray.forEach(function (button) {
    cityPreselected = `${button.textContent}`;
    generateCityObject(cityPreselected);
  });
}

console.log({ buttonsCityNavArray });

/****ADDING A NEW CITY */
let emptyButtons = buttonsCityNavArray.filter(function (button) {
  return button.textContent === "";
});
console.log({ emptyButtons });
const inputAddCity = document.getElementById("addCity");
const addCityBtn = document.querySelector(".addCityBtn");
let newCity;
let miniCityCard = {};

addCityBtn.addEventListener("click", () => {
  generateCityObject(inputAddCity.value);
});

/******CITIES COLLECTION GESTION */
const favoritesCitiesCardsAll = document.querySelectorAll(".favoriteCityCard");
let favoriteCityCardArray = Array.from(favoritesCitiesCardsAll);
let emptyCards = favoriteCityCardArray.filter(function (card) {
  return card.id === "";
});

async function generateCityObject(value) {
  newCity = value;
  await recoverTown(newCity);
  miniCityCard = {
    id: idTownSearched,
    cityName: newCity,
    temperature: tempSearched,
    icon: iconWeatherSearched,
    descriptionWeather: descriptionSearched,
    generateCityButton: function () {
      emptyButtons[0].textContent = newCity;
      emptyButtons[0].classList.remove("btn-primary", "opacity-75");
      emptyButtons[0].classList.add("border-secondary");
      emptyButtons = buttonsCityNavArray.filter(function (button) {
        return button.textContent === "";
      });
    },
    fillMiniCityCard: function () {
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
      ).textContent = `${miniCityCard.icon}`;
      cardToFill.querySelector(
        ".miniCardDescription"
      ).textContent = `${miniCityCard.descriptionWeather}`;
      emptyCards = favoriteCityCardArray.filter(function (card) {
        return card.id === "";
      });
    },
  };
  miniCityCard.generateCityButton();
  miniCityCard.fillMiniCityCard();
  console.log(miniCityCard.cityName);
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

/******LIKED BACKGROUND HEART***** */
const heartBtn = document.querySelector(".heart-button");
const heartIcon = document.getElementById("heartIcon");

heartBtn.addEventListener("click", () => {
  switchIcon(heartIcon);
  if (heartIcon.getAttribute("src") == "assets/icons/hearts.png") {
    heartIcon.setAttribute(
      "title",
      "Unlike and remove this background from my collection"
    );
    /****Add the background in the background collection user */
  } else {
    heartIcon.setAttribute(
      "title",
      "Like and add in my backgrounds Collection"
    );
    /****Remove the background in the background collection User */
  }
});

/******COLLECTION BACKGROUND ***** */

/*(async function runApplication() {
  await geolocaliseMe();
})(); //immediatly invoked function IIF*/

geolocaliseMe();

