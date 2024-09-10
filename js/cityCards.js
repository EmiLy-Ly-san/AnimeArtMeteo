/******CITY CARDS VARIABLES */
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

/*********BIG CITY CARD FUNCTIONS */
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

export const fillReducedCityCard = (town, temp, iconWeather) => {
  document.querySelector(".reducedCardTitle").textContent = `${town}`;
  document.querySelectorAll(".tempReducedCard").forEach(function (tempText) {
    tempText.textContent = `${temp}°C`;
  });
  document.querySelectorAll(".iconWeatherReducedCard").forEach(function (icon) {
    icon.src = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`;
  });
};
