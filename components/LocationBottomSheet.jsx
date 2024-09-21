import { Text, View, Image } from "react-native";
import React from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { COLORS, FONTS } from "../constants";
import { useLocationStore, useSettingsStore } from "../store";

import MapView, { MapCallout, MapMarker } from "react-native-maps";
import { currentWeatherCall } from "../context/handlers";
import { useQuery } from "@tanstack/react-query";
import WebView from "react-native-webview";
import { getReversedLocation } from "../utils";

const LocationBottomSheet = React.forwardRef(({}, ref) => {
  const snapPoints = React.useMemo(() => ["80%"], []);
  const { location, update } = useLocationStore();
  const [state, setState] = React.useState({
    marker: {
      latitude: location?.latitude,
      longitude: location?.longitude,
    },
  });

  const updateLocation = React.useCallback(async ({ latitude, longitude }) => {
    const reversed = await getReversedLocation({ latitude, longitude });
    update({
      reversed,
      latitude,
      longitude,
    });
  }, []);

  React.useEffect(() => {
    if (location?.latitude) {
      setState((s) => ({
        ...s,
        marker: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      }));
    }
  }, [location]);

  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: COLORS.gray,
      }}
      ref={ref}
      snapPoints={snapPoints}
      enableOverDrag={false}
      enableDynamicSizing={false}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 20,
            }}
          >
            Change Location
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
            }}
          >
            Drag and drop a marker or tap to select location.
          </Text>
        </View>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={true}
          pitchEnabled={true}
          followsUserLocation={true}
          showsIndoorLevelPicker={true}
          loadingEnabled={true}
          onPress={async ({
            nativeEvent: {
              coordinate: { latitude, longitude },
            },
          }) => {
            await updateLocation({ latitude, longitude });
            setState((s) => ({
              ...s,
              marker: {
                latitude,
                longitude,
              },
            }));
          }}
        >
          <CustomMarker setState={setState} state={state} />
        </MapView>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default LocationBottomSheet;

const CustomMarker = ({ setState, state }) => {
  const { settings } = useSettingsStore();
  const { data: weather } = useQuery({
    queryKey: [
      "marker-weather",
      state.marker.latitude,
      state.marker.longitude,
      settings?.units,
    ],
    queryFn: ({ queryKey }) => currentWeatherCall(queryKey),
  });
  const { update } = useLocationStore();

  const updateLocation = React.useCallback(async ({ latitude, longitude }) => {
    const reversed = await getReversedLocation({ latitude, longitude });
    update({
      reversed,
      latitude,
      longitude,
    });
  }, []);
  return (
    <MapMarker
      key={`${state.marker.latitude}-${state.marker.longitude}`}
      onDragEnd={async ({
        nativeEvent: {
          coordinate: { latitude, longitude },
        },
      }) => {
        await updateLocation({ latitude, longitude });
        setState((s) => ({
          ...s,
          marker: {
            latitude,
            longitude,
          },
        }));
      }}
      draggable={true}
      coordinate={{
        latitude: state.marker.latitude,
        longitude: state.marker.longitude,
      }}
    >
      {weather ? (
        <MapCallout
          tooltip={true}
          style={{ backgroundColor: COLORS.white, borderRadius: 5 }}
        >
          <View style={{ padding: 10 }}>
            <WebView
              style={{
                height: 50,
                width: 50,
                alignSelf: "center",
                marginBottom: 10,
              }}
              source={{
                uri: `https://openweathermap.org/img/w/${weather.weather[0]?.icon}.png`,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONTS.regular,
                }}
              >
                L {weather.main.temp_min.toFixed(0)}°C
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FONTS.bold,
                }}
              >
                {weather.main.temp.toFixed(0)}°C
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FONTS.regular,
                }}
              >
                H {weather.main.temp_max.toFixed(0)}°C
              </Text>
            </View>
          </View>
        </MapCallout>
      ) : null}
    </MapMarker>
  );
};
