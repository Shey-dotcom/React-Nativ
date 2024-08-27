import React from "react";
import * as Location from "expo-location";
export const useLocationPermission = () => {
  const [granted, setGranted] = React.useState(false);
  React.useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ granted }) => {
      if (granted) {
        setGranted(granted);
      } else {
        Location.requestForegroundPermissionsAsync().then(({ granted }) => {
          setGranted(granted);
        });
      }
    });
  }, []);

  return { granted };
};
