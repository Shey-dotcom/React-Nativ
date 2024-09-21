import * as Location from "expo-location";

export const getReversedLocation = async ({ latitude, longitude }) => {
  const [loc] = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
  return loc;
};
