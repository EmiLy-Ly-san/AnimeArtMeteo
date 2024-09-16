/*******RECOVER A NEW MANUAL SEARCHING TOWN */
export let townSearched;
export let idTownSearched;
export let tempSearched;
export let iconWeatherSearched;
export let descriptionSearched;

export async function recoverTown(town) {
  const urlforSearching =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    town +
    "&appid=075e3c803b57e9d25a7e50c00e33a2ff&units=metric";
  const request = await fetch(urlforSearching, {
    method: "GET",
  });
  if (!request.ok) {
    alert(
      "Please, write your city with the correct spelling.\nWARNING! Hyphens are not accepted. For example in New-York, write New York instead."
    );
  } else {
    let datas = await request.json();
    console.log({ datas });
    townSearched = datas.name;
    console.log({ townSearched });
    idTownSearched = datas.id;
    console.log({ idTownSearched });
    tempSearched = Math.round(datas.main.temp);
    console.log({ tempSearched });
    descriptionSearched = datas.weather[0].main;
    console.log({ descriptionSearched });
    iconWeatherSearched = datas.weather[0].icon;
    console.log({ iconWeatherSearched });
  }
}
