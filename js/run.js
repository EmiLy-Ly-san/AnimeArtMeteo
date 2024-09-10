import { geolocaliseMe } from "./geolocalisation";

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
