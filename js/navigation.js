import {
  townSearched,
  idTownSearched,
  tempSearched,
  iconWeatherSearched,
  descriptionSearched,
  recoverTown,
} from "./recoverTown";
import {
  resetBigCityCard,
  fillCityCard,
  fillReducedCityCard,
} from "./cityCards";
import { setSeasonBackground } from "./backgroundRandom";
import { isBgLiked } from "./backgroundsUserCollection";

const mainNav = document.querySelector(".mainNav");
const secondNav = document.querySelector(".secondNav");
/*DOUBLON AVEC CELUI D'AU DESSUS ??*/

let getButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
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
