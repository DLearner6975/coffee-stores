//THIS IS THE WIRING UP FOR THE FOURSQUARE API
const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

export const fetchCoffeeStores = async () => {
  const response = await fetch(
    getUrlForCoffeeStores(
      "29.73366154037294,-95.84686519950377",
      "coffee shop",
      6
    ),
    options
  );
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
