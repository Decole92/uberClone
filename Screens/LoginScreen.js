import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-rn';
import PhoneInput from "react-native-phone-number-input";
import { AntDesign } from "react-native-vector-icons"


import useAuth from '../hook/useAuth';



const LoginScreen = () => {

    const {
      loading,
      promptAsyncFacebook,
      promptAsyncGoogle
       
       } = useAuth();

    

    const [phoneNumber, setPhoneNumber] = useState();

  return (

    <SafeAreaView style={tw("flex-1")}>



<Text style={tw("text-lg pt-12 pl-5 text-black")}>Enter your mobile number</Text>
      
       
   


<PhoneInput 

//autoFocus
defaultCode="CZ"
placeholder='Mobile Number'
style={tw("border-black")}
value={phoneNumber}
onChangeText={setPhoneNumber}
keyboardType="numeric"
containerStyle={[tw("bg-gray-200 mx-5 my-7"), {width:"90%"}]}
textContainerStyle={{textColor:"black", borderColor:"black", fontSize:"bold"}}

/>


 <View style={tw("items-center")}>

<TouchableOpacity style={[tw("flex-row items-center justify-between bg-black p-2"), {height:60, width:"90%"}]}>
  
<Text></Text> 
 <Text style={[tw("text-lg text-white justify-center font-bold"), { paddingRight:60, paddingLeft:40 }]}>Next</Text>
 <Text><AntDesign name="arrowright" size={30} style={[tw("justify-center"), {color:"white"}]} /></Text>
       
 </TouchableOpacity>  

 </View>


<Text style={tw("px-5 py-8 text-gray-500")}>By proceeding, you consent to get calls, WhatsApp, SMS messages, including by automated means, from Uber and it's affiliates to the number provided.</Text>
<View style={tw("flex-row px-5 justify-center items-center")}>

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    left: 5,
    right:5,
    width:"45%",
  }}
/>

<Text style={tw("pl-3 text-gray-500")}>Or</Text>

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width:"45%",
    left: 5,
    right:5
  }}
/>

</View>

    <TouchableOpacity  onPress={() => promptAsyncFacebook({showInRecents:true})} style={[tw("flex-row items-center justify-between border mt-5 mb-3 mx-5"), {width:"90%", height:50}]}>

    <Image source={require("../assets/fb.png")} resizeMode="contain"
   style={[tw(" px-5"), { width:25, height:25 }]} />
 <Text style={tw("text-lg text-black font-bold")}>Continue with Facebook</Text>
        <Text></Text>
    
    </TouchableOpacity>

    <TouchableOpacity  onPress={() => promptAsyncGoogle({showInRecents:true})} style={[tw("flex-row items-center justify-between border mx-5"), {width:"90%", height:50}]}>

<Image source={require("../assets/google.png")} resizeMode="contain"
style={[tw(" px-5"), { width:25, height:25 }]} />
<Text style={tw("text-lg text-black font-bold")}>Continue with Google</Text>
    <Text></Text>

</TouchableOpacity>





<Text style={tw("absolute bottom-10 items-center mx-5 text-black text-center")}>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</Text>








    </SafeAreaView>


  )
}

export default LoginScreen

const styles = StyleSheet.create({})