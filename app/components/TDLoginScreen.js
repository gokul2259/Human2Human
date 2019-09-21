import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { StackActions, NavigationActions } from 'react-navigation';

import Splash from './Splash';

export default class TDLoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={styles.text}>Login with TD</Text>
        <Button
          buttonStyle={styles.button}
          title="Login"
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
              })
            );
          }}
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
    color: "#1f5237",
  },
  button: {
    backgroundColor: '#1c8911',
  }
});
