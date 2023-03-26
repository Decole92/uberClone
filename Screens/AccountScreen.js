import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "react-native-vector-icons";
import useAuth from "../hook/useAuth";
import React from "react";
import tw from "tailwind-rn";
const AccountScreen = () => {
  const { logout, user, fbUser } = useAuth();
  return (
    <View style={tw("bg-white w-full h-full")}>
      {console.log(user.displayName)}
      <View style={tw("flex-row items-center justify-between py-3 px-4")}>
        <View style={tw("pt-4")}>
          <Text style={[tw("text-3xl font-semibold"), { color: "#000000" }]}>
            {user?.displayName || fbUser?.displayName}
          </Text>
          <Text
            style={[
              tw("bg-gray-100 rounded-full mt-2 p-1 justify-center"),
              { width: 60 },
            ]}
          >
            {" "}
            <Entypo name="star" size={14} />
            4.58
          </Text>
        </View>
        <TouchableOpacity style={tw("rounded-full")}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 100 }}
            source={{ uri: user?.photoURL || fbUser?.photoURL }}
          />
        </TouchableOpacity>
      </View>

      <View style={tw("flex-row justify-between my-0 mx-4")}>
        <TouchableOpacity
          style={[
            tw("bg-gray-100 items-center rounded-xl"),
            { width: 112, height: 100 },
          ]}
        >
          <Ionicons name="help-buoy" style={tw("mt-5")} size={30} />

          <Text
            style={[
              tw("font-semibold text-black pt-2 text-sm"),
              { fontSize: 14, color: "#000000" },
            ]}
          >
            Help
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw("bg-gray-100 items-center rounded-xl"),
            { width: 112, height: 100 },
          ]}
        >
          <Ionicons name="briefcase-sharp" style={tw("mt-5")} size={30} />

          <Text
            style={[
              tw("font-semibold text-black pt-2 text-sm"),
              { fontSize: 14, color: "#000000" },
            ]}
          >
            Wallet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw("bg-gray-100 items-center rounded-xl"),
            { width: 112, height: 100 },
          ]}
        >
          <Ionicons name="time" style={tw("mt-5")} size={30} />

          <Text
            style={[
              tw("font-semibold text-black pt-2 text-sm"),
              { fontSize: 14, color: "#000000" },
            ]}
          >
            Trips
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={tw(
          "flex-row justify-between mx-4 my-2 items-center p-3 pb-3 bg-gray-100 rounded-xl"
        )}
      >
        <View style={[tw("p-1"), {}]}>
          <Text style={tw("text-lg text-black pb-1")}>Safety Checkup</Text>
          <Text style={tw("pb-1 text-gray-500")}>
            Boost your safety profile by turning on{" "}
          </Text>
          <Text style={tw("pt-1 text-gray-500")}>addition features</Text>
        </View>
        <Image
          style={{ width: 60, height: 60 }}
          source={require("../assets/bar.png")}
        />
      </TouchableOpacity>

      <View
        style={[
          tw(""),
          {
            borderBottomColor: "#F5F5F5",
            borderBottomWidth: 10,
            width: "100%",
          },
        ]}
      />

      <TouchableOpacity style={tw("flex-row mx-5 my-5")}>
        <MaterialIcons name="markunread" size={20} />
        <Text style={tw("pl-5 text-sm font-semibold")}>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw("flex-row mx-5 my-5")}>
        <Fontisto name="player-settings" size={20} />
        <Text style={tw("pl-5 text-sm font-semibold")}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tw("flex-row mx-5 my-5")}>
        <MaterialCommunityIcons name="account" size={20} />
        <Text style={tw("pl-5 text-sm font-semibold")}>
          Earn by driving or delivering
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout} style={tw("flex-row mx-5 my-5")}>
        <MaterialCommunityIcons name="logout-variant" size={20} />
        <Text style={tw("pl-5 text-sm font-semibold")}>Logout</Text>
      </TouchableOpacity>

      <Text style={tw("px-2 pt-2 text-gray-500")}>V4.10003</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
