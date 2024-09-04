import { Text, View, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants";
import { useJwtStore, useMeStore } from "../store";
import { useMutation } from "@tanstack/react-query";
import { changeFn } from "../context/handlers";
import Spinner from "./Spinner";

const ChangePasswordBottomSheet = React.forwardRef(({}, ref) => {
  const snapPoints = React.useMemo(() => ["80%"], []);
  const { set, jwt } = useJwtStore();
  const { dismiss } = useBottomSheetModal();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: changeFn,
    mutationKey: ["change-2"],
  });
  const { me } = useMeStore();
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
      dismiss();
    }
  };
  return (
    <BottomSheetModal
      backgroundStyle={{
        backgroundColor: COLORS.gray,
      }}
      ref={ref}
      snapPoints={snapPoints}
      enableOverDrag={false}
      enableDynamicSizing={false}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <Spinner visible={isPending} />
        <Text
          style={{
            fontFamily: FONTS.bold,
            margin: 20,
            fontSize: 20,
          }}
        >
          Change Password
        </Text>

        <View
          style={{
            flex: 1,
            width: "100%",
            maxWidth: 500,
            alignSelf: "center",
            padding: 20,
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
              {me?.email}
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
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.green,
            padding: 15,
            borderRadius: 10,
            maxWidth: 380,
            width: "100%",
            alignItems: "center",
            alignSelf: "center",
            margin: 30,
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
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ChangePasswordBottomSheet;
