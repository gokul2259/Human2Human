import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View
} from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { StackActions, NavigationActions } from "react-navigation";
import { colorVars, dimenstions, recipientsAvatar } from "../constants";
import { post } from "../utils/apiHelper";

export default class Donate extends React.Component {
  state = {
    recipient: {
      name: "",
      avatar: ""
    },
    submittingDonation: false,
    donationSuccessful: false
  };

  async componentDidMount() {
    const recipient = await AsyncStorage.getItem("recipient");
    const { givenName, gender, surname, totalIncome } = JSON.parse(recipient);
    const avatar =
      gender && gender === "Male"
        ? recipientsAvatar.male
        : recipientsAvatar.female;
    this.setState({
      recipient: {
        name: `${givenName} ${surname}`,
        avatar
      }
    });
  }

  transferFunds = async () => {
    const amount = 5;
    const currency = "CAD";

    const sender = await AsyncStorage.getItem("sender");
    const recipient = await AsyncStorage.getItem("recipient");

    const senderAccountId = "f6e2fe89-2f62-4213-a041-d9a9e6da632d";
    //const recipientAccountId = "c221770a-1b48-474a-8c3b-ba97585c406c";
    const recipientAccountId = await AsyncStorage.getItem("recipientAccountId");

    const api = `api.td-davinci.com/api/transfers`;
    const body = JSON.stringify({
      amount,
      currency,
      fromAccountId: senderAccountId,
      toAccountId: recipientAccountId
    });

    const options = { body };

    const redirectToDonationSent = () => {
      this.setState({ submittingDonation: false });
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "DonationSent" })]
        })
      );
    };

    this.setState({ submittingDonation: true });

    post(api, options)
      .then(response => {
        setTimeout(redirectToDonationSent, 2000);
      })
      .catch(exception => {
        alert(`Exception: ${JSON.stringify(exception)}`);
      })
      .then(() => {
        // this.setState({ submittingDonation: false });
      });
  };

  render() {
    const {
      recipient: { avatar, name },
      submittingDonation
    } = this.state;
    return (
      <View style={styles.container}>
        <Avatar
          rounded
          size={200}
          source={require("../../assets/avatar-male.png")}
          containerStyle={styles.avatar}
        />
        <Text h2 style={styles.text}>
          {name}
        </Text>
        {(submittingDonation && (
          <ActivityIndicator size="large" color={colorVars.primaryColor} />
        )) || (
          <Button
            buttonStyle={styles.button}
            title="Donate"
            onPress={this.transferFunds}
            disabled={submittingDonation}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorVars.appColor,
    alignItems: "center",
    width: dimenstions.width,
    height: dimenstions.height
  },
  avatar: {
    marginTop: 90
  },
  text: {
    marginTop: 10
  },
  button: {
    backgroundColor: "#1c8911"
  },
  loadingIndicator: {}
});
