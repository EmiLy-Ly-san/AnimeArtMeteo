import {
  geolocaliseMe,
  geolocaliseMeBtn,
  townGeo,
  idGeo,
  tempGeo,
  iconWeatherGeo,
  descriptionGeo,
} from "./geolocalisation";
import {
  heartBtn,
  heartIcon,
  favoritesBackgroundsArray,
  placeInCollectionBackground,
} from "./backgroundsCollection";
import { fillCityCard } from "./cityCard.js";
import { backgroundContainer } from "./backgroundRandom.js";
import { matchWithIdCardToRemove } from "./utilities.js";

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

heartBtn.addEventListener("click", () => {
  if (heartIcon.getAttribute("src") == "assets/icons/hearts.png") {
    heartIcon.setAttribute("src", "assets/icons/empty-heart.svg");
    matchWithIdCardToRemove(backgroundContainer, favoritesBackgroundsArray);
  } else {
    heartIcon.setAttribute("src", "assets/icons/hearts.png");
    placeInCollectionBackground();
  }
});

geolocaliseMeBtn.addEventListener("click", geolocaliseMe);
