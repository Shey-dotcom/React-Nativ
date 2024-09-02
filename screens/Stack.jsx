import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./AppScreens/Home";
import Login from "./Auth/Login";
import Settings from "./AppScreens/Settings";
import Register from "./Auth/Register";
import Profile from "./AppScreens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Welcome from "./Auth/Welcome";
import Reset from "./Auth/Reset";
import Forgot from "./Auth/Forgot";
import { useJwtStore, useLocationStore, useMeStore } from "../store";
import { fetchMe } from "../context/handlers";
import { COLORS, FONTS } from "../constants";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useCurrentLocation } from "../hooks/useCurrentLocation";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppStack = () => {
  const { location } = useCurrentLocation();
  const { update } = useLocationStore();
  React.useEffect(() => {
    update(location);
  }, [location]);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.white,
        tabBarLabelStyle: {
          fontFamily: FONTS.bold,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          elevation: 0,
          borderTopWidth: 0,
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, .0)",
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
          //tabBarIcon: () => null,
          //tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
          tabBarStyle: { display: "none" },
          //tabBarIcon: () => null,
          //tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),

          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  );
};

export default () => {
  const { me, login } = useMeStore();
  const { jwt } = useJwtStore();

  React.useEffect(() => {
    (async () => {
      const user = await fetchMe(jwt);
      login(user);
    })();
  }, [jwt]);
  return !!me && me.loggedIn ? <AppStack /> : <AuthStack />;
};
