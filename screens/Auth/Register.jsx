import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, logo } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    error: "",
    show: false,
  });
  const register = () => {
    console.log(state);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
        padding: 10,
        paddingHorizontal: 20,
      }}
    >
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
          Register
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
            secureTextEntry={state.show}
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
            color: COLORS.red,
            fontSize: 20,
            fontFamily: FONTS.regular,
            marginVertical: 20,
            textAlign: "center",
          }}
        >
          Invalid credentials!!
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
          onPress={register}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 20,
              fontFamily: FONTS.bold,
            }}
          >
            REGISTER
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
  );
};

export default Register;
