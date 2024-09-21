import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocationStore, useMeStore } from "../store";
import { FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import LocationBottomSheet from "./LocationBottomSheet";

const UserCard = ({ textStyles }) => {
  const { me } = useMeStore();
  const { location } = useLocationStore();
  const locationBottomSheetRef = React.useRef(null);
  return (
    <>
      <LocationBottomSheet ref={locationBottomSheetRef} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            width: 40,
            height: 40,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => locationBottomSheetRef.current?.present()}
        >
          <Ionicons name="menu-outline" size={25} color={textStyles.color} />
        </TouchableOpacity>
        <Text
          style={{
            ...textStyles,
            fontSize: 20,
            fontFamily: FONTS.bold,
          }}
        >
          Hi, @{me?.email?.split(/@/)[0]}
        </Text>
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text
            style={{
              ...textStyles,
              fontSize: 20,
              fontFamily: FONTS.bold,
            }}
          >
            {location?.reversed?.city}
          </Text>
          <Text
            style={{
              ...textStyles,
              fontSize: 14,
              fontFamily: FONTS.regular,
            }}
          >
            {location?.reversed?.formattedAddress}
          </Text>
        </View>
      </View>
    </>
  );
};

export default UserCard;
