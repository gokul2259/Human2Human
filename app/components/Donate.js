import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { colorVars, dimenstions, recipientsAvatar } from "../constants";
import { post } from "../utils/apiHelper";

export default class Donate extends React.Component {
  state = {
    recipient: {
      name: "",
      avatar: ""
    }
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
    try {
      const amount = 5;
      const currency = "CAD";

      const sender = await AsyncStorage.getItem("sender");
      const recipient = await AsyncStorage.getItem("recipient");

      const senderAccountId = "f6e2fe89-2f62-4213-a041-d9a9e6da632d";
      //const recipientAccountId = "c221770a-1b48-474a-8c3b-ba97585c406c";
      const recipientAccountId = await AsyncStorage.getItem(
        "recipientAccountId"
      );

      const api = `api.td-davinci.com/api/transfers`;
      const body = JSON.stringify({
        amount,
        currency,
        fromAccountId: senderAccountId,
        toAccountId: recipientAccountId
      });

      const options = { body };

      const transferResponse = await post(api, options);

      this.setState({ response: JSON.stringify(transferResponse) });
    } catch (exception) {}
  };

  render() {
    const {
      recipient: { avatar, name }
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
  }
});
