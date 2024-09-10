import { fillCityCard, fillReducedCityCard } from "./cityCard.js";
//import setSeasonBackground(), isBgLiked(),
//import recoverTown(),
//import variables town, url, api and townInfo ?,(searched + Geo ? )

/*********GEOLOCALISATION */
let townGeo;
let idGeo;
let urlGeo;
let tempGeo;
let descriptionGeo;
let iconWeatherGeo;

export const geolocaliseMe = () => {
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
};

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

const geolocaliseMeBtn = document.querySelector(".geolocaliseMeBtn");
geolocaliseMeBtn.addEventListener("click", geolocaliseMe);
