import * as React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Constants from 'expo-constants';
import { StackActions, NavigationActions } from 'react-navigation';

import Splash from './Splash';

export default class HomeScreen extends React.Component {

  componentDidMount() {
    AsyncStorage.multiSet([['recipient', '']]);
  }

  render() {
    return (
      <View style={styles.container}>
        <Splash />
        <Button
          style={styles.button}
          title="TD Login"
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'TDLogin' })],
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
    backgroundColor: '#FA9153',
    padding: 32,
  },
});
