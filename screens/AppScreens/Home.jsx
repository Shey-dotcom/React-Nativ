import { Text, View } from "react-native";
import React from "react";
import { useMeStore } from "../../store";

const Home = ({ navigation }) => {
  const { me } = useMeStore();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text>{JSON.stringify({ me }, null, 2)}</Text>
    </View>
  );
};

export default Home;
