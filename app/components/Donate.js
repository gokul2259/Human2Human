import React from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View, ScrollView } from 'react-native';
import { Badge, Avatar, Text, Slider, Button } from 'react-native-elements';
import { StackActions, NavigationActions } from "react-navigation";
import NumberFormat from 'react-number-format';

import { post } from "../utils/apiHelper";
import { colorVars, recipientsAvatar } from '../constants';

const CATEGORY_TAG_FOOD = "Food and Dining"
const CATEGORY_TAG_TRANSFER = "Transfer"
const CATEGORY_TAG_INCOME = "Income"
const CATEGORY_TAG_SHOPPING = "Shopping"
const MIN_RANDOM = 100;
const MAX_RANDOM = 100;

const maleAvatar = require('../../assets/avatar-male.png')
const femaleAvatar = require('../../assets/avatar-female.png')

export default class Donate extends React.Component {
  state = {
    recipient: {
      gender: 'n/a',
      name: 'n/a',
      habitationStatus: 'n/a',
      totalIncome: 'n/a',
      schoolAttendance: 'n/a',
      workActivity: 'n/a',
    },
    donationAmount: 1,
    submittingDonation: false,
    donationSuccessful: false,
    categoryTags: {
      [CATEGORY_TAG_FOOD]: Math.floor(Math.random() * MAX_RANDOM) + MIN_RANDOM,
      [CATEGORY_TAG_TRANSFER]: Math.floor(Math.random() * MAX_RANDOM) + MIN_RANDOM,
      [CATEGORY_TAG_INCOME]: Math.floor(Math.random() * MAX_RANDOM) + MIN_RANDOM,
      [CATEGORY_TAG_SHOPPING]: Math.floor(Math.random() * MAX_RANDOM) + MIN_RANDOM,
    },
  };

  constructor() {
    super();
    AsyncStorage.getItem('recipient').then(recipient => {
      this.setState(prevState => (
        {
          recipient: {
            ...prevState.recipient,
            ...JSON.parse(recipient)
          }
        }
      ))
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
  }

  render() {
    const {
      recipient: {
        gender,
        givenName,
        surname,
        habitationStatus,
        totalIncome,
        schoolAttendance,
        workActivity,
      },
      donationAmount,
      submittingDonation,
      categoryTags,
    } = this.state;

    const avatar =
      gender && gender === 'Male'
        ? maleAvatar
        : femaleAvatar;

    const formattedWorkActivity = workActivity === 'parttime' ? 'Part-time' : workActivity
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          rounded
          size={200}
          source={avatar}
          containerStyle={styles.avatar}
        />
        <Text h2 style={styles.name}>
          {`${givenName} ${surname}`}
        </Text>
        <View style={{textAlign: 'left', padding: 8}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 8}}>
            <Badge badgeStyle={styles.badge} textStyle={styles.badgeText} value={`${CATEGORY_TAG_FOOD} - ${categoryTags[CATEGORY_TAG_FOOD]}`} status="primary" />
            <Badge badgeStyle={styles.badge} textStyle={styles.badgeText} value={`${CATEGORY_TAG_TRANSFER} - ${categoryTags[CATEGORY_TAG_TRANSFER]}`} status="warning" />
            <Badge badgeStyle={styles.badge} textStyle={styles.badgeText} value={`${CATEGORY_TAG_INCOME} - ${categoryTags[CATEGORY_TAG_INCOME]}`} status="success" />
            <Badge badgeStyle={styles.badge} textStyle={styles.badgeText} value={`${CATEGORY_TAG_SHOPPING} - ${categoryTags[CATEGORY_TAG_SHOPPING]}`} status="error" />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailTitle}>Income: </Text>
            <NumberFormat value={totalIncome} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.profileDetail}>{value}</Text>} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailTitle}>Work: </Text>
            <Text style={styles.profileDetail}>{formattedWorkActivity}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailTitle}>Living Arrangement: </Text>
            <Text style={styles.profileDetail}>{habitationStatus}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailTitle}>School: </Text>
            <Text style={styles.profileDetail}>{schoolAttendance}</Text>
          </View>
          <Text style={styles.bioTitle}>About me</Text>
          <Text style={styles.bioDetail}>I served in the military for 20 years and I’m still suffering from PTSD and addiction. I’m on a waitlist to enter a rehab program, but I have nowhere to go until then. Anything you can give helps.</Text>
          <View style={styles.sliderContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailTitle}>Donation amount: </Text>
              <Text style={styles.profileDetail}>{donationAmount}</Text>
            </View>
            <Slider
              maximumValue={100}
              thumbTintColor={colorVars.primaryColorTintMin}
              maximumTrackTintColor={colorVars.primaryColorTintMax}
              minimumTrackTintColor={colorVars.primaryColorTintMin}
              step={1}
              value={donationAmount}
              onValueChange={value => this.setState({ donationAmount: value })}
            />
          </View>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorVars.appColor,
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginTop: 32,
    marginBottom: 8,
  },
  name: {
    marginTop: 4,
  },
  detailTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  profileDetail: {
    marginBottom: 10,
  },
  sliderContainer: {
    alignItems: "stretch",
    justifyContent: "center"
  },
  button: {
    backgroundColor: colorVars.primaryColor,
  },
  badge: {
    margin: 2,
  },
  badgeText: {
    padding: 16,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bioDetail: {
    fontSize: 14,
    marginBottom: 8,
  }
});
