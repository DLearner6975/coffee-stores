//THIS IS FOR THE STATIC JSON IN CODE
import CoffeeStoresStatic from "../data/coffee-stores.json";

export const fetchCoffeeStoresStatic = async () => {
  const response = await fetch(CoffeeStoresStatic);
  const data = await response.json();
  // console.log("data", data);

  const transformedData =
    data?.results?.map((venue) => {
      return {
        id: venue.fsq_id,
        ...venue,
      };
    }) || [];

  console.log("tansform data", transformedData);

  return data.results;
};
