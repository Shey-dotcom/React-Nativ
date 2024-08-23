import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Spinner from "../../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "../../context/handlers";
import { useJwtStore, useMeStore } from "../../store";

import AppHeader from "../../components/AppHeader";
import { COLORS } from "../../constants";


const Profile = ({ navigation }) => {
  const { jwt, destroy } = useJwtStore();
  const { logout } = useMeStore();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: logoutFn,
    mutationKey: ["logout"],
  });

  const logoutHandler = async () => {
    const data = await mutateAsync({ jwt });
    if (!!data?.success) {
      destroy();
      logout();
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <AppHeader
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Spinner visible={isPending} />
      <Image
        style={{
          width: 100,
          height: 80,
          padding: 100,
          margin: 20,
          borderRadius: 999,
        }}
        source={require("../../assets/person.png")}
      />

      <Text
        style={{
          fontFamily: FONTS.bold,
          fontSize: 24,
        }}
      >
        John Doe
      </Text>
      <Text
        style={{
          padding: 20,
          fontFamily: FONTS.regular,
          fontSize: 16,
        }}
      >
        johndoe@gmail.com
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.green,
          padding: 20,
          borderRadius: 999,
          maxWidth: 300,
          width: "100%",
          alignItems: "center",
        }}
        onPress={logoutHandler}
      >
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
            fontFamily: FONTS.bold,
          }}
        >
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
