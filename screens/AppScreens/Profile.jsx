import { Button, Text, View } from "react-native";
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
      <Button title="Logout" onPress={logoutHandler} />
    </View>
  );
};

export default Profile;
