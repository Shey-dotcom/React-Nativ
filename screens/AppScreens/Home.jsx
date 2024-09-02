import { ImageBackground } from "react-native";
import React from "react";
import { useLocationStore } from "../../store";
import { BACKGROUNDS } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import { currentWeatherCall } from "../../context/handlers";
import UserCard from "../../components/UserCard";
import Main from "../../components/Main";
import Wind from "../../components/Wind";

const Home = ({ navigation }) => {
  const { location } = useLocationStore();
  const [bg, setBg] = React.useState(BACKGROUNDS.default);
  const { data: weather } = useQuery({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: ({ queryKey }) => currentWeatherCall(queryKey),
  });

  React.useEffect(() => {
    if (weather?.weather[0]?.main) {
      const b = weather.weather[0].main.toLowerCase();
      setBg(BACKGROUNDS[b]);
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
      source={bg}
    >
      <UserCard />

      {weather?.weather ? <Main weather={weather} /> : null}
      {weather?.weather ? <Wind weather={weather} /> : null}
    </ImageBackground>
  );
};

export default Home;
