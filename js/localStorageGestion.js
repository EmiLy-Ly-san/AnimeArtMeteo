export const getVariablesInLocalStorage = (
  property // string
) => {
  const localStorageData = localStorage.getItem("citiesStored");

  const parsedData = JSON.parse(localStorageData);
  const myValue = property in parsedData ? parsedData[property] : null;
  return myValue;
};

export const setElementFromVariablesinLocalStorage = (
  property, //string
  value // any value
) => {
  //property and value of the object
  const localStorageData = localStorage.getItem("citiesStored");
  // if already localstorage data for citiesStored
  if (localStorageData) {
    //If localStorage is exist
    const parsedData = JSON.parse(localStorageData); //Convert the json string in js langage by json.parse
    parsedData[property] = value;
    localStorage.setItem("citiesStored", JSON.stringify(parsedData));
  } else {
    localStorage.setItem(
      "citiesStored",
      JSON.stringify({
        [property]: value,
      })
    );
  }

  return null;
};

export const removeCityFromLocalStorage = (cityId) => {
  const currentCitiesInLocalStorage = localStorage.getItem("citiesStored");
  if (currentCitiesInLocalStorage) {
    const currentCities = JSON.parse(currentCitiesInLocalStorage);
    const cityIsInLocalStorage = currentCities?.[cityId];

    if (cityIsInLocalStorage) {
      delete currentCities[cityId];
      localStorage.setItem("citiesStored", JSON.stringify(currentCities));
    }
  }
};
