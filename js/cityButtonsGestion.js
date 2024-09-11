import {
  buttonsCityNavArray,
  attachListenersToBtnCityNavButtons,
} from "./navigation.js";
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
  replaceBtnNavToDeleteByNewEmptyButton();
}

function findTheButtonNavToDelete(textToFind) {
  buttonToFind = buttonsCityNavArray.find(
    (btn) => btn.textContent === `${textToFind}`
  );
}

function replaceBtnNavToDeleteByNewEmptyButton() {
  createNewEmptyButton();
  placeInTheGoodNav();
}

let newButtonLi;
let newEmptyButton;
function createNewEmptyButton() {
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
    buttonsCityNavArray.push(newEmptyButton);
    attachListenersToBtnCityNavButtons();
    const buttonToFindLi = buttonToFind.closest("li");
    buttonToFindLi.remove();
    buttonToFind.remove();
    buttonToFind.textContent = "";
    buttonToFind.classList.remove("citiesBtn"); //So this button won't be count in buttonsCituNavArray when this array will be called
  } else {
    secondNav.append(newButtonLi);
    newButtonLi.append(newEmptyButton);
    newEmptyButton.classList.add("citiesBtnSecondNav");
    buttonsCityNavArray.push(newEmptyButton);
    attachListenersToBtnCityNavButtons();
    const buttonToFindLi = buttonToFind.closest("li");
    buttonToFindLi.remove();
    buttonToFind.remove();
    buttonToFind.textContent = "";
    buttonToFind.classList.remove(
      "citiesBtn"
    ); /*So this button won't be count in buttonsCituNavArray when this array will be called. Instead of  
      buttonsCityNavArray = buttonsCityNavArray.filter(
      (btn) => btn !== buttonToFind
    ); Indeed that modify the global variable buttonsCityNavArray in her origin file. But her, she is imported. And when a global is imported, she began a const variable in the file where she is imported*/
  }
}

//REORGANIZE NAV
let emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);
let emptyButtonsSecondNav = getEmptyButtonsSecondNav(buttonsCityNavArray);
let filledButtonsSecondNav = getFilledButtonsSecondNav(buttonsCityNavArray);
let filledButtonsMainNav = getFilledButtonsMainNav(buttonsCityNavArray);
let buttonToUpgrade;

export function reorganizeNavifNecessary() {
  findIfBtnToUpgradeIsInSecondNav();
  if (buttonToUpgrade && buttonToUpgrade === filledButtonsSecondNav[0]) {
    switchFirstEmptyBtnMainNavWithBtnToUpgradeSecondNav();
    createNewEmptyButtonInSecondNav();
  }
}

function findIfBtnToUpgradeIsInSecondNav() {
  emptyButtonsMainNav = getEmptyButtonsMainNav(buttonsCityNavArray);
  console.log({ emptyButtonsMainNav });
  emptyButtonsSecondNav = getEmptyButtonsSecondNav(buttonsCityNavArray);
  filledButtonsSecondNav = getFilledButtonsSecondNav(buttonsCityNavArray);
  filledButtonsMainNav = getFilledButtonsMainNav(buttonsCityNavArray);
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

function createNewEmptyButtonInSecondNav() {
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
