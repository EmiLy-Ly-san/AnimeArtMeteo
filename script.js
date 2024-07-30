/*******GEOLOCALISE ME */
let town;
let url;
const geolocaliseMeBtn = document.querySelector(".geolocaliseMeBtn");
geolocaliseMeBtn.addEventListener("click", geolocaliseMe);

function geolocaliseMe() {
  if ("geolocation" in navigator) {
    let options = {
      getHigheAccuracy: true,
    };
    //Finding the current user position with api openweather
    let watch = navigator.geolocation.watchPosition(
      (position) => {
        navigator.geolocation.clearWatch(watch);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        url =
          "https://api.openweathermap.org/data/2.5/weather?lon=" +
          position.coords.longitude +
          "&lat=" +
          position.coords.latitude +
          "&appid=075e3c803b57e9d25a7e50c00e33a2ff&units=metric";
        console.log(url);
        recoverTown();
      },
      error,
      options
    );
    function error() {
      alert("Vous avez refuse la geolocalisation.");
      town = "Paris";
    }
  } else {
    alert("La geolocalisation ne peut pas etre utilisee.");
    town = "Paris";
  }
}

async function recoverTown() {
  const request = await fetch(url, {
    method: "GET",
  });
  if (!request.ok) {
    alert("Un probleme est survenu");
  } else {
    let datas = await request.json();
    console.log(datas);
    town = datas.name;
    console.log(town);
  }
}

/*******GENRALS FUNCTIONS */
function switchIcon(icon) {
  const currentSrc = icon.getAttribute("src");
  const nextSrc = icon.getAttribute("data-icon");
  icon.setAttribute("src", nextSrc);
  icon.setAttribute("data-icon", currentSrc);
}

/****ADDING A NEW CITY */
const inputAddCity = document.getElementById("addCity");
const addCityBtn = document.querySelector(".addCityBtn");
addCityBtn.addEventListener("click", () => {
  town = inputAddCity.value;
  console.log(town);
  //GENERATE CITYNAV + MINICITYCARD
});

/******SEARCHING A TOWN */
const inputCityUser = document.querySelectorAll(".inputCityUser");
let inputCityUserValue;
const searchBtn = document.querySelectorAll(".searchBtn");
searchBtn.forEach(function (eachSearchBtn) {
  eachSearchBtn.addEventListener("click", () => {
    console.log(searchBtn);
    inputCityUserValue = inputCityUser[eachSearchBtn.id].value;
    town = inputCityUserValue;
    console.log(town);
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

/*******CITY CARD ENLARGED AND REDUCED******/

const reducedCityCard = document.getElementById("reducedCityCard");
const cityCard = document.querySelector("#cityCardModal");
const visibilityBtn = document.querySelector(".visibilityBtn");
const citiesBtn = document.querySelectorAll(".citiesBtn");

citiesBtn.forEach(function (cityBtn) {
  cityBtn.addEventListener("click", () => {
    if (reducedCityCard.getAttribute("data-stateCityCard") == "enlarged") {
      reducedCityCard.classList.add("hidden");
      reducedCityCard.setAttribute("data-stateCityCard", "reduced");
    } else {
      reducedCityCard.classList.remove("hidden");
      reducedCityCard.setAttribute("data-stateCityCard", "enlarged");
    }
  });
});

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

/********BACKGROUND DISPLAY */

geolocaliseMe();
