/******DROPDOWN MENU*******/
let menuBtn = document.querySelector("#menuBtn");
let unrolledMenuContainer = document.querySelector(".unrolledMenuContainer");

function unrollMenu() {
  unrolledMenuContainer.classList.toggle("hidden");
}

menuBtn.addEventListener("click", unrollMenu);

/*******CITY CARD ENLARGED AND REDUCED******/
let reduceBtn = document.querySelector(".reduceBtn");
let reducedCityCard = document.querySelector(".reducedCityCard");
let cityCard = document.querySelector("#cityCardModal");
let visibilityBtn = document.querySelector(".visibilityBtn");
let citiesBtn = document.querySelectorAll(".cityBtn");

function reduceEnlargeCityCard() {
  reducedCityCard.classList.toggle("hidden");
}

function closeReducedCityCard() {
  citiesBtn.forEach(function (cityBtn) {
    cityBtn.addEventListener("click", () => {
      reducedCityCard.classList.add("hidden");
    });
  });
}

reduceBtn.addEventListener("click", reduceEnlargeCityCard);

closeReducedCityCard();
