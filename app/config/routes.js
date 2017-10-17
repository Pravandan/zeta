import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import {Splash} from '../sources/splash';
import {Home} from '../sources/home';
import {IntroHome} from '../sources/mainIntro';
import {Pay} from '../sources/pay';
import {Request} from '../sources/request';
import {Passbook} from '../sources/passbook';
import {Profile} from '../sources/profile';
import {Offers} from '../sources/offers';
import {SwitchHome} from '../sources/switchHome';
import {Receipt} from '../sources/receipt';

export const ModalStack = StackNavigator({
  Splash:{
  	screen:Splash,
  },
  Home : {
  	screen : Home,
  },
},

	{headerMode:'none'}

);

export const SubModalStack  = StackNavigator({
  SwitchHome : {
  	screen : SwitchHome
  },
  Pay : {
  	screen : Pay,
  },
  Request : {
  	screen : Request,
  },
  Passbook : {
  	screen : Passbook,
  },
  Receipt : {
    screen : Receipt,
  }
},

	{headerMode:'none'}

);

export const Tabs = TabNavigator({
   IntroHome: {
    screen: IntroHome,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Text>Home</Text>,
    },
  },
  
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Text>Profile</Text>,
    },
  },
  Offers: {
    screen: Offers,
    navigationOptions: {
      tabBarLabel: 'Offers',
      tabBarIcon: ({ tintColor }) => <Text>Offers</Text>
    },
  },
},
	
{	
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'white',
    labelStyle: {
      fontFamily: 'Montserrat-Regular',
  },
     style: {
    backgroundColor: '#21232F',
    fontFamily: 'Montserrat-Regular'
  },
  },
}

);
