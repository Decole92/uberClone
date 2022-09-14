import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native'

import React, {useState, useRef, useCallback, useEffect} from 'react'

import tw from 'tailwind-rn'
import  MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import MapViewDirections from 'react-native-maps-directions'
import envs from '../config/env'


const Mapy = ({origin, destination}) => {

const mapRef = useRef();






const onMapReadyHandler = useCallback(() => {
  if (Platform.OS === 'ios') {
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
  
  
  return (



  <MapView
ref={mapRef}


provider={ Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE } // remove if not using Google Maps
style={{flex: 1, height: '100%', width: '100%', borderRadius: 10, }} 
// mapType="mutedStandard"
initialRegion={{
  latitude:50.0755,
  longitude:14.4378,
  latitudeDelta: 0.0142,
  longitudeDelta: 0.00121,
}}

onMapLoaded={onMapReadyHandler}
onMapReady={onMapReadyHandler}


 >

{

  origin && <Marker 

  coordinate={origin}>
 
 
  </Marker>


}

{

destination && <Marker 

coordinate={destination}>


</Marker>


}



{ origin && destination && <MapViewDirections 
origin={origin}
destination={destination}
apikey={process.env.GOOGLE_API_KEY}
strokeColor="#6644ff"
strokeWidth={4}


/>


 }


 </MapView>

  )
  }


export default Mapy

const styles = StyleSheet.create({


})