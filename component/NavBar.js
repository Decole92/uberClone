import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import tw from 'tailwind-rn'
import { useNavigation } from '@react-navigation/native'


const NavBar = () => {

  const navigation = useNavigation();

  return (
    <View style={tw("flex-row justify-between my-5 mx-4")}>

<TouchableOpacity onPress={() => navigation.navigate('Set')} style={[tw("bg-gray-100 items-center rounded-xl"), {width:112, height:100}]}>

     <Image 
     resizeMode="contain"
     style={{width:120, height:60}}
     source={{uri:"https://links.papareact.com/3pn"}} />

     <Text style={[tw("font-semibold text-black pt-3 text-sm"), {fontSize:14, color:"#000000"}]}>Ride</Text>
      </TouchableOpacity>


<TouchableOpacity style={[tw("bg-gray-100 items-center rounded-xl"), {width:112, height:100}]}>
<Image 
resizeMode="contain"
style={{width:100, height:50, marginTop:10}}
source={require("../assets/all-scooter.png")} />

<Text style={[tw("font-semibold text-black pt-3 text-sm"), {fontSize:14, color:"#000000"}]}>2-Wheels</Text>
 </TouchableOpacity>


 <TouchableOpacity style={[tw("bg-gray-100 items-center rounded-xl"), {width:112, height:100}]}>

 <Image 
    style={{width:60, height:50, marginTop:15}}
    source={require("../assets/calender.png")}/>



<Text style={[tw("font-semibold text-black pt-1.5 text-sm"), {fontSize:14, color:"#000000"}]}>Reserve</Text>
 </TouchableOpacity>




    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({})