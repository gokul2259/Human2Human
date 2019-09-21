import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, StackActions, NavigationActions, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './components/HomeScreen'
import TDLoginScreen from './components/TDLoginScreen'

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  TDLogin: {
    screen: TDLoginScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);
