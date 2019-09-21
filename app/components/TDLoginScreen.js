import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

import Splash from './Splash';
import { get } from '../utils/apiHelper';

export default class TDLoginScreen extends React.Component {
  onLogin = async () => {
    try {
      // TODO: Authenticate with TD or fill out a form, submit to our backend
      // to get the corresponding custId needed for TD's API
      const custId = 'f6c73e41-81ba-428b-96d5-fcdf2216d54c';

      const api = `api.td-davinci.com/api/customers/${custId}`;
      const customer = await get(api);

      // save in app state
      AsyncStorage.setItem('sender', JSON.stringify(customer.result));
      // go to QRScanner
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'QRScanner' })],
        })
      );
    } catch (error) {
      // Error saving data
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={styles.text}>
          Login with TD
        </Text>
        <Button
          buttonStyle={styles.button}
          title="Login"
          onPress={this.onLogin}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f5f9f7',
    padding: 32,
  },
  text: {
    textAlign: 'center',
    color: '#1f5237',
  },
  button: {
    backgroundColor: '#1c8911',
  },
});
