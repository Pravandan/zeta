import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';

const window = Dimensions.get('window');

export class Receipt extends Component<{}> {


static navigationOptions = {
    title: 'Receipt',
    
  }

  render() {
    return (
      <View style={{backgroundColor:'#21232F',height:window.height}}>
        <View style={{alignItems:'center',paddingTop:10}}>
          <Text style={{fontSize:20,color:'white'}}>RECEIPT</Text>
        </View>

        <View style={{paddingTop:10,backgroundColor:'#1EB774',margin:20,borderRadius:4,alignItems:'center',marginTop:100}}>

            <Text style={{color:'white',fontSize:16,paddingTop:0,fontWeight:'bold'}}>TRANSACTION SUCCESSFULL</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:18,fontWeight:'bold'}}>Big Bazaar</Text>

            <Text style={{color:'#333',paddingTop:5,fontSize:14}}>10:05 AM , 10 AUGUST, 2017</Text>

            <Text style={{color:'#333',paddingTop:25,fontSize:18,paddingBottom:20}}>Paid Using Debit Card</Text>

            <View style={{flex:1,backgroundColor:'#E94C3D',paddingTop:10,paddingBottom:50,width:window.width-40,alignItems:'center',borderRadius:4}}>
                <Text style={{color:'white',paddingTop:0,fontSize:28}}>Rs. 123</Text>
            </View>
          
        </View>


      </View>
    );
  }
}

