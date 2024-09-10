/*********COLLECTION BACKGROUND */
/***1.Verify is current background is Liked*/
export const heartBtn = document.querySelector(".heart-button");
export const heartIcon = document.getElementById("heartIcon");

export const isBgLiked = () => {
  const dataBgId = backgroundContainer.dataset.id;
  console.log({ dataBgId });

  const bgToFind = favoritesBackgroundsArray.find(
    (bg) => bg.id === `${dataBgId}`
  );
  console.log({ favoritesBackgroundsArray });
  console.log({ bgToFind });
  if (bgToFind) {
    heartIcon.setAttribute("src", "assets/icons/hearts.png");
  } else {
    heartIcon.setAttribute("src", "assets/icons/empty-heart.svg");
  }
};

/***2.Create a new background card */

const autumnWinterSection = document.querySelector(".autumnWinterSection");
const springSummerSection = document.querySelector(".springSummerSection");
const backgroundsAutumnWinterCards =
  document.querySelectorAll(".autumnWinterCard");
let backgroundsAutumnWinterCardsArray = Array.from(
  backgroundsAutumnWinterCards
);
const backgroundsSpringSummerCards =
  document.querySelectorAll(".springSummerCard");
let backgroundsSpringSummerCardsArray = Array.from(
  backgroundsSpringSummerCards
);
const getFavoritesBackgroundsAll = () =>
  document.querySelectorAll(".favoriteBackgroundCard");
export const favoritesBackgroundsArray = Array.from(
  getFavoritesBackgroundsAll()
);
const GarbageButtonBackgroundCard = document.querySelectorAll(".garbageButton");
const VisibilityButtonBackgroundCard =
  document.querySelectorAll(".visibilityButton");

const createNewBackgroundCard = (section) => {
  const newCard = document.createElement("div");
  section.append(newCard);
  newCard.classList.add(
    "card",
    "favoriteBackgroundCard",
    "springSummerCard",
    "shadow-sm",
    "overflow-hidden",
    "bg-primary",
    "rounded-40"
  );
  newCard.setAttribute("id", `${backgroundId}`);
  favoritesBackgroundsArray.push(newCard);
  const newBackgroundContainer = document.createElement("div");
  newCard.append(newBackgroundContainer);
  newBackgroundContainer.classList.add(
    "container-img-background",
    "m-4",
    "rounded-40",
    "overflow-hidden",
    "m-4"
  );
  const newCardFooter = document.createElement("div");
  newCard.append(newCardFooter);
  newCardFooter.classList.add(
    "card-footer",
    "d-flex",
    "justify-content-center",
    "bg-primary",
    "m-4",
    "p-4"
  );
  const newGarbageButton = document.createElement("button");
  newCardFooter.append(newGarbageButton);
  newGarbageButton.classList.add("garbageButton", "btn", "w-25");
  const newGarbageIcon = document.createElement("img");
  newGarbageButton.append(newGarbageIcon);
  newGarbageIcon.setAttribute("src", "assets/icons/garbage-blue.svg");
  newGarbageIcon.setAttribute(
    "alt",
    "icon to delete this city from your favorite"
  );
  newGarbageButton.dataset.id = newCard.id;
  const newVisibilityButton = document.createElement("button");
  newCardFooter.append(newVisibilityButton);
  newVisibilityButton.classList.add("visibilityButton", "btn", "w-25");
  newVisibilityButton.setAttribute("type", "button");
  const newVisibilityIcon = document.createElement("img");
  newVisibilityButton.append(newVisibilityIcon);
  newVisibilityIcon.setAttribute("src", "assets/icons/visibility-blue.svg");
  newVisibilityIcon.setAttribute("alt", "icon to select and enlarge this city");
  newVisibilityButton.addEventListener("click", () => {
    matchWithSrcCardToDisplay(newVisibilityButton);
  });
  newGarbageButton.addEventListener("click", () => {
    matchWithIdCardToRemove(newGarbageButton, favoritesBackgroundsArray);
    isBgLiked();
  });
};

/***3.Place the background liked by the user in his collection */
export function placeInCollectionBackground() {
  const miniBackgroundCard = {
    id: backgroundId,
    file: randomBackground,
    season: backgroundSeason,
    putAwayInSubCollection: function () {
      if (miniBackgroundCard.season === "autumnWinter") {
        createNewBackgroundCard(autumnWinterSection);
      } else {
        createNewBackgroundCard(springSummerSection);
      }
      const cardToFill = document.getElementById(`${miniBackgroundCard.id}`);
      cardToFill.querySelector(
        ".container-img-background"
      ).style.backgroundImage = `url(${miniBackgroundCard.file})`;
      cardToFill.querySelector(
        ".visibilityButton"
      ).dataset.src = `${miniBackgroundCard.file}`;
      console.log({ cardToFill });
      cardToFill.querySelector(
        ".garbageButton"
      ).dataset.id = `${miniBackgroundCard.id}`;
    },
  };
  console.log({ miniBackgroundCard });
  miniBackgroundCard.putAwayInSubCollection();
}
