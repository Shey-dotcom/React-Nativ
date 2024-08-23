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
import { useJwtStore, useMeStore } from "../store";
import { fetchMe } from "../context/handlers";
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
          //tabBarIcon: () => null,
          //tabBarLabel: () => null,
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
          tabBarIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
          //tabBarIcon: () => null,
          //tabBarLabel: () => null,
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
