/**
 * Show home profile of customers.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native'
import { UserDisplay } from './UserDisplay'
import { NavigationEvents } from 'react-navigation'
import { Colors } from '../styles'
import SettingsStyles from './SettingsStyles'
import DateTimePicker from "react-native-modal-datetime-picker"

import BusyButton from '../Common/BusyButton'
const styles = SettingsStyles.createStyles()

export default class ManageUsers extends Component {
  static propTypes = {
    screenProps: PropTypes.object,
  }

  state = {
    refreshing: false,
    isDateTimePickerVisible: false,
    wakeSleep: '',
    SleepEndTime: null,
    SleepStartTime: null,
  }

  /**
   * fetching profile information from server
   */
  loadHomeInfo = async () => {
    await this.props.screenProps.homeStore.fetchHomeInfo(this.props.screenProps.auth.currentUser)
    this.setState({
      SleepStartTime: this.props.screenProps.homeStore.homeInfo.SleepStartTime,
      SleepEndTime: this.props.screenProps.homeStore.homeInfo.SleepEndTime
    });
  }

  /**
   * Saving time for wakeup and sleep to server.
   */
  async handleClickSave() {
    const result = await this.props.screenProps.homeStore.saveTimeInfo(this.props.screenProps.auth.currentUser,
        { StartTime:this.state.SleepStartTime  , EndTime:this.state.SleepEndTime })
    if (result.Status == 'Success') {
      //alert('The user info have saved successfully.')
      Alert.alert('','The user info have been saved successfully.',)
    } else {
      //alert('Could not save user info. Please try refreshing data or check your signal strength.')
      Alert.alert('','Could not save user info. Please refresh and try again.',)
    }
  }

  /**
   * handler for refresh
   */
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadHomeInfo()
    this.setState({
      refreshing: false,
      SleepStartTime: this.props.screenProps.homeStore.homeInfo.SleepStartTime,
      SleepEndTime: this.props.screenProps.homeStore.homeInfo.SleepEndTime
    });
  }

  /**
   * getting time for 12 hours from datetime.
   */
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  /**
   * show time picker
   */
  showDateTimePicker = (wakeSleep) => {
    this.setState({ isDateTimePickerVisible: true, wakeSleep });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  /**
   * setting wakeup time or sleep time
   */
  handleDatePicked = time => {
    //console.log("A date has been picked: ", time);
    const timeString = this.formatAMPM(time)
    if (this.state.wakeSleep === 'wake') {
      this.setState({ SleepEndTime: timeString })
    } else {
      this.setState({ SleepStartTime: timeString })
    }
    this.hideDateTimePicker();
  };

  /**
   * rendering home pr info and save button.
   * wakeup time and sleep time can be changed when clicking it will show time picker.
   */
  render() {
    const { screenProps: { homeStore: { isFetching, isSaving } } } = this.props
    const home = this.props.screenProps.homeStore.homeInfo
    return (
        <ScrollView
            style={styles.pageWrapper}
            refreshControl={
              <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
              />
            }
        >
          <NavigationEvents onDidFocus={this.loadHomeInfo} />
          <View style={styles.containerExpand}>
            <Text style={styles.h1}>Home Info{"\n"}</Text>
            {(isFetching && !this.state.refreshing) ? (
                <View style={styles.containerHorizontal}>
                  <ActivityIndicator size="large" color={Colors.oxasisBlue} />
                </View>
            ) : (
                //<HomeInfo home={this.props.screenProps.homeStore.homeInfo} />
                <View>
                  {home.AddressOne &&
                  <View>
                    <Text style={styles.bodyText}>Address:{"\n"}</Text>
                    <Text style={styles.bodyText}>{home.AddressOne} {home.AddressTwo}</Text>
                    <Text style={styles.bodyText}>{home.City}, {home.State} {home.ZipCode}{"\n"} </Text>
                  </View>
                  }
                  {/*{home.AddressTwo &&
                  <View style={styles.rowContainer}>
                    <Text style={styles.bodyText}>Address: {home.AddressTwo}</Text>
                  </View>
                }
                {home.City &&
                  <View style={styles.rowContainer}>
                    <Text style={styles.bodyText}>City: {home.City}</Text>
                  </View>
                }
                {home.State &&
                  <View style={styles.rowContainer}>
                    <Text style={styles.bodyText}>State: {home.State}</Text>
                  </View>
                }
                {home.ZipCode &&
                  <View style={styles.rowContainer}>
                    <Text style={styles.bodyText}>Zip Code: {home.ZipCode}</Text>
                  </View>
                }*/}

                  {
                    this.state.SleepEndTime ?
                        <TouchableOpacity style={styles.rowContainer} onPress={() => this.showDateTimePicker('wake')}>
                          <Text style={[{ ...styles.bodyText }, { width: 150 }]}>Wakes Up at: </Text>
                          {/* <TouchableOpacity onPress={() => this.showDateTimePicker('wake')}> */}
                          <Text style={{ color: Colors.oxasisGold, fontWeight: 'bold' }}>{this.state.SleepEndTime}</Text>
                          {/* </TouchableOpacity> */}
                        </TouchableOpacity>
                        :
                        home.SleepEndTime &&
                        <TouchableOpacity style={styles.rowContainer} onPress={() => this.showDateTimePicker('wake')}>
                          <Text style={[{ ...styles.bodyText },{ ...styles.bodyText }, { width: 150 }]}>Wakes Up at: </Text>
                          {/* <TouchableOpacity onPress={() => this.showDateTimePicker('wake')}> */}
                          <Text style={{ color: Colors.oxasisGold, fontWeight: 'bold' }}>{home.SleepEndTime}</Text>
                          {/* </TouchableOpacity> */}
                        </TouchableOpacity>
                  }
                  {this.state.SleepStartTime ?
                      <TouchableOpacity style={styles.rowContainer}
                                        onPress={() => this.showDateTimePicker('sleep')}
                      >
                        <Text style={[{ ...styles.bodyText }, { width: 150 }]}>Goes to Sleep at: </Text>
                        {/* <TouchableOpacity onPress={() => this.showDateTimePicker('sleep')}> */}
                        <Text style={{ color: Colors.oxasisGold, fontWeight: 'bold' }}>{this.state.SleepStartTime}</Text>
                        {/* </TouchableOpacity> */}
                      </TouchableOpacity>
                      :
                      home.SleepStartTime &&
                      <TouchableOpacity style={styles.rowContainer}
                                        onPress={() => this.showDateTimePicker('sleep')}
                      >
                        <Text style={[{ ...styles.bodyText }, { width: 150 }]}>Goes to Sleep at: </Text>
                        {/* <TouchableOpacity onPress={() => this.showDateTimePicker('sleep')}> */}
                        <Text style={{ color: Colors.oxasisGold, fontWeight: 'bold' }}>{home.SleepStartTime}</Text>
                        {/* </TouchableOpacity> */}
                      </TouchableOpacity>
                  }

                  {/*                  {home.People && home.People.map((user, index) => (
                  <UserDisplay user={user} key={index} />
                ))} */}

                  <View style={styles.buttonGroupContainer}>
                    <BusyButton
                        style={styles.buttonPrimary}
                        underlayColor={Colors.buttonPrimaryBkgd}
                        isBusy={isSaving}
                        onPress={this.handleClickSave.bind(this)}
                    >
                      <Text style={[styles.buttonPrimaryText, {fontSize: 16}]}>Update 'Wake Up/Sleep' time</Text>

                    </BusyButton>
                  </View>
                  <DateTimePicker
                      is24Hour={false}
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                      mode={'time'}
                  />
                </View>
            )}
          </View>
        </ScrollView>
    )
  }
}

