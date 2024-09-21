import { ImageBackground } from "react-native";
import React from "react";
import { WEATHER_STYLES } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { currentWeatherCall } from "../../context/handlers";
import UserCard from "../../components/UserCard";
import Main from "../../components/Main";
import Wind from "../../components/Wind";
import { useLocationStore, useSettingsStore } from "../../store";

const Home = ({ navigation }) => {
  const { settings } = useSettingsStore();
  const { location } = useLocationStore();
  const [styles, setStyles] = React.useState(WEATHER_STYLES.default);
  const { data: weather } = useQuery({
    queryKey: [
      "weather",
      location?.latitude,
      location?.longitude,
      settings?.units,
    ],
    queryFn: ({ queryKey }) => currentWeatherCall(queryKey),
  });

  React.useEffect(() => {
    if (weather?.weather[0]?.main) {
      const b = weather.weather[0].main.toLowerCase();
      setStyles(WEATHER_STYLES[b]);
    }
  }, [weather]);
  return (
    <ImageBackground
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        width: "100%",
      }}
      source={styles.image}
    >
      <UserCard textStyles={styles.textStyles} />
      {weather?.weather ? (
        <Main weather={weather} textStyles={styles.textStyles} />
      ) : null}
      {weather?.weather ? (
        <Wind weather={weather} textStyles={styles.textStyles} />
      ) : null}
    </ImageBackground>
  );
};

export default Home;
