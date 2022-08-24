import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

import { TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';

import { SliderBox } from 'react-native-image-slider-box';




export class Slider extends React.Component {
    constructor(props) {
   super(props);
   this.state = {
     images: [
       require('../assets/uber1.jpg'),
       require('../assets/uber2.jpg'),
       require('../assets/uber3.png'),
       require('../assets/show.png'),
       require('../assets/uber4.png'),
     ]
   };
 }

render(){
return (
<View style={[tw("bg-white"), {width:"100%" }]}>

   <SliderBox images={this.state.images} 
   sliderBoxHeight={150}
   
   dotColor="white"
   inactivedotColor="red"

   ImageComponentStyle={{borderRadius:15, marginTop:20, marginRight:2, marginLeft:2, width: '92%', }}
   imageLoadingColor="#2196F3"
   />
   
 </View>
)

}}



export default Slider;

