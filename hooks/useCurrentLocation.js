import React from "react";
import * as Location from "expo-location";
import { useLocationPermission } from "./useLocationPermission";
import { getReversedLocation } from "../utils";

export const useCurrentLocation = () => {
  const [location, setLocation] = React.useState(null);
  const { granted } = useLocationPermission();
  React.useEffect(() => {
    if (granted) {
      Location.getCurrentPositionAsync().then(
        async ({ coords: { latitude, longitude } }) => {
          const loc = await getReversedLocation({ latitude, longitude });
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
