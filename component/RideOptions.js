import { StyleSheet, Image, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import { cars } from "../Dummy/Cars";
import useAuth from "../hook/useAuth";
import "intl";
import "intl/locale-data/jsonp/de";

export const RideOptions = ({ distance, duration }) => {
  const convertMinsToTime = (duration) => {
    let hours = Math.floor(duration / 60);
    let minutes = duration % 60;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}hrs ${minutes?.toFixed(0)}mins`;
  };

  const CHARGE_RATE = 0.5;
  const { setSelected, selected } = useAuth();
  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { id, title, multiplier, image }, item }) => (
        <TouchableOpacity
          onPress={() => setSelected(item)}
          style={[
            id === selected?.id && tw("bg-gray-200"),
            tw("flex-row justify-between items-center  px-5"),
          ]}
        >
          <Image
            source={{ uri: image }}
            resizeImage="contain"
            style={{ width: 100, height: 80 }}
          />

          <View style={tw("-ml-20")}>
            <Text style={tw(" font-semibold ")}>{title}</Text>
            <Text numberOfLines={1} style={[tw("")]}>
              {convertMinsToTime(duration)}
            </Text>
          </View>

          <View>
            <Text style={tw("font-semibold")}>
              {new Intl.NumberFormat("cs-CZ", {
                style: "currency",
                currency: "CZK",
              }).format(duration * CHARGE_RATE * multiplier * 25)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default RideOptions;
const styles = StyleSheet.create({});
