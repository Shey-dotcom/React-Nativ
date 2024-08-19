import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";

const KeyboardAvoidingViewWrapper = ({ children }) => {
  const os = Platform.OS;
  const headerHeight = useHeaderHeight();
  if (os === "ios")
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          enabled
          keyboardVerticalOffset={headerHeight}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, minHeight: Dimensions.get("window").height }}
        behavior={undefined}
        enabled
        keyboardVerticalOffset={headerHeight}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoidingViewWrapper;
