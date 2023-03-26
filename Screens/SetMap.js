import {
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useCallback, useEffect } from "react";
import tw from "tailwind-rn";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Fontisto, Entypo } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
//import Mapy from '../component/Mapy'
import useAuth from "../hook/useAuth";
import MapViewDirections from "react-native-maps-directions";

const SetMap = () => {
  const navigation = useNavigation();

  const { logout } = useAuth();

  const mapRef = useRef();

  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 });
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });

  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const traceRoute = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const onMapReadyHandler = useCallback(() => {
    if (Platform.OS === "ios") {
      mapRef?.current?.fitToElements(false);
    } else {
      mapRef?.current?.fitToCoordinates([origin, destination], {
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!origin && !destination) return;

    mapRef.current.fitToSuppliedMarkers(["mk1", "mk2"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  return (
    <View style={tw("flex-1")}>
      <View
        style={[
          tw("bg-white"),
          {
            width: "100%",
            height: 200,
            shadowColor: "black",
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 4,
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Fontisto name="arrow-left" size={25} style={tw("pt-3 pl-2")} />
        </TouchableOpacity>

        <View
          style={[
            tw("mx-10 items-center justify-center h-full"),
            { width: "80%" },
          ]}
        >
          <GooglePlacesAutocomplete
            placeholder="Where From?"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data, details);
              const position = {
                latitude: details?.geometry.location.lat || 0,
                longitude: details?.geometry.location.lng || 0,
              };

              setOrigin(position);

              moveTo(position);
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: process.env.GOOGLE_API_KEY,
              language: "en",
            }}
            styles={{
              textInputContainer: {
                alignItems: "center",
                width: "100%",
                justifyContent: "center",

                backgroundColor: "#F5F5F5",
              },

              textInput: {
                backgroundColor: "#F5F5F5",
              },

              predefinedPlacesDescription: {
                color: "red",
              },
              listView: {
                paddingHorizontal: 1,
                paddingVertical: 55,
              },
              description: {
                fontWeight: "700",
                letterSpacing: 0.5,
                color: "#5d5d5d",
              },
            }}
          />
        </View>

        <View
          style={[
            tw("flex-row items-center"),
            { width: "87%", left: 37, position: "absolute", top: 100 },
          ]}
        >
          <GooglePlacesAutocomplete
            nearbyPlacesApi="GooglePlacesSearch"
            placeholder="Where to?"
            onPress={(data, details = null) => {
              const position = {
                latitude: details?.geometry.location.lat || 0,
                longitude: details?.geometry.location.lng || 0,
              };

              setDestination(position);

              moveTo(position);

              onMapReadyHandler();
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: process.env.GOOGLE_API_KEY,
              language: "en",
            }}
            nearbyPlacesAPI="GoogleReverseGeocoding"
            styles={{
              textInputContainer: {
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                backgroundColor: "#F5F5F5",
              },

              textInput: {
                backgroundColor: "#F5F5F5",
              },

              predefinedPlacesDescription: {
                color: "red",
              },
              listView: {
                paddingHorizontal: 1,
                paddingVertical: 1,
              },
              description: {
                fontWeight: "700",
                letterSpacing: 0.5,
                color: "#5d5d5d",
              },
            }}
          />

          <TouchableOpacity>
            <Entypo name="plus" size={30} style={tw("")} />
          </TouchableOpacity>
        </View>
      </View>

      <MapView
        ref={mapRef}
        provider={Platform.OS === "ios" ? PROVIDER_DEFAULT : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ flex: 1, height: "100%", width: "100%", borderRadius: 10 }}
        // mapType="mutedStandard"
        initialRegion={{
          latitude: 50.0755,
          longitude: 14.4378,
          latitudeDelta: 0.0142,
          longitudeDelta: 0.00121,
        }}
        moveOnMarkerPress={true}
      >
        {origin && <Marker identifier={"mk1"} coordinate={origin}></Marker>}

        {destination && (
          <Marker identifier={"mk2"} coordinate={destination}></Marker>
        )}

        {origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={process.env.GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            lineDashPattern={[0]}
            onReady={traceRoute}
          />
        )}
      </MapView>

      <TouchableOpacity
        disabled={!origin || !destination}
        onPress={() =>
          navigation.navigate("Map", {
            origin,
            destination,
            distance,
            duration,
          })
        }
        style={[
          tw("items-center bg-black justify-center mx-5 absolute bottom-5"),
          { width: 350, height: 50 },
        ]}
      >
        <Text style={[tw("font-bold text-lg text-white")]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetMap;

const styles = StyleSheet.create({});
