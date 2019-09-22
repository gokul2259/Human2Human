import {
  createAppContainer,
  createStackNavigator
} from "react-navigation"; // Version can be specified in package.json

import QRScanner from './components/QRScanner'
import HomeScreen from "./components/HomeScreen";
import TDLoginScreen from "./components/TDLoginScreen";
import Donate from "./components/Donate";
import DonationSent from "./components/DonationSent";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    TDLogin: {
      screen: TDLoginScreen
    },
    DonateFund: {
      screen: Donate,
    },
    QRScanner: {
      screen: QRScanner,
    },
    DonationSent: {
      screen: DonationSent,
    }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
