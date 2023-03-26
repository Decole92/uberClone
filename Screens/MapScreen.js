import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import tw from "tailwind-rn";
import Mapy from "../component/Mapy";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Ionicons, FontAwesome } from "react-native-vector-icons";
import RideOptions from "../component/RideOptions";
import useAuth from "../hook/useAuth";

const MapScreen = () => {
  const { selected } = useAuth();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { origin, destination, distance, duration } = params;
  return (
    <View style={tw("flex-1 h-full w-full relative")}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Set")}
        style={[
          tw(
            "bg-white absolute left-5 rounded-full items-center justify-center"
          ),
          { width: 50, zIndex: 100, top: 20, height: 50 },
        ]}
      >
        <Ionicons name="arrow-back" size={30} />
      </TouchableOpacity>

      <View style={[tw("h-1/2")]}>
        <Mapy origin={origin} destination={destination} />
      </View>

      <View style={tw("h-1/2")}>
        <Text style={tw("text-center text-sm py-2 ")}>
          Choose a ride - Distance ({distance.toFixed(1)} Km)
        </Text>

        <View
          style={{
            borderBottomColor: "#D3D3D3",
            borderBottomWidth: 1,
            width: "100%",
          }}
        />

        <RideOptions distance={distance} duration={duration} />

        <TouchableOpacity
          disabled={!selected}
          style={[
            !selected
              ? tw(
                  "bg-gray-200 items-center absolute bottom-4 w-full justify-center mx-5"
                )
              : tw(
                  "bg-black items-center absolute bottom-4 w-full justify-center mx-5"
                ),
            { width: 350, height: 50 },
          ]}
        >
          <Text style={tw("text-white text-xl")}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MapScreen;
const styles = StyleSheet.create({});
