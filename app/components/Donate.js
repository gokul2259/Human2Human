import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import { colorVars, dimenstions } from "../constants";

export default function Donate() {
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
