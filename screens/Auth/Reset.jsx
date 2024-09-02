import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, logo } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingViewWrapper from "../../components/KeyboardAvoidingViewWraper";
import Spinner from "../../components/Spinner";
import { changeFn } from "../../context/handlers";
import { useJwtStore } from "../../store";
import { useMutation } from "@tanstack/react-query";
const Reset = ({ navigation, route }) => {
  const { set, jwt } = useJwtStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changeFn,
    mutationKey: ["change"],
  });
  const [state, setState] = React.useState({
    password: "",
    error: "",
    showPassword: false,
    confirm: "",
    showConfirmPassword: false,
  });

  const reset = async () => {
    const data = await mutateAsync({
      confirm: state.confirm,
      password: state.password,
      jwt,
    });
    if (data?.error) {
      setState((s) => ({ ...s, error: data.error, password: "", confirm: "" }));
    } else {
      const { jwt } = data;
      set(jwt);
      setState((s) => ({
        ...s,
        error: "",
        password: "",
        showConfirmPassword: false,
        confirm: "",
        showPassword: false,
      }));
    }
  };
  return (
    <KeyboardAvoidingViewWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: COLORS.white,
          padding: 10,
          paddingHorizontal: 20,
        }}
      >
        <Spinner visible={isPending} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 30,
            }}
          >
            Reset Password
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
            flex: 1,
          }}
        >
          <Text style={{ fontFamily: FONTS.regular }}>
            New account password for:{" "}
            <Text
              style={{
                color: COLORS.green,
                fontFamily: FONTS.bold,
              }}
            >
              {route?.params?.email}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: 20,
              maxWidth: 380,
              backgroundColor: COLORS.gray,
              padding: 15,
              paddingHorizontal: 25,
              borderTopLeftRadius: 25,
              borderBottomRightRadius: 25,
              marginTop: 20,
            }}
          >
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <TextInput
              placeholder="New Password"
              keyboardType="default"
              secureTextEntry={!state.showPassword}
              style={{
                backgroundColor: COLORS.gray,
                flex: 1,
                fontSize: 20,
              }}
              value={state.password}
              onChangeText={(text) =>
                setState((state) => ({ ...state, password: text }))
              }
            />
            <TouchableOpacity
              onPress={() => {
                setState((state) => ({
                  ...state,
                  showPassword: !state.showPassword,
                }));
              }}
            >
              <Ionicons
                name={state.showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: 20,
              maxWidth: 380,
              backgroundColor: COLORS.gray,
              padding: 15,
              paddingHorizontal: 25,
              borderTopLeftRadius: 25,
              borderBottomRightRadius: 25,
              marginTop: 20,
            }}
          >
            <Ionicons name="lock-closed-outline" size={24} color="black" />
            <TextInput
              placeholder="Confirm New Password"
              keyboardType="default"
              secureTextEntry={!state.showConfirmPassword}
              style={{
                backgroundColor: COLORS.gray,
                flex: 1,
                fontSize: 20,
              }}
              value={state.confirm}
              onChangeText={(text) =>
                setState((state) => ({ ...state, confirm: text }))
              }
              onSubmitEditing={reset}
            />
            <TouchableOpacity
              onPress={() => {
                setState((state) => ({
                  ...state,
                  showConfirmPassword: !state.showConfirmPassword,
                }));
              }}
            >
              <Ionicons
                name={
                  state.showConfirmPassword ? "eye-outline" : "eye-off-outline"
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: COLORS.red,
              fontSize: 20,
              fontFamily: FONTS.regular,
              marginVertical: 20,
              textAlign: "center",
            }}
          >
            {state.error}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.green,
              padding: 20,
              borderRadius: 999,
              maxWidth: 380,
              width: "100%",
              alignItems: "center",
            }}
            onPress={reset}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 20,
                fontFamily: FONTS.bold,
              }}
            >
              UPDATE PASSWORD
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: COLORS.green,
              textDecorationLine: "underline",
              fontSize: 20,
              fontFamily: FONTS.regular,
              bottom: 30,
              position: "absolute",
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login to an existing account
          </Text>
        </View>
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};

export default Reset;
