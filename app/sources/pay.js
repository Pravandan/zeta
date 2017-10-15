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

import {NewTransaction,ConfirmTransaction} from '../actions/api';

const window = Dimensions.get('window');

export class Pay extends Component<{}> {

  constructor(props){
    super(props);
    this.state={
          pendingPayment : false,
          merchantName : '',
          amount : 0,
          paid : false,
          token : '',
    }
   
   this.updateNewTrans = this.updateNewTrans.bind(this);
   this.generateReceipt = this.generateReceipt.bind(this);
   this.refreshIntervalId = ''; 
  }

  componentWillMount(){
    this.setState({
      pendingPayment : false,
          merchantName : '',
          amount : 0,
          paid : false,
          timeCreated : '',
          userMobile : '',
    })
    let transID =  NewTransaction().then(responseObj => this.updateNewTrans(responseObj)).catch();

    if(!this.state.pendingPayment){
      this.refreshIntervalId =  setInterval(() => {this.fetchPaymentAPICall()},100);
    }

    this.getUserMobile();

  }


  async getUserMobile(){
    const value = await AsyncStorage.getItem('userMobile').then(userMobile => this.setUserMobile(userMobile)).catch();
  }

  setUserMobile(userMobile){
    this.setState({
      userMobile : userMobile,
    });
  }


  fetchPaymentAPICall(){
      let transID =  NewTransaction(this.state.userMobile).then(responseObj => this.updateNewTrans(responseObj)).catch();
  }

  updateNewTrans(responseObj){
    console.log(responseObj);
    if(responseObj.success){
      this.setState({
        pendingPayment : true,
        paid : false,
        merchantName : responseObj.merchantName,
        token : responseObj.token,
        amount : responseObj.amount,
      });
    }
  }

  completePayment(){
    let temp = ConfirmTransaction(this.state.token).then(responseObj => this.generateReceipt(responseObj)).catch();
  }

  generateReceipt(responseObj){
    this.setState({
      paid: true,
    })
  }

  static navigationOptions = {
    title: 'Pay',
  }

  render() {
    return (
      <View style={{backgroundColor:'#633ea5',height:window.height}}>

      
        
          <View style={{alignItems:'center'}}>
            <Text style={{color:'white',paddingTop:10,fontSize:24}}>PAY</Text>
          </View>

        {!this.state.pendingPayment &&

          <View style={{alignItems:'center'}}>

          <Image source={require('../../assets/images/embarrassed.png')} style={{height:150,width:150,paddingBottom:20,top:100}}/>

          <Text style={{color:'white',paddingTop:10,fontSize:18,top:120}}>Hey, It looks like you don't</Text>  
          <Text style={{color:'white',paddingTop:0,fontSize:18,top:120}}>have any pending payments</Text>  

        </View>
      }

      {this.state.pendingPayment && !this.state.paid &&

          <View style={{alignItems:'center'}}>
            <Text style={{color:'white',fontSize:16,paddingTop:100}}>{this.state.merchantName} is requesting payment</Text>

            <TouchableOpacity style={{margin:40,padding:10,backgroundColor:'#17e209',alignItems:'center',width:window.width-120,borderRadius:6}} onPress={() => this.completePayment()}>

                <Text style={{fontSize:18}}>ACCEPT</Text>

            </TouchableOpacity>
          </View>

      }

      {this.state.paid &&

        <View>
        
        <View style={{alignItems:'center'}}>
            <Text style={{color:'#17e209',fontSize:18,paddingTop:10,fontWeight:'bold'}}>Your payment is successfull</Text>
            <Text style={{color:'white',fontSize:16,paddingTop:10,fontWeight:'bold'}}># {this.state.token}</Text>
          </View>



        <View style={{paddingTop:40,paddingLeft:30}}>
          <Text style={{color:'white',fontSize:24}}>Big Bazaar Inc</Text>
          <Text style={{color:'white',fontSize:12,paddingTop:10}}>10:05 AM, 25 AUGUST, 2017</Text>
          <Text style={{color:'white',fontSize:18,paddingTop:10}}># {this.state.token}</Text>
          <Text style={{color:'white',fontSize:18,paddingTop:30}}>AMOUNT - {this.state.amount}</Text>

           <Text style={{color:'white',fontSize:18,paddingTop:10}}>TAX - 15.66</Text>
            <Text style={{color:'white',fontSize:18,paddingTop:15}}>TOTAL- {this.state.amount}</Text>
          <Text style={{color:'white',fontSize:14,paddingTop:40,paddingLeft:34}}>This receipt is generated by Zeta Inc.</Text>
        </View>


        </View>
      }

      </View>
    );
  }
}

