import {
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React, { useRef } from "react";
import Slider from "../component/Slider";
import NavBar from "../component/NavBar";
import SearchBar from "../component/SearchBar";
import Note from "../component/Note";
import tw from "tailwind-rn";

import MapView, {
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Marker,
} from "react-native-maps";
import cars from "../component/cars";

const HomeScreen = () => {
  const mapRef = useRef();
  return (
    <SafeAreaView style={tw("bg-white h-full ")}>
      <ScrollView>
        <Slider />
        <NavBar />
        <SearchBar />
        <Note />
        <Text style={tw("text-lg px-5 text-black text-lg pt-4 pb-1")}>
          Around you
        </Text>

        <View
          style={[
            tw("mx-4 my-4 rounded-lg"),
            { height: 200, borderRadius: 20 },
          ]}
        >
          <MapView
            ref={mapRef}
            provider={
              Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE
            } // remove if not using Google Maps
            style={{ flex: 1, height: "100%", width: "100%", borderRadius: 20 }}
            // mapType="mutedStandard"
            initialRegion={{
              latitude: 50.0755,
              longitude: 14.4378,
              latitudeDelta: 0.0142,
              longitudeDelta: 0.00121,
            }}
          >
            {cars.map((cars) => (
              <Marker
                key={cars.id}
                coordinate={{
                  latitude: cars.latitude,
                  longitude: cars.longitude,
                }}
              >
                <Image
                  style={{ width: 70, height: 70, resizeMode: "contain" }}
                  source={getImage(cars.type)}
                />
              </Marker>
            ))}
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const getImage = (type) => {
  if (type === "UberX") {
    return require("../assets/topuber-rm.png");
  } else if (type === "Comfort") {
    return require("../assets/topcomfort-rm.png");
  } else {
    return require("../assets/topxl-rm.png");
  }
};
