/***GENERALS FUNCTIONS */
export function switchIcon(icon) {
  const currentSrc = icon.getAttribute("src");
  const nextSrc = icon.getAttribute("data-icon");
  icon.setAttribute("src", nextSrc);
  icon.setAttribute("data-icon", currentSrc);
}

export function getEmptyButtons(buttonsArray) {
  return buttonsArray.filter(function (button) {
    return button.textContent === "";
  });
}

export function getEmptyButtonsMainNav(buttonsArray) {
  return buttonsArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnMainNav");
    })
    .filter(function (btn) {
      return btn.textContent == "";
    });
}

export function getEmptyButtonsSecondNav(buttonsArray) {
  return buttonsArray.filter(function (btn) {
    return btn.classList.contains("citiesBtnSecondNav");
  });
}

export function getFilledButtonsMainNav(buttonsArray) {
  return buttonsArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnMainNav");
    })
    .filter(function (btn) {
      return btn.textContent != "";
    });
}

export function getFilledButtonsSecondNav(buttonsArray) {
  return buttonsArray
    .filter(function (btn) {
      return btn.classList.contains("citiesBtnSecondNav");
    })
    .filter(function (btn) {
      return btn.textContent != "";
    });
}

export function getEmptyCards(cardsArray) {
  return cardsArray.filter(function (card) {
    return card.id === "";
  });
}

export let hasAlreadyLoadedTheCurrentCity;
export function isTownLoaded(array, city) {
  const filledElements = array.filter((element) => {
    // double negation veut dire "n'est pas , n'est pas" et revient donc a dire ici "a un text.content"
    return !!element.textContent;
  });
  hasAlreadyLoadedTheCurrentCity = filledElements.some(
    (btn) => btn.textContent === city
  );
}

export function matchWithIdCardToRemove(element, array) {
  const idToFind = element.dataset.id;
  const cardToFind = array.find((card) => card.id === `${idToFind}`);
  console.log({ cardToFind });
  cardToFind.remove();
  const index = array.indexOf(cardToFind);
  console.log({ index });
  array.splice(index, 1);
  isBgLiked();
}

export function matchWithSrcCardToDisplay(button) {
  const bgToDisplay = button.getAttribute("data-src");
  backgroundContainer.style.backgroundImage = `url(${bgToDisplay})`;
  backgroundContainerBig.style.backgroundImage = `url(${bgToDisplay})`;
}
