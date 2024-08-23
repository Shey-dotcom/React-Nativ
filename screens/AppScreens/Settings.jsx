import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import AppHeader from "../../components/AppHeader";
const Settings = ({ navigation }) => {
  const { bottom } = useSafeAreaInsets();
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
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBlockColor: "gray",
          paddingVertical: 30,
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>Settings</Text>
      </View>
      <SettingsItem
        onPress={() => {}}
        label={"Location settings"}
        Icon={<Ionicons name="location" size={24} color={"gray"} />}
        desc={"Update location settings."}
      />
      <SettingsItem
        onPress={() => {}}
        label={"Delete account"}
        Icon={<Ionicons name="person-remove" size={24} color={"gray"} />}
        desc={"Delete your account."}
      />
      <SettingsItem
        onPress={() => {}}
        label={"Change password"}
        Icon={<Ionicons name="lock-closed" size={24} color={"gray"} />}
        desc={"Change your account password."}
      />
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
          Version: {Constants.expoConfig.version}
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default Settings;

const SettingsItem = ({ onPress, label, desc, Icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={{ fontFamily: FONTS.bold }}>{label}</Text>
        <Text style={{ fontFamily: FONTS.regular, color: "gray" }}>{desc}</Text>
      </View>
      {Icon}
    </TouchableOpacity>
  );
};
