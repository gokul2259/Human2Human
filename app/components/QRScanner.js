import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

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

  handleBarCodeScanned = ({ type, data: accountId }) => {
    this.setState({ isFetching: true });
    //const accountId = "7f60df74-fa27-4018-b896-d15533572327";
    get(`api.td-davinci.com/api/accounts/${accountId}`)
      .then(response => {
        alert(
          `Bar code with type ${type} and data ${accountId} has been scanned! Response: ${JSON.stringify(
            response
          )}`
        );
      })
      .catch(response => {
        alert(`Error: ${JSON.stringify(response)}`);
      })
      .then(() => {
        this.setState({ isFetching: false });
      });

    // const { setRecipientAccountId } = this.props;

    this.setState({ scanned: true });
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
