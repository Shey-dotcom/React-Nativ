import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "./AppScreens/Home";
import Login from "./Auth/Login";
import Settings from "./AppScreens/Settings";
import { useUserStore } from "../store";
import Register from "./Auth/Register";
import Profile from "./AppScreens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Welcome from "./Auth/Welcome";
import Reset from "./Auth/Reset";
import Forgot from "./Auth/Forgot";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="home-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person-sharp" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
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
  const { user } = useUserStore();
  return user ? <AppStack /> : <AuthStack />;
};
