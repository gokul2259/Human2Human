import { Dimensions } from "react-native";

module.exports = {
  colorVars: {
    appColor: '#FFFFFF',
  },
  dimenstions: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  recipientsAvatar: {
    male: 'avatar-male',
    female: 'avatar-female',  
  }
};