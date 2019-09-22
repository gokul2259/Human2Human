import React from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { colorVars, dimenstions, recipientsAvatar } from "../constants";

export default class Donate extends React.Component {

  state = {
    recipient: {
      name: '',
      avatar: '',
    }
  }

  async componentDidMount() {
    const recipient = await AsyncStorage.getItem('recipient');
    const { givenName, gender, surname, totalIncome } = JSON.parse(recipient);
    const avatar = (gender && gender==='Male') ? recipientsAvatar.male : recipientsAvatar.female;
    this.setState({
      recipient: {
        name: `${givenName} ${surname}`,
        avatar,
      }
    });
  }

  render() {
    const { recipient: { avatar, name }} = this.state;
    return (
      <View style={styles.container}>
        <Avatar
          rounded
          size={200}
          source={{
            uri: `http://127.0.0.1:19001/${avatar}`
          }}
          containerStyle={styles.avatar}
        />
        <Text h2 style={styles.text}>{name}</Text>
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
  },
  text: {
    marginTop: 10,
  }
});


