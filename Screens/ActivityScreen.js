import { StatusBar, Image, StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native'
import React, {useState, useCallback, useRef} from 'react'
import tw from 'tailwind-rn'
import {MaterialCommunityIcons, MaterialIcons, Ionicons, Entypo} from 'react-native-vector-icons'
import { History } from '../Dummy/History'
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import { ScrollView } from 'react-native'



const ActivityScreen = () => {

const mapRef = useRef();

const [origin, setOrigin] = useState({ latitude:50.0810, longitude:14.4280});
const [destination, setDestination] = useState({latitude:50.0694024772, longitude:14.3015465873})

const onMapReadyHandler = useCallback(() => {
  if (Platform.OS === 'ios') {
    mapRef?.current?.fitToElements(false);
  } else {
    mapRef?.current?.fitToCoordinates([origin, destination], {
      animated: true,
      edgePadding: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 20,
      },
    });
  }
}, [origin, destination]);

  return (


    <View style={tw("flex-1 bg-white h-full w-full")}>
     <ScrollView>


      <Text style={tw("text-3xl font-semibold py-4 px-5 text-black")}>Activity</Text>
      <Text style={tw("text-lg py-2 px-5")}>Upcoming</Text>

     <TouchableOpacity style={[tw("flex-row mx-4 border-2 rounded-xl border-gray-200 justify-between  px-4 pt-2"), {height:80}]}>
      <View>
      <Text style={tw("text-xl text-gray-500 ")}>You have no upcoming trips</Text>
       <Text style={tw("text-black text-sm font-semibold pt-1 items-center justify-center")}>Reserve your ride <MaterialCommunityIcons name="arrow-right" size={15} /></Text>
     </View>

    <Image 
    style={{width:60, height:50}}
    source={require("../assets/calender.png")}/>
     </TouchableOpacity>


    <Text style={tw("px-5 mt-5 text-lg pb-2 font-semibold")}>Past</Text>

    <TouchableOpacity style={[tw("border-2 border-gray-200 rounded-xl mx-4"), {height:330}]}>

    <View style={[tw("mx-4 my-4"), {height:200, borderRadius:20}]}>
     <MapView
      ref={mapRef}
      
      
      provider={ Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE } // remove if not using Google Maps
      style={{flex: 1, height: '100%', width: '100%', borderRadius:20, }} 
      // mapType="mutedStandard"
      initialRegion={{

        latitude: 50.0755,
        longitude: 14.4378,
         latitudeDelta: 0.0142,
        longitudeDelta: 0.00121,
      }}
      
     onMapLoaded={onMapReadyHandler}
      onMapReady={onMapReadyHandler}
       >
      
      {

origin && <Marker 

coordinate={origin}>

<Image 
style={{width:20, height:20}}
source={require("../assets/dot.png")} />
</Marker>


} 
      
{

destination && <Marker 

coordinate={destination}>
<Image 
style={{width:20, height:20}}
source={require("../assets/dot.png")} />

</Marker>

}
     
{ origin && destination && <MapViewDirections 
origin={origin}
destination={destination}
apikey={process.env.GOOGLE_API_KEY}
strokeColor="#36454F"
strokeWidth={3}

/>
}

      
      
       </MapView>

 

    </View>

<Text style={tw("px-3 text-lg font-semibold")}> Na moklině 289/16, Řepy </Text>
<Text style={tw("px-4 text-gray-400 ")}>Aug 20 <Entypo name="dot-single" size={10}/> 5:53 PM</Text>
<Text style={tw("px-4 text-gray-400 pt-1")}>CZK350.40</Text>
   

   </TouchableOpacity>



<FlatList 


 data={History}
 ItemSeparatorComponent={() => (

  <View
   style={{
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    left:80,
     }}/>
 )}
 keyExtractor={(item) => item.id}
 renderItem={({item: {address, date, time, price}}) => (

<TouchableOpacity style={tw("flex-row justify-between items-center my-7 mx-5")}>

  <View style={tw("bg-gray-100 items-center rounded-xl")}>
    
<Ionicons name="time" style={{top:10,position:"absolute", right:25}} size={15} />
  <Image 
     resizeMode="contain"
     style={{width:80, height:60, paddingTop:10}}
     source={{uri:"https://links.papareact.com/3pn"}} />

  </View>

<View style={tw("-ml-14")}>
<Text>{address}</Text>
<Text style={tw("text-gray-400 ")}>{date}<Entypo name="dot-single" size={10}/>{time}</Text>
<Text style={tw(" text-gray-400 pt-1")}>{price}</Text>

</View>

<MaterialIcons name="chevron-right" color="#D3D3D3" size={30}/>

</TouchableOpacity>

)}
></FlatList>

     
     </ScrollView>
     
  

    </View>
  )
}

export default ActivityScreen

const styles = StyleSheet.create({})