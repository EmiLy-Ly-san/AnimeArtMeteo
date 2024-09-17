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
  property,
  value,
  object
) => {
  const localStorageData = localStorage.getItem("citiesStored");
  if (typeof localStorageData === "string") {
    const parsedData = JSON.parse(localStorageData);
    parsedData[property] = value;
    localStorage.setItem("citiesStored", JSON.stringify(parsedData));
  } else {
    localStorage.setItem(
      "citiesStored",
      JSON.stringify({
        ...object,
        [property]: value,
      })
    );
  }

  return null;
};
