import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import WriteScreen from './screens/writeScreen';
import ReadScreen from './screens/readScreen';
import Login from './screens/loginScreen';

export default class App extends React.Component{
  render(){
    return(
        <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Read: {screen: ReadScreen},
  Write: {screen: WriteScreen}
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      if(routeName == "Read"){
      return(
        <Image
         source = {require('./assets/read.png')}
         style = {{width: 40, height: 40}}
        />
      )
    }
    else if(routeName == "Write"){
      return(
        <Image
         source = {require('./assets/write.png')}
         style = {{width: 40, height: 40}}
        />
      )
    }
   }
  })
}
)

const SwitchNavigator = createSwitchNavigator({
  Login: {screen: Login},
  TabNavigator: {screen: TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);