import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  AsyncStorage
} from 'react-native';

import {AllTransactions} from '../actions/api';

const window = Dimensions.get('window');

export class Passbook extends Component<{}> {


  static navigationOptions = {
    title: 'Passbook',
    
  }

  constructor(props){
    super(props);
    this.state={
      userMobile : '',
      allTrans : [],
      transUpdateDone : false,
    }

    this.setUserMobile = this.setUserMobile.bind(this);
    this._updatePassbook = this._updatePassbook.bind(this);
  }

  componentWillMount(){



    this.getUserMobile();
    
  }

   async getUserMobile(){
    const value = await AsyncStorage.getItem('userMobile').then(userMobile => this.setUserMobile(userMobile)).catch();
  }

  setUserMobile(userMobile){
    this.setState({
      userMobile : userMobile,
    });
    this._getAllTransactions();
  }


  _getAllTransactions(){

    let temp = AllTransactions(this.state.userMobile).then(responseObj => this._updatePassbook(responseObj)).catch();
  }

  _updatePassbook(responseObj){

    let tempResponseObj = responseObj.creditObjects.length;

    for(var i=0;i<tempResponseObj;i++){
      let parAmount = responseObj.creditObjects[i].amount;
      let parMerchantName = responseObj.creditObjects[i].merchantName;
      this.state.allTrans.push(
           <TouchableOpacity style={{margin:10,backgroundColor:'#F65224',borderRadius:40}} onPress={() => this.props.navigation.navigate('Receipt')}>
            <Text style={{color:'white',fontSize:16,paddingLeft:20,paddingTop:10,paddingBottom:0}}>{parMerchantName}</Text>
            <Text style={{position:'absolute',color:'white',fontSize:18,paddingLeft:240,paddingTop:10,paddingBottom:10,fontWeight:'bold'}}>DEBIT (-)</Text>
            <Text style={{color:'white',fontSize:12,paddingLeft:20,paddingTop:10,paddingBottom:10}}>10:57 AM , 15 AUGUST, 2017</Text>
            <Text style={{position:'absolute',color:'white',fontSize:14,paddingLeft:240,paddingTop:40}}>Rs. {parAmount}</Text>
          </TouchableOpacity>
        )
      this.setState({
        transUpdateDone : true,
      });
    }

  }

  render() {
    return (
      <View  style={{backgroundColor:'#21232F',height:window.height}}>
        <View style={{alignItems:'center'}}>
            <Text style={{color:'white',paddingTop:16,fontSize:20}}>PASSBOOK</Text>
          </View>

        <ScrollView style={{paddingTop:16}}>
          
          {this.state.allTrans}
        </ScrollView>
      </View>
    );
  }
}

