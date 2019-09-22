import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';

import Splash from './Splash';
import { colorVars } from '../constants';
import { get } from '../utils/apiHelper';

export default class DonationSent extends React.Component {
  onFindOthers = async () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'QRScanner' })],
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text h1 style={styles.text}>
            Donation Sent
          </Text>
          <Image
            resizeMode={'contain'}
            style={styles.icon}
            source={require('../../assets/money-envelope.png')}
          />
          <Text h4 h4Style={{fontSize: 16}}>
            On behalf of all of us at Human 2 Human, thank you for your donation. Your donation will help those in need to build a stronger
            community.
          </Text>
        </View>
        <Button
          buttonStyle={styles.button}
          title="Find others in need"
          onPress={this.onFindOthers}
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
    backgroundColor: colorVars.appColor,
    padding: 32,
  },
  text: {
    textAlign: 'center',
    color: colorVars.primaryColor,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colorVars.primaryColor,
  },
  icon: {
    width: '100%',
    height: 100,
    marginBottom: 32,
  },
});
