import {
  createAppContainer,
  createStackNavigator
} from "react-navigation"; // Version can be specified in package.json

import QRScanner from './components/QRScanner'
import SplashScreen from "./components/SplashScreen";
import TDLoginScreen from "./components/TDLoginScreen";
import Donate from "./components/Donate";
import DonationSent from "./components/DonationSent";

const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen
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
    initialRouteName: 'SplashScreen',
    mode: 'modal',
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
