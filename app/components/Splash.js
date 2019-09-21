import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Splash extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode={'contain'}
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <Text style={styles.paragraph}>
          Go on, get your giving on
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  logo: {
    width: '100%',
    height: 200,
  }
});
