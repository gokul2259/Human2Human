import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Avatar } from "react-native-elements";
import { colorVars, dimenstions, recipientsAvatar } from "../constants";

export default class Donate extends React.Component {

  async componentDidMount() {
    const recipient = await AsyncStorage.getItem('recipient');
    const { givenName, gender } = JSON.parse(recipient);
    const avatar = (gender && gender==='Male') ? recipientsAvatar.male : recipientsAvatar.female;
    this.setState({
      recipient: {
        name: givenName,
        avatar,
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Avatar
          rounded
          size={200}
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
          containerStyle={styles.avatar}
        />
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
    height: dimenstions.height,
  },
  avatar: {
    marginTop: 90,
  }
});


