export const getVariablesInLocalStorage = (property) => {
  const localStorageData = localStorage.getItem("citiesStored");
  if (typeof localStorageData === "string") {
    const parsedData = JSON.parse(localStorageData);
    const myValue = parsedData?.[property];
    return myValue;
  }
  return null;
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
