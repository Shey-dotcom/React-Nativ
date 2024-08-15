import { View, Text, Modal, ActivityIndicator } from "react-native";
import React from "react";

const Spinner = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, .5)",
        }}
      >
        <ActivityIndicator size={50} />
      </View>
    </Modal>
  );
};

export default Spinner;
