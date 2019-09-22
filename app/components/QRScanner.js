import * as React from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StackActions, NavigationActions } from "react-navigation";

import { get } from "../utils/apiHelper";

export default class QRScanner extends React.Component {
  state = {
    isFetching: false,
    hasCameraPermission: null,
    scanned: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end"
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data: accountId }) => {
    this.setState({ isFetching: true });
    try {
      //const accountId = "7f60df74-fa27-4018-b896-d15533572327";
      const accountResponse = await get(
        `api.td-davinci.com/api/accounts/${accountId}`
      );
      const {
        result: {
          bankAccount: { relatedCustomerId }
        }
      } = accountResponse;

      const customerResponse = await get(
        `api.td-davinci.com/api/customers/${relatedCustomerId}`
      );

      const { result } = customerResponse;
      await AsyncStorage.setItem("recipient", JSON.stringify(result));
      await AsyncStorage.setItem("recipientAccountId", accountId);
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "DonateFund" })]
        })
      );
    } catch (exception) {
      alert(
        `Invalid QR code: the QR is not associated with a TD customer profile`
      );
      this.setState({ isFetching: false });
      this.setState({ scanned: true });
    }
  };
}
