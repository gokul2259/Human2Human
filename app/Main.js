import { createAppContainer, StackActions, NavigationActions, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

import HomeScreen from './components/HomeScreen'
import TDLoginScreen from './components/TDLoginScreen'
import QRScanner from './components/QRScanner'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  TDLogin: {
    screen: TDLoginScreen,
  },
  QRScanner: {
    screen: QRScanner,
  }
}, {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
