import { StyleSheet } from "react-native";

export const Fonts = {
  LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  LatoItalic: require("../assets/fonts/Lato-Italic.ttf"),
  LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
  LatoBoldItalic: require("../assets/fonts/Lato-BoldItalic.ttf"),
};

export const FONTS = {
  bold: "LatoBold",
  italic: "LatoItalic",
  regular: "LatoRegular",
  boldItalic: "LatoBoldItalic",
};

export const logo = require("../assets/weather.png");

export const COLORS = {
  white: "white",
  black: "black",
  gray: "#f5f5f5",
  green: "#36BA98",
  red: "#D32C2D",
};

export const KEYS = {
  JWT: "jwt-token",
  ME: "me",
  LOCATION: "location",
  SETTINGS: "settings",
};
export const API_URL = "https:///23bc-213-172-134-127.ngrok-free.app";

const styles = StyleSheet.create({
  light: { color: COLORS.black },
  dark: { color: COLORS.white },
});

export const WEATHER_STYLES = {
  clear: {
    image: require("../assets/clear.gif"),
    textStyles: styles.light,
  },
  default: {
    image: require("../assets/default.gif"),
    textStyles: styles.light,
  },
  rain: { image: require("../assets/rain.gif"), textStyles: styles.dark },
  snow: { image: require("../assets/snow.gif"), textStyles: styles.dark },
  clouds: { image: require("../assets/clouds.gif"), textStyles: styles.dark },
  thunderstorm: {
    image: require("../assets/thunderstorm.gif"),
    textStyles: styles.light,
  },
  drizzle: {
    image: require("../assets/drizzle.gif"),
    textStyles: styles.dark,
  },
  atmosphere: {
    image: require("../assets/atmosphere.gif"),
    textStyles: styles.light,
  },
};
