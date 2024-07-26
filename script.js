function switchIcon(icon) {
  const currentSrc = icon.getAttribute("src");
  const nextSrc = icon.getAttribute("data-icon");
  icon.setAttribute("src", nextSrc);
  icon.setAttribute("data-icon", currentSrc);
}

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

let reducedCityCard = document.getElementById("reducedCityCard");
let cityCard = document.querySelector("#cityCardModal");
let visibilityBtn = document.querySelector(".visibilityBtn");
let citiesBtn = document.querySelectorAll(".citiesBtn");

function closeReducedCityCard() {
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
}

/******LIKED BACKGROUND HEART***** */
const heartBtn = document.querySelector(".heart-button");
let heartIcon = document.getElementById("heartIcon");

function likedUnlikedBackground() {
  if (heartIcon.getAttribute("data-heart") == "unliked") {
    heartIcon.src = "assets/icons/hearts.png";
    heartIcon.setAttribute("data-heart", "liked");
    heartIcon.setAttribute(
      "title",
      "Unlike and remove this background from my collection"
    );
    /****Add the background in the background collection user */
  } else {
    heartIcon.src = "assets/icons/empty-heart.svg";
    heartIcon.setAttribute("data-heart", "unliked");
    heartIcon.setAttribute(
      "title",
      "Like and add in my backgrounds Collection"
    );
    /****Remove the background in the background collection User */
  }
}

heartBtn.addEventListener("click", likedUnlikedBackground);

closeReducedCityCard();
