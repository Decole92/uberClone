import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import React from "react";
import { AntDesign } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={tw("flex-1 relative items-center bg-blue-500 h-full w-full")}
    >
      <StatusBar style="auto" />

      <Text style={[tw("text-white text-4xl text-center pt-10 pb-20")]}>
        Uber
      </Text>

      <Image
        source={require("../assets/uberfont.png")}
        resizeMode="contain"
        style={[tw("rounded-lg"), { width: 200, height: 200 }]}
      />

      <Text style={tw("text-center text-4xl text-white pt-20")}>
        Move with Safety
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("login")}
        style={[
          tw(
            " flex-row absolute bottom-10 items-center justify-between bg-black p-2"
          ),
          { width: 350 },
        ]}
      >
        <Text></Text>
        <Text style={tw("text-lg text-white")}>Get Started</Text>
        <Text>
          <AntDesign name="arrowright" size={30} style={{ color: "white" }} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
