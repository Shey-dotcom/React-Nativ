import {
  Button,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import Spinner from "../../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { logoutFn } from "../../context/handlers";
import { useJwtStore, useMeStore } from "../../store";

import AppHeader from "../../components/AppHeader";
import { COLORS, FONTS } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Profile = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
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
          fontSize: 25,
        }}
      >
        John Doe
      </Text>

      <Text style={{ padding: 10, fontFamily: FONTS.regular, color: "gray" }}>
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
      <SafeAreaView
        style={{
          alignItems: "center",
          position: "absolute",
          paddingBottom: bottom + 20,
          bottom: 0,
          width: "100%",
        }}
      >
        <Text style={{ fontFamily: FONTS.regular, color: "gray" }}>
          Joined 3 December 2020
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
