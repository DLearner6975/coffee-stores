const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&v=20220105&limit=${limit}`;
};

const header = {
  headers: {
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};
export const fetchCoffeeStores = async () => {
  const response = await fetch(
    getUrlForCoffeeStores(
      "29.786045418175096,-95.82309640324509",
      "coffee stores",
      6
    ),
    header
  );
  const data = await response.json();

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
