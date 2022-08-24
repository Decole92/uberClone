import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-rn'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import cars from './cars'




const Around = () => {



  const getImage = (type) => {


    if(type === 'UberX'){
      
      
      return require("../assets/topuber-rm.png");
      
    }else if(type === 'Comfort'){
      
      return require("../assets/topcomfort-rm.png");
      

    }else{

      return require("../assets/topxl-rm.png")

    }
  }


  return (


   <View>



<Text style={tw("text-lg px-5 text-black text-lg pb-1")}>Around you</Text>

  
<View style={[tw("mx-5 my-5"), {height:300, 
                zIndex: -1, 
                borderRadius: 10, 
                borderWidth: 1, 
                borderColor: 'white', 
                backgroundColor:'gray',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                flex:1,
                }]}>


<MapView
   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    style={{flex:1, height:'100%', width:'100%', borderRadius:10, }}

     //mapType="mutedStandard"
        
          initialRegion={{
            latitude:50.0755,
            longitude:14.4378,
            latitudeDelta: 0.0142,
            longitudeDelta: 0.00121,
          }}
        
        
        >
    
{

cars.map((cars) => (

 <Marker 
 key={cars.id}
 coordinate={{latitude: cars.latitude, longitude: cars.longitude}}>

<Image
 style={{width:70, height:70, resizeMode:"contain"}}
 source={getImage(cars.type)}
/>

 </Marker>

  
))
}
 

   </MapView>


</View>
   


   </View>



  )
}

export default Around

const styles = StyleSheet.create({})