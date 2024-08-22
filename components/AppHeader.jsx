import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({ onPress }) => {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, paddingTop: top }}>
      <View
        style={{
          paddingHorizontal: 25,
          paddingTop: 25,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppHeader;
