import { Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import { useMeStore } from "../../store";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { BACKGROUNDS, COLORS, FONTS } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { currentWeatherCall } from "../../context/handlers";

const Home = ({ navigation }) => {
  const { me } = useMeStore();
  const { location } = useCurrentLocation();

  const { data: weather } = useQuery({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: ({ queryKey }) => currentWeatherCall(queryKey),
  });

  console.log(JSON.stringify(weather, null, 2));
  return (
    <ImageBackground
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
      source={
        BACKGROUNDS[
          weather?.weather[0]?.main
            ? weather.weather[0].main.toLowerCase()
            : "default"
        ]
      }
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
            fontFamily: FONTS.bold,
          }}
        >
          Hi, @{me?.email?.split(/@/)[0]}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {weather ? (
          <>
            <Image
              source={{
                uri: `https://openweathermap.org/img/w/${weather.weather[0]?.icon}.png`,
              }}
              style={{
                width: 80,
                height: 80,
              }}
            />
          </>
        ) : null}
      </View>
    </ImageBackground>
  );
};

export default Home;
