import React from "react";
import * as Location from "expo-location";
import { useLocationPermission } from "./useLocationPermission";

export const useCurrentLocation = () => {
  const [location, setLocation] = React.useState(null);
  const { granted } = useLocationPermission();
  console.log({ granted });
  React.useEffect(() => {
    if (granted) {
      Location.getCurrentPositionAsync().then(
        async ({ coords: { latitude, longitude } }) => {
          const [loc] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          setLocation({
            latitude,
            longitude,
            reversed: loc,
          });
        }
      );
    }
  }, [granted]);

  return { location };
};
