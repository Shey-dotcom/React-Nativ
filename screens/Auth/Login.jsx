import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, logo } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "../../components/Spinner";
import KeyboardAvoidingViewWrapper from "../../components/KeyboardAvoidingViewWraper";
import { useMutation } from "@tanstack/react-query";
import { loginFn } from "../../context/handlers";
import { useJwtStore } from "../../store";

const Login = ({ navigation }) => {
  const { mutateAsync: mutateLogin, isPending } = useMutation({
    mutationFn: loginFn,
    mutationKey: ["login"],
  });
  const { set } = useJwtStore();
  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: "",
    show: false,
  });

  const login = async () => {
    const data = await mutateLogin({
      email: state.email,
      password: state.password,
    });
    if (data?.error) {
      setState((s) => ({ ...s, error: data.error, password: "" }));
    } else {
      const { jwt } = data;
      set(jwt);
      setState((s) => ({
        ...s,
        email: "",
        password: "",
        error: "",
        show: false,
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
            Login
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
            }}
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <TextInput
              placeholder="Email Address"
              keyboardType="email-address"
              style={{
                backgroundColor: COLORS.gray,
                flex: 1,
                fontSize: 20,
              }}
              value={state.email}
              onChangeText={(text) =>
                setState((state) => ({ ...state, email: text }))
              }
            />
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
              placeholder="Password"
              keyboardType="default"
              secureTextEntry={!state.show}
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
                setState((state) => ({ ...state, show: !state.show }));
              }}
            >
              <Ionicons
                name={state.show ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: COLORS.green,
              textDecorationLine: "underline",
              fontSize: 20,
              fontFamily: FONTS.regular,
              alignSelf: "flex-end",
              marginVertical: 20,
            }}
            onPress={() => {
              navigation.navigate("Forgot");
            }}
          >
            Forgot Password?
          </Text>

          <Text
            style={{
              color: COLORS.red,
              fontSize: 20,
              fontFamily: FONTS.regular,
              marginVertical: 10,
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
            onPress={login}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 20,
                fontFamily: FONTS.bold,
              }}
            >
              LOGIN
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
              navigation.navigate("Register");
            }}
          >
            Create New Account
          </Text>
        </View>
      </View>
    </KeyboardAvoidingViewWrapper>
  );
};

export default Login;
