import { View, Text } from "react-native";
import React from "react";
import { useLocationStore, useMeStore } from "../store";
import { COLORS, FONTS } from "../constants";

const UserCard = () => {
  const { me } = useMeStore();
  const { location } = useLocationStore();
  return (
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
      <View style={{ alignItems: "center", padding: 20 }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
            fontFamily: FONTS.bold,
          }}
        >
          {location?.reversed?.city}
        </Text>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 14,
            fontFamily: FONTS.regular,
          }}
        >
          {location?.reversed?.formattedAddress}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;
