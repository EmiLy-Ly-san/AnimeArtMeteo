import {
  idTownSearched,
  tempSearched,
  iconWeatherSearched,
  descriptionSearched,
  recoverTown,
} from "./recoverTown.js";
import {
  resetBigCityCard,
  fillCityCard,
  fillReducedCityCard,
} from "./cityCards.js";
import { setSeasonBackground } from "./backgroundRandom.js";
import { isBgLiked } from "./backgroundsUserCollection.js";

/*DOUBLON AVEC CELUI D'AU DESSUS ??*/

export let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
export let buttonsCityNavArray = Array.from(getButtonsCityNav());

export function attachListenersToBtnCityNavButtons() {
  const buttonsCityNav = getButtonsCityNav();
  buttonsCityNav.forEach(function (cityBtn) {
    cityBtn.addEventListener("click", async () => {
      console.log(
        "Je commence ! buttonsCityNavArray",
        buttonsCityNavArray.map((btn) => btn.textContent)
      );
      resetBigCityCard();
      let townButton = cityBtn.textContent;
      console.log({ townButton });
      await recoverTown(townButton);
      setSeasonBackground(descriptionSearched);
      isBgLiked();
      fillCityCard(
        townButton,
        idTownSearched,
        tempSearched,
        iconWeatherSearched,
        descriptionSearched
      );
      fillReducedCityCard(townButton, tempSearched, iconWeatherSearched);
    });
  });
}
