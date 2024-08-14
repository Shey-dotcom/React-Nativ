import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FONTS } from "../../constants";
import { useUserStore } from "../../store";

const Home = ({ navigation }) => {
  const { logout } = useUserStore();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text
        style={{
          marginTop: 100,
          fontFamily: FONTS.bold,
          fontSize: 40,
        }}
      >
        Weather App
      </Text>

      <Text
        style={{
          width: "80%",
          marginTop: 150,
          padding: 20,
          alignItems: "center",
        }}
      >
        Explore weather in different cities using our app
      </Text>
      <Image
        style={{
          marginTop: 50,
          width: 100,
          height: 80,
          marginBottom: 70,
        }}
        source={require("../../assets/weather.png")}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#36BA98",
          padding: 15,
          borderRadius: 999,
          width: "80%",
          alignItems: "center",
        }}
        onPress={() => logout()}
      >
        <Text
          style={{
            color: "white",
            fontSize: 23,
            fontFamily: FONTS.bold,
          }}
        >
          GET STARTED
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
