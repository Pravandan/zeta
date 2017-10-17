import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  AsyncStorage
} from 'react-native';

import {SubModalStack} from '../config/routes';

import {NewTransaction,ConfirmTransaction,AuthLogin} from '../actions/api';

const window = Dimensions.get('window');

export class SwitchHome extends Component<{}> {

  constructor(props){
    super(props);

    this.state={
      userMobile : '',
      rewards : 0,
      refreshRewardsIntervalID : '',
    }

    this.setUserMobile = this.setUserMobile.bind(this);
    this._updateRewards = this._updateRewards.bind(this);
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

    let temp = AuthLogin(this.state.userMobile).then(responseObj => this._updateRewards(responseObj)).catch();

    this.state.refreshRewardsIntervalID =  setInterval(() => {this._callUpdateRewards()},1000);

  }

  _callUpdateRewards(){
     let temp = AuthLogin(this.state.userMobile).then(responseObj => this._updateRewards(responseObj)).catch();
  }

  _updateRewards(responseObj){
    this.setState({
      rewards : responseObj.rewards,
    });
  }


  componentDiDMount(){

  }


  fetchPendingPayment(){

  }

  static navigationOptions = {
    title: 'SwitchHome',

  }

  render() {
    return (
      <View style={{backgroundColor:'#633ea5',height:window.height,alignItems:'center'}}>
        <View style={{top:50,alignItems:'center',flexDirection:'row',backgroundColor:'#4c2e82',borderRadius:4}}>
            <TouchableOpacity style={{padding:20}} onPress={() => this.props.navigation.navigate('Pay')}>
              <Image source={require('../../assets/images/22500722_1608921872492156_281082674_n.png')} onPress={() => this.props.navigation.navigate('Pay')} style={{height:50,width:50}}/>
              <Text style={{color:'white',paddingLeft:6}} >Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:20}} onPress={() => this.props.navigation.navigate('Request')}>
              <Image source={require('../../assets/images/22538029_1608921882492155_295088226_n.png')} onPress={() => this.props.navigation.navigate('Pay')}  style={{height:50,width:50,paddingBottom:20}}/>
              <Text style={{color:'white',paddingLeft:-10}}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingLeft:20,paddingRight:10}} onPress={() => this.props.navigation.navigate('Passbook')}>
              <Image source={require('../../assets/images/22538178_1608921862492157_63247476_n.png')} onPress={() => this.props.navigation.navigate('Pay')} style={{height:50,width:50,paddingBottom:20}}/>
              <Text style={{color:'white',paddingLeft:0}}>Passbook</Text>
            </TouchableOpacity>
        </View>

        <Image source={require('../../assets/images/rbl-zeta-rupay.17589d71.png')}  style={{top:80,height:180,width:300}}/>

        <View style={{top:window.height-430}}>
        <Text style={{paddingLeft:0,fontSize:16,paddingBottom:5,color:'white'}}>Total Rewards - Rs. {this.state.rewards}</Text>
        <View style={{backgroundColor:'#17e209',padding:6,width:window.width-60,borderRadius:4}}>
              <Text style={{color:'#333'}}>CASHCARD PLUS</Text>
        </View>
        </View>
      </View>
    );
  }
}

