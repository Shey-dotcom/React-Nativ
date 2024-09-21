import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const Main = ({ weather, textStyles }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
          padding: 30,
        }}
      >
        <Text
          style={[
            {
              fontSize: 18,
              fontFamily: FONTS.regular,
            },
            textStyles,
          ]}
        >
          L {weather.main.temp_min.toFixed(0)}°C
        </Text>
        <Text
          style={[
            {
              fontSize: 30,
              fontFamily: FONTS.bold,
            },
            textStyles,
          ]}
        >
          {weather.main.temp.toFixed(0)}°C
        </Text>
        <Text
          style={[
            {
              fontSize: 18,
              fontFamily: FONTS.regular,
            },
            textStyles,
          ]}
        >
          H {weather.main.temp_max.toFixed(0)}°C
        </Text>
      </View>
      <Image
        source={{
          uri: `https://openweathermap.org/img/w/${weather.weather[0]?.icon}.png`,
        }}
        style={{
          width: 80,
          height: 80,
        }}
      />
      <Text
        style={{
          ...textStyles,
          fontSize: 18,
          fontFamily: FONTS.regular,
        }}
      >
        {weather.weather[0]?.description}.
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...textStyles,
              fontSize: 18,
              fontFamily: FONTS.regular,
            }}
          >
            Humidity
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <FontAwesome5
              name="cloud-moon-rain"
              size={24}
              color={textStyles.color}
            />
            <Text
              style={{
                ...textStyles,
                fontSize: 18,
                fontFamily: FONTS.regular,
              }}
            >
              {weather.main.humidity} %
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...textStyles,
              fontSize: 18,
              fontFamily: FONTS.regular,
            }}
          >
            Pressure
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <FontAwesome name="compress" size={24} color={textStyles.color} />
            <Text
              style={{
                ...textStyles,
                fontSize: 18,
                fontFamily: FONTS.regular,
              }}
            >
              {weather.main.pressure} hPa
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Main;
