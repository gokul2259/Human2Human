import * as React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { StackActions, NavigationActions } from 'react-navigation';
import Splash from './Splash';

export default class SplashScreen extends React.Component {
  async componentDidMount() {
    await AsyncStorage.clear();
    await AsyncStorage.multiSet([['recipient', '']]);

    // redirect to QRScanner if already logged in
    const sender = await AsyncStorage.getItem('sender');
    if (sender) {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'QRScanner' })],
        })
      );
    }
     const redirectToQRScanner = () =>
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'QRScanner' })],
        })
      );

    const redirectToLogin = () =>
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TDLogin' })],
        })
      );

    // redirect to QRScanner if already logged in
    if (sender) {
      setTimeout(redirectToQRScanner, 1500)
    } else {
      setTimeout(redirectToLogin, 1500)
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Splash />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FA9153',
    padding: 32,
  },
});
