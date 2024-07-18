/******BOOTSRAP TOOLTIP******/
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

/******DROPDOWN MENU*******/
let menuBtn = document.querySelector("#menuBtn");
let unrolledMenuContainer = document.querySelector(".unrolledMenuContainer");

function unrollMenu() {
  unrolledMenuContainer.classList.toggle("visible");
}

menuBtn.addEventListener("click", unrollMenu);
