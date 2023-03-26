import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";

const data = [
  {
    id: "1",
    icon: "home",
    location: "Home",
    destination: "Na Moklině 627/5, Prague 17, Czechia",
  },

  {
    id: "3",
    icon: "briefcase",
    location: "Work",
    destination: "Moskevská 515, Prague 10-Vršovice, Czechia",
  },
  {
    id: "4",
    icon: "church",
    location: "Church",
    destination:
      "Church of Our Lady Victorious and The Infant Jesus of Prague, Malá Strana, Prague 1, Czechia",
  },
];

const Note = () => {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => (
        <View
          style={{
            borderBottomColor: "#D3D3D3",
            borderBottomWidth: 1,
            left: 80,
          }}
        />
      )}
      keyExtractor={(item) => item.id}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity>
          <View style={tw("flex-row items-center justify-between px-5 py-5")}>
            <View style={tw("flex-row items-center")}>
              <View
                style={[
                  tw("bg-gray-100 rounded-full items-center justify-center"),
                  { width: 40, height: 40 },
                ]}
              >
                <FontAwesome5 name={icon} size={20} />
              </View>
              <View style={tw("px-5")}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[tw("text-lg font-semibold"), { width: 215 }]}
                >
                  {location}
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{ color: "gray", width: 220 }}
                >
                  {destination}
                </Text>
              </View>
            </View>

            <MaterialIcons name="chevron-right" size={30} color="#D3D3D3" />
          </View>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

export default Note;

const styles = StyleSheet.create({});
