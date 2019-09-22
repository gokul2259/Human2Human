import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, SocialIcon } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";
import { ActivityIndicator, AsyncStorage } from "react-native";
import Constants from "expo-constants";

import Splash from "./Splash";
import { getNonAsync } from "../utils/apiHelper";

import { colorVars } from "../constants";

export default class TDLoginScreen extends React.Component {
  state = {
    fetchingCustomer: false
  };

  onLogin = () => {
    // TODO: Authenticate with TD or fill out a form, submit to our backend
    // to get the corresponding custId needed for TD's API
    const custId = "f6c73e41-81ba-428b-96d5-fcdf2216d54c";

    const redirectToQRScanner = () => {
      this.setState({ fetchingCustomer: false });
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "QRScanner" })]
        })
      );
    };

    this.setState({ fetchingCustomer: true });

    const api = `api.td-davinci.com/api/customers/${custId}`;
    getNonAsync(api)
      .then(response => {
        // save in app state
        AsyncStorage.setItem("sender", JSON.stringify(response.result));
        // go to QRScanner
        setTimeout(redirectToQRScanner, 1000);
      })
      .catch(exception => {
        alert(`Failed to login, please try again`);
      })
      .then(() => {
        //this.setState({ fetchingCustomer: false });
      });
  };

  render() {
    const { fetchingCustomer } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text h2 style={styles.text}>
            Login
          </Text>
          <Text h4>
            You can log in with TD if you bank with TD or you can log in with
            social media.
          </Text>
        </View>
        {(fetchingCustomer && (
          <ActivityIndicator size="large" color={colorVars.primaryColor} />
        )) || (
          <View>
            <SocialIcon
              iconSize={0}
              title="TD Login"
              onPress={this.onLogin}
              disabled={fetchingCustomer}
              type="medium"
              button
            />
            <SocialIcon title="Facebook" button type="facebook" />

            <SocialIcon title="Twitter" button type="twitter" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colorVars.appColor,
    padding: 32
  },
  text: {
    textAlign: "center",
    color: colorVars.primaryColor,
    marginBottom: 64
  }
});
