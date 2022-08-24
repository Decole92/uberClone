import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-rn';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {  Feather, Ionicons, MaterialCommunityIcons } from "react-native-vector-icons"

const SearchBar = () => {

    const navigation = useNavigation();

  return (
    <View style={[tw("flex-row justify-between bg-gray-100 items-center rounded-full mx-4"), {width:"92%", height:60}]}>

        <TouchableOpacity  onPress={() => navigation.navigate('Set')} style={tw("flex-row items-center pl-5")}>
     <Feather name="search" size={30} color="#000000" />

     <Text style={tw("justify-center pl-5 text-xl")}>Where to?</Text>
     </TouchableOpacity>

     <TouchableOpacity style={[tw("flex-row items-center rounded-full px-5 bg-white mr-5"), {height:38, width:115}]}>
       <Ionicons name="ios-time-sharp" size={20}/><Text style={tw("text-black ")}> Now </Text>
<Ionicons name="ios-chevron-down-sharp" size={20} />
     </TouchableOpacity>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})