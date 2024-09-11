import { backgroundsData } from "./backgrounds.js";

/********BACKGROUND HTML CONTAINERS */
export let backgroundContainer = document.querySelector(
  ".background-container"
);
export let backgroundContainerBig = document.querySelector(
  ".background-container-big"
);

/*********GENERATE RANDOM BACKGROUND DEPENDING ON THE SEASON*/
/****1.set the season */
export let backgroundSeason;
export const setSeasonBackground = (description) => {
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
};

/***2.get the background depending on the season and the description API */
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

let backgroundLink = document.querySelector(".backgroundLink");

const getBackgroundSpringSummer = (description) => {
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
};

const getBackgroundAutumnWinter = (description) => {
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
};

/***3.set background property */
let randomIndex;
let randomBackgroundArray;
export let randomBackground;
const indexGenerator = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
export let backgroundId;

const setBackgroundProperties = (seasonBackgroundArray) => {
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
};
