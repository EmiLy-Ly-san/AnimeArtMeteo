/******DROPDOWN MENU*******/
let menuBtn = document.querySelector("#menuBtn");
let unrolledMenuContainer = document.querySelector(".unrolledMenuContainer");

function unrollMenu() {
  unrolledMenuContainer.classList.toggle("visible");
}

menuBtn.addEventListener("click", unrollMenu);
