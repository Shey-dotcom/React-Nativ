import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, logo } from "../../constants";

const Welcome = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 30,
          }}
        >
          Weather App
        </Text>
      </View>

      <View
        style={{
          flex: 0.2,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            width: "80%",

            padding: 20,
            alignItems: "center",
            fontFamily: FONTS.regular,
            fontSize: 16,
          }}
        >
          Explore weather in different cities using our app
        </Text>
        <Image
          style={{
            width: 100,
            height: 80,
          }}
          source={logo}
        />
      </View>

      <View
        style={{
          width: "100%",
          flex: 0.4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.green,
            padding: 20,
            borderRadius: 999,
            maxWidth: 300,
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontFamily: FONTS.bold,
            }}
          >
            GET STARTED
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
