import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, logo } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { forgotFn } from "../../context/handlers";
import KeyboardAvoidingViewWrapper from "../../components/KeyboardAvoidingViewWraper";
import { useJwtStore } from "../../store";
import Spinner from "../../components/Spinner";

const Forgot = ({ navigation }) => {
  const { set } = useJwtStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotFn,
    mutationKey: ["forgot"],
  });
  const [state, setState] = React.useState({
    email: "",
    error: "",
  });
  const forgot = async () => {
    if (!!!state.email) return;

    const data = await mutateAsync({
      email: state.email,
    });
    if (data?.error) {
      setState((s) => ({ ...s, error: data.error }));
    } else {
      const { jwt } = data;
      set(jwt);
      navigation.replace("Reset", {
        email: state.email,
      });
      setState((s) => ({
        ...s,
        email: "",
        error: "",
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
            Forgot Password
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

          <Text
            style={{
              color: COLORS.red,
              fontSize: 20,
              fontFamily: FONTS.regular,
              textAlign: "center",
              marginTop: 20,
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
            onPress={forgot}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: 20,
                fontFamily: FONTS.bold,
              }}
            >
              Reset Password
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

export default Forgot;
