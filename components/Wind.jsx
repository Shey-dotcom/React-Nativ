import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import { Feather, FontAwesome } from "@expo/vector-icons";

const Wind = ({ weather, textStyles }) => {
  const CAMPUS_DIM = 150;
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ padding: 10, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 18,
            ...textStyles,
          }}
        >
          Wind Speed
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Feather name="wind" size={24} color={textStyles.color} />
          <Text style={{ ...textStyles, fontFamily: FONTS.regular }}>
            {weather.wind.speed} m/s
          </Text>
        </View>
      </View>
      <View style={{ padding: 10, alignItems: "center" }}>
        <Text
          style={{
            fontFamily: FONTS.bold,
            ...textStyles,
            fontSize: 18,
          }}
        >
          Wind Direction
        </Text>
        <View
          style={{
            borderWidth: 3,
            width: CAMPUS_DIM,
            height: CAMPUS_DIM,
            marginTop: 10,
            borderRadius: CAMPUS_DIM,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
            borderColor: textStyles.color,
          }}
        >
          {[
            { right: CAMPUS_DIM / 2, rotation: "0deg", top: 0 },
            { right: 0, rotation: "90deg", top: CAMPUS_DIM / 2 },
            { right: CAMPUS_DIM / 2, rotation: "0deg", top: 135 },
            { right: 140, rotation: "90deg", top: CAMPUS_DIM / 2 },
          ].map(({ right, rotation, top }, index) => (
            <View
              key={index}
              style={[
                styles.tick,

                {
                  position: "absolute",
                  right,
                  top,
                  transform: [{ rotate: rotation }],
                  backgroundColor: textStyles.color,
                },
              ]}
            />
          ))}

          {[
            {
              right: CAMPUS_DIM / 2 - 5,
              top: 10,
              value: "N",
            },
            {
              right: 10,
              top: CAMPUS_DIM / 2 - 10,
              value: "E",
            },
            {
              right: CAMPUS_DIM / 2 - 5,
              top: 110,
              value: "S",
            },
            {
              right: 110,
              top: CAMPUS_DIM / 2 - 10,
              value: "W",
            },
          ].map(({ right, top, value }, index) => (
            <Text
              key={index}
              style={[
                styles.text,
                {
                  position: "absolute",
                  right,
                  top,
                },
                textStyles,
              ]}
            >
              {value}
            </Text>
          ))}

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                transform: [{ rotate: `${weather.wind.deg}deg` }],
                transformOrigin: "bottom",
              }}
            >
              <FontAwesome name="long-arrow-up" size={24} color={COLORS.red} />
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: COLORS.red,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Wind;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.borderRadius,
    fontSize: 20,
    textAlign: "center",
    color: COLORS.white,
  },
  tick: {
    width: 4,
    height: 10,
    backgroundColor: COLORS.white,
  },
});
