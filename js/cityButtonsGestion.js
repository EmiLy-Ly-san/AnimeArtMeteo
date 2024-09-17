import { attachListenersToBtnCityNavButtons } from "./navigation.js";
import {
  getEmptyButtonsMainNav,
  getEmptyButtonsSecondNav,
  getFilledButtonsSecondNav,
  getFilledButtonsMainNav,
} from "./utilities.js";

//REMOVE CITY BUTTON NAV
let textToFind;
let buttonToFind;

export function removeCityBtn(elementWithCityNameInTextContent) {
  textToFind = elementWithCityNameInTextContent.textContent;
  findTheButtonNavToDelete(textToFind);
  placeNewEmptyButton();
}

function findTheButtonNavToDelete(textToFind) {
  newButtonsCityNavArray = Array.from(newGetButtonsCityNav());
  buttonToFind = newButtonsCityNavArray.find(
    (btn) => btn.textContent === `${textToFind}`
  );
  console.log({ buttonToFind: buttonToFind });
}

function placeNewEmptyButton() {
  createNewEmptyButton();
  placeInTheGoodNav();
}

let newButtonLi;
let newEmptyButton;
export function createNewEmptyButton() {
  newButtonLi = document.createElement("li");
  newButtonLi.classList.add("nav-item", "citiesNavigation");
  newEmptyButton = document.createElement("button");
  newEmptyButton.classList.add(
    "citiesBtn",
    "btn",
    "btn-primary",
    "opacity-75",
    "rounded-pill",
    "text-secondary",
    "fw-bold"
  );
  newButtonLi.append(newEmptyButton);
  newEmptyButton.textContent = "";
  newEmptyButton.dataset.id = "";
  newEmptyButton.disabled = true;
  newEmptyButton.setAttribute("data-bs-toggle", "modal");
  newEmptyButton.setAttribute("data-bs-target", "#cityCardModal");
}

const mainNav = document.querySelector(".mainNav");
const secondNav = document.querySelector(".secondNav");
function placeInTheGoodNav() {
  if (mainNav.contains(buttonToFind) === true) {
    mainNav.append(newButtonLi);
    newButtonLi.append(newEmptyButton);
    newEmptyButton.classList.add("citiesBtnMainNav");
    newButtonsCityNavArray.push(newEmptyButton);
    attachListenersToBtnCityNavButtons();
    const buttonToFindLi = buttonToFind.closest("li");
    buttonToFindLi.remove();
    buttonToFind.remove();
    newButtonsCityNavArray = newButtonsCityNavArray.filter(
      (btn) => btn !== buttonToFind
    );
  } else {
    secondNav.append(newButtonLi);
    newButtonLi.append(newEmptyButton);
    newEmptyButton.classList.add("citiesBtnSecondNav");
    newButtonsCityNavArray.push(newEmptyButton);
    attachListenersToBtnCityNavButtons();
    const buttonToFindLi = buttonToFind.closest("li");
    buttonToFindLi.remove();
    buttonToFind.remove();
    newButtonsCityNavArray = newButtonsCityNavArray.filter(
      (btn) => btn !== buttonToFind
    );
  }
}

//REORGANIZE NAV
let newGetButtonsCityNav = () => document.querySelectorAll(".citiesBtn");
let newButtonsCityNavArray = Array.from(newGetButtonsCityNav());
let emptyButtonsMainNav = getEmptyButtonsMainNav(newButtonsCityNavArray);
let emptyButtonsSecondNav = getEmptyButtonsSecondNav(newButtonsCityNavArray);
let filledButtonsSecondNav = getFilledButtonsSecondNav(newButtonsCityNavArray);
let filledButtonsMainNav = getFilledButtonsMainNav(newButtonsCityNavArray);
let buttonToUpgrade;

export function reorganizeNavifNecessary() {
  findIfBtnToUpgradeIsInSecondNav();
  console.log({ buttonToUpgrade: buttonToUpgrade });
  if (buttonToUpgrade && buttonToUpgrade === filledButtonsSecondNav[0]) {
    switchFirstEmptyBtnMainNavWithBtnToUpgradeSecondNav();
    createNewEmptyButtonInSecondNav();
  }
}

function findIfBtnToUpgradeIsInSecondNav() {
  emptyButtonsMainNav = getEmptyButtonsMainNav(newButtonsCityNavArray);
  console.log({ emptyButtonsMainNav });
  emptyButtonsSecondNav = getEmptyButtonsSecondNav(newButtonsCityNavArray);
  filledButtonsSecondNav = getFilledButtonsSecondNav(newButtonsCityNavArray);
  filledButtonsMainNav = getFilledButtonsMainNav(newButtonsCityNavArray);
  if (emptyButtonsMainNav && emptyButtonsMainNav.length > 0) {
    buttonToUpgrade = filledButtonsSecondNav[0];
  }
}

function switchFirstEmptyBtnMainNavWithBtnToUpgradeSecondNav() {
  if (buttonToUpgrade) {
    emptyButtonsMainNav[emptyButtonsMainNav.length - 1].textContent =
      buttonToUpgrade.textContent;
    buttonToUpgrade.textContent = "";
    buttonToUpgrade.classList.add(
      "citiesBtn",
      "citiesBtnMainNav",
      "btn",
      "btn-primary",
      "opacity-75",
      "rounded-pill",
      "text-secondary",
      "fw-bold"
    );
    buttonToUpgrade.classList.remove("border-secondary");
    buttonToUpgrade.remove();
    attachListenersToBtnCityNavButtons();
  }
  emptyButtonsMainNav[emptyButtonsMainNav.length - 1].dataset.id = "";
  emptyButtonsMainNav[emptyButtonsMainNav.length - 1].disabled = true;
  emptyButtonsMainNav[0].disabled = false;
  emptyButtonsMainNav[0].classList.remove(
    "btn-primary",
    "opacity-75",
    "border-secondary"
  );
  emptyButtonsMainNav[0].classList.add("border-secondary");
}

export function createNewEmptyButtonInSecondNav() {
  const newEmptyButtonSecondNav = document.createElement("button");
  newEmptyButtonSecondNav.classList.add(
    "citiesBtn",
    "btn",
    "btn-primary",
    "opacity-75",
    "rounded-pill",
    "text-secondary",
    "fw-bold"
  );
  newEmptyButtonSecondNav.textContent = "";
  newEmptyButtonSecondNav.dataset.id = "";
  newEmptyButtonSecondNav.disabled = true;
  newEmptyButtonSecondNav.setAttribute("data-bs-toggle", "modal");
  newEmptyButtonSecondNav.setAttribute("data-bs-target", "#cityCardModal");
  secondNav.append(newEmptyButtonSecondNav);
  attachListenersToBtnCityNavButtons();
}
