/******DROPDOWN MENU*******/
let menuBtn = document.querySelector("#menuBtn");
let unrolledMenuContainer = document.querySelector(".unrolledMenuContainer");
let menuIcon = document.getElementById("menuIcon");

function unrollMenu() {
  unrolledMenuContainer.classList.toggle("hidden");
  if (menuIcon.getAttribute("data-src-menu") == "menuClosed") {
    menuIcon.src = "assets/icons/menu-open-blue.svg";
    menuIcon.setAttribute("data-src-menu", "menuOpened");
  } else {
    menuIcon.src = "assets/icons/menu.svg";
    menuIcon.setAttribute("data-src-menu", "menuClosed");
  }
}

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

menuBtn.addEventListener("click", unrollMenu);

closeReducedCityCard();
