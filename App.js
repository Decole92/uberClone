import { StatusBar } from "expo-status-bar";
import { StyleSheet, ViewPropTypes, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AcountScreen from "./Screens/AccountScreen";
import ActivityScreen from "./Screens/ActivityScreen";
import Mapy from "./component/Mapy";
import MapScreen from "./Screens/MapScreen";
import SetMap from "./Screens/SetMap";
import Welcome from "./Screens/Welcome";
import LoginScreen from "./Screens/LoginScreen";
import { Foundation, MaterialCommunityIcons } from "react-native-vector-icons";
import HomeScreen from "./Screens/HomeScreen";
import useAuth from "./hook/useAuth";
import { AuthProvider } from "./hook/useAuth";
const Tab = createBottomTabNavigator();
function App() {
  const { fbUser, user } = useAuth();
  const Stack = createNativeStackNavigator();
  console.log(user);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user || fbUser ? (
          <>
            <Stack.Screen
              name="MyTab"
              options={{ headerShown: false }}
              component={MyTab}
            />
            <Stack.Screen
              name="Set"
              options={{ headerShown: false }}
              component={SetMap}
            />
            <Stack.Screen
              name="Map"
              options={{ headerShown: false }}
              component={MapScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="welcome"
              options={{ headerShown: false }}
              component={Welcome}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      screenOptions={{
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "black",
        headerShown: false,
        justifyContent: "center",
        tabBarStyle: {
          paddingTop: 10,
          height: 70,
          paddingBottom: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Foundation
              name="home"
              size={30}
              color={focused ? "black" : "grey"}
            />
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Activity"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={30}
              color={focused ? "black" : "grey"}
            />
          ),
        }}
        component={ActivityScreen}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={focused ? "black" : "grey"}
            />
          ),
        }}
        component={AcountScreen}
      />
    </Tab.Navigator>
  );
}

function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Main;
