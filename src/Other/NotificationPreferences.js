import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-native-elements';
import {
  Alert,
  View,
  Text,
  Switch,
  TouchableHighlight,
  ScrollView,
  Picker,
  Platform,
  ActivityIndicator,
  RefreshControl,
  AsyncStorage
} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select'
import MultiSelect from 'react-native-multiple-select';
import {Colors, Typography} from '../styles'
import SettingsStyles from './SettingsStyles'
import {DateTime} from 'luxon'
import WeekdayPicker from "react-native-weekday-picker"
import Icon from 'react-native-vector-icons/MaterialIcons'


const styles = SettingsStyles.createStyles()

export default class NotificationPreferences extends Component {
  static propTypes = {
    screenProps: PropTypes.shape({
      auth: PropTypes.object, // the auth store
      notificationStore: PropTypes.object,
      store: PropTypes.object, // the activities store
    }),
  }

  state = {
    updatesInProgress: {
      'No Activity': true,
      'Front Door Open': null,
      'Fridge Door Open': null,
      'Unusual Toilet Use': null,
    },
    selectedSensorID: null,
    selectedTime: null, // number of seconds past midnight
    refreshing: false,
    selectedDay:[],
  }

  async componentDidMount() {

    await this.loadPreferences()
    await this.checkNotificationsEnabled()
    const noActivityAlerts = this.noActivityAlerts

    if (noActivityAlerts.length > 0) {

      await AsyncStorage.setItem('NoteAlert', 'true')
    } else {
      await AsyncStorage.setItem('NoteAlert', 'false')
    }
  }

  loadPreferences = async() => {

    const {notificationStore, store} = this.props.screenProps
    await notificationStore.fetchNoActivityAlerts(this.currentUser)

    if (!store.activities) {
      store.mostRecent(currentUser)
    }

    await notificationStore.fetchPreferences(this.currentUser)
    console.log(JSON.stringify(this))
  }

  onRefresh = async() => {
    this.setState({refreshing: true});
    await this.loadPreferences()
    this.setState({refreshing: false});
    console.log(JSON.stringify(this))
  }

  get alertTimeOptions() {
    const intervalInMinutes = 30
    const intervalLength = intervalInMinutes * 60
    const intervalCount = 24 * 60 * 60 / intervalLength - 1 // no option for midnight
    const dayStart = DateTime.local().startOf('day')

    return [...Array(intervalCount).keys()].map((index) => {
      const secondsPastMidnight = intervalLength * (index + 1)
      const label = dayStart.plus({seconds: secondsPastMidnight}).toFormat('h:mm a')

      return {
        label,
        value: secondsPastMidnight,
      }
    });
  }

  get currentUser() {
    return this.props.screenProps.auth.currentUser
  }

  get noActivityAlertsEnabled() {
    return this.isAlertEnabled('No Activity')
  }

  get noActivityAlerts() {

    const {store: {activities}, notificationStore: {noActivityAlerts}} = this.props.screenProps
    const sensorMap = activities.reduce((map, activity) => ({
      ...map,
      [activity.SensorID]: activity.SensorType,
    }), {})


    return noActivityAlerts.map((alert) => ({
      ...alert,
      SensorType: sensorMap[alert.SensorID] || 'Unknown Sensor',
    })).sort(this.compareAlertTimes);
  }

  get preferences() {
    return this.props.screenProps.notificationStore.preferences
  }

  // NOTE: we only include sensors that do not already have an alert
  get sensorOptions() {
    const {store: {activities}, notificationStore: {noActivityAlerts}} = this.props.screenProps;
    const existingAlertMap = noActivityAlerts.reduce((map, alert) => ({
      ...map,
      [alert.SensorID]: true,
    }), {})

    return activities
        .filter(({SensorID}) => !existingAlertMap[SensorID])
        .map((activity) => ({
          label: activity.SensorType,
          value: activity.SensorID,
        })).sort(this.compareSensorOptions);
  }

  handleChangePreference = async(alertType, value) => {
    const {notificationStore} = this.props.screenProps
    const updatedPreferences = this.preferences.map((setting) => ({
      ...setting,
      enabled: setting.alertType === alertType ? value : setting.enabled,
    }))

    this.updateInProgress(alertType, value)
    try {
      await notificationStore.savePreferences(this.currentUser, updatedPreferences)
    } catch (_error) {
      Alert.alert('Save error', 'Sorry, there was an error while saving your changes')
    }
    this.updateInProgress(alertType, null)
  }

  handleChangeSensor = (selectedSensorID) => this.setState({selectedSensorID})

  handleChangeTime = (selectedTime) => this.setState({selectedTime})
  handleChangeDay = (selectedDay) => this.setState({selectedDay})

  handleCreateAlert = async() => {
    const {notificationStore} = this.props.screenProps
    const {selectedSensorID: sensorID, selectedTime: time, selectedWeekday} = this.state
    const error = this.getValidationError()

    if (error) {
      return Alert.alert('Invalid alert info', error)
    }

    try {

      await notificationStore.createNoActivityAlert(this.currentUser, {sensorID, time})
      this.setState({selectedSensorID: null, selectedTime: null, selectedDay:null})
      const noActivityAlerts = this.noActivityAlerts

      //console.log(noActivityAlerts.length)
      if (noActivityAlerts.length > 0) {  // nevermind :)
        //console.log(noActivityAlerts)
        //console.log(noActivityAlerts.length)
        //broken

        await AsyncStorage.setItem('NoteAlert', 'true')

      } else {
        await AsyncStorage.setItem('NoteAlert', 'false')

      }
    } catch (err) {
      Alert.alert('Save error', err.message)
    }
  }

  handleDeleteNoActivityAlert = async(sensorID) => {
  console.log("sensorID: " + sensorID)
    const {notificationStore} = this.props.screenProps

    try {
      await notificationStore.deleteNoActivityAlert(this.currentUser, sensorID)
      const noActivityAlerts = this.noActivityAlerts

      console.log(noActivityAlerts.length)
      if (noActivityAlerts.length > 0) {


        await AsyncStorage.setItem('NoteAlert', 'true')

      } else {
        await AsyncStorage.setItem('NoteAlert', 'false')

      }
    } catch (err) {
      Alert.alert('Save error', err.message)
    }

  }

  // If notifications aren't enabled on the device, warn the user about it
  async checkNotificationsEnabled() {
    const {notificationStore} = this.props.screenProps
    const enabled = await notificationStore.activateNotifications(this.currentUser)

    if (!enabled) {
      Alert.alert('Notifications Blocked', 'To receive notifications, you\'ll have to  enable them for this app in your device settings')
    } else {
    }
  }

  compareAlertTimes(first, second) {
    return parseInt(first.Time.replace(':', ''), 10) - parseInt(second.Time.replace(':', ''), 10)
  }

  compareSensorOptions(first, second) {
    return first.label < second.label ? -1 : 1
  }

  getValidationError() {
    const {selectedSensorID, selectedTime} = this.state

    if (!selectedSensorID || !selectedTime) {
      return 'Please select a sensor and a time to create an alert'
    }

    return null
  }

  isAlertEnabled(type) {

    const {updatesInProgress} = this.state
    const setting = this.preferences.find(({alertType}) => alertType === type)
    const inProgressState = updatesInProgress[type]

    return inProgressState !== null ? inProgressState : setting && setting.enabled
  }

  shouldShowExistingAlerts(alerts) {
    return this.noActivityAlertsEnabled && alerts.length > 0
  }

  shouldShowNewAlertInput(sensorOptions) {
    return this.noActivityAlertsEnabled && sensorOptions.length > 0
  }

  // record that we're currently updating an alert preference (or not with value = null)
  updateInProgress(alertType, value) {
    this.setState((state) => ({
      updatesInProgress: {
        ...state.updatesInProgress,
        [alertType]: value,
      },
    }))
  }


  handleChangeWeekday(selectedWeekday) {
    this.setState({selectedWeekday})
  }
  render() { // eslint-disable-line complexity
    const sensorOptions = this.sensorOptions
    const noActivityAlerts = this.noActivityAlerts

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


          <NavigationEvents onDidFocus={this.loadPreferences} />
          <View style={styles.containerExpand}>
            <Text style={styles.h1}>Manage Alerts</Text>
            <Text style={Typography.bodyCopy}>Use the toggle switches below to manage the types of alerts you receive.</Text>



    {/*Front door open alerts*/}
    <View style={[{ flexDirection: 'row'},styles.inputRowWrapper]}>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 17}}>Front door open alerts </Text>
            <Tooltip popover={<Text>A push notification will be sent if the front door is left open for >15 min.</Text>} backgroundColor={'rgb(240, 179, 16)'} height={70} width={250}>
             <View style={{ alignSelf: 'stretch', justifyContent: 'center',  alignItems: 'flex-start' }}>
                 <Icon name="info" size={30} color='rgba(240, 173, 0, 0.7)'/>
             </View>
            </Tooltip>
        </View>
        <View style={{width: 68, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row-reverse'}}>
            <Switch
                style={{alignSelf: 'stretch', justifyContent: 'center',alignItems: 'center' }}
                ios_backgroundColor="#dcdcdc"
                onValueChange={(value) => {
                  this.handleChangePreference('Front Door Open', value)
                }}
                trackColor={Colors.oxasisBlue}
                thumbColor={Colors.white}
                value={this.isAlertEnabled('Front Door Open')}
            />
        </View>
    </View>


            {/*Fridge Door alerts*/}
              <View style={[{ flexDirection: 'row'},styles.inputRowWrapper]}>
                  <View style={{ alignSelf: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
                    <Text style={{fontSize: 17}}>Fridge door open alerts </Text>
                      <Tooltip popover={<Text>A push notification will be sent if the fridge is left open for >10 min.</Text>}
                       backgroundColor={'rgb(240, 179, 16)'} height={70} width={250}>
                       <View style={{ alignSelf: 'stretch', justifyContent: 'center',  alignItems: 'flex-start' }}>
                           <Icon name="info" size={30} color='rgba(240, 173, 0, 0.7)'/>
                       </View>
                      </Tooltip>
                  </View>
                  <View style={{width: 68, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row-reverse'}}>
                      <Switch
                          style={{alignSelf: 'stretch', justifyContent: 'center',alignItems: 'center' }}
                          ios_backgroundColor="#dcdcdc"
                          onValueChange={(value) => {
                            this.handleChangePreference('Fridge Door Open', value)
                          }}
                          trackColor={Colors.oxasisBlue}
                          thumbColor={Colors.white}
                          value={this.isAlertEnabled('Fridge Door Open')}
                      />
                  </View>
              </View>


            {/*Abnormal toilet usage*/}
    <View style={[{ flexDirection: 'row'},styles.inputRowWrapper]}>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 17}}>Abnormal toilet usage alerts </Text>
            <Tooltip popover={<Text>A push notification will be sent if the resident deviates significantly from their average toilet use during the sleep time.</Text>} backgroundColor={'rgb(240, 179, 16)'} height={120} width={250}>
                  <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="info" size={30} color='rgba(240, 173, 0, 0.7)'/>
                  </View>
             </Tooltip>
        </View>
        <View style={{width: 68, alignSelf: 'center', justifyContent: 'center', flexDirection: 'row-reverse'}}>
            <Switch
                style={{alignSelf: 'stretch', justifyContent: 'center',alignItems: 'center' }}
                ios_backgroundColor="#dcdcdc"
                onValueChange={(value) => {
                  this.handleChangePreference('Unusual Toilet Use', value)
                }}
                trackColor={Colors.oxasisBlue}
                thumbColor={Colors.white}
                value={this.isAlertEnabled('Unusual Toilet Use')}
            />
        </View>
    </View>


            {this.shouldShowNewAlertInput(sensorOptions) && (
                <View>
                  <View>
                    <View>
                      {this.shouldShowExistingAlerts(noActivityAlerts) && (
                          <ExistingNoActivityAlerts
                              alerts={noActivityAlerts}
                              onClickDelete={this.handleDeleteNoActivityAlert}
                          />

                      )}
                    </View>
                    <TouchableHighlight
                        style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate('CreateAlert')}

                        underlayColor={Colors.buttonSecondaryBkgdActive}
                    >
                      <View style={styles.buttonPrimary}>
                        <Text style={styles.buttonPrimaryText}>Create Custom Alerts</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
            )}

          </View>
        </ScrollView>
    )
  }
}

function convertHours(intHours) {
  return intHours > 12 ? intHours - 12 : intHours
}

// time comes back from the API in 24-hour formatted string like HH:mm
function formatTime(rawTime) {
  const [hours, minutes] = rawTime.split(':')
  const intHours = parseInt(hours, 10)
  const suffix = intHours >= 12 ? 'pm' : 'am'

  return `${convertHours(intHours)}:${minutes} ${suffix}`
}

function ExistingNoActivityAlerts({alerts, onClickDelete}) {
  //console.log(alerts)
  return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Alerts</Text>
        {alerts.map((alert) => {
          var weekdays = ''
          alert.DayNumbers.map(day=>{
            switch (day) {
              case 1:
                weekdays += 'Su '
                break
              case 2:
                weekdays += 'M '
                break
              case 3:
                weekdays += 'T '
                break
              case 4:
                weekdays += 'W '
                break
              case 5:
                weekdays += 'Th '
                break
              case 6:
                weekdays += 'F '
                break
              case 7:
                weekdays += 'S '
                break

              default:
                break
            }
          })
          return (
              <View key={alert.SensorID} style={styles.existingAlert}>
                <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                  <Text style={styles.alertSummary}>
                    No <Text style={styles.emphasized}>{alert.SensorType}</Text> activity
                    by <Text style={styles.emphasized}>{formatTime(alert.Time)}</Text>

                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text>Days: </Text><Text style={styles.emphasized}>{weekdays}</Text>
                  </View></View>
                <TouchableHighlight
                    onPress={() => {
                      onClickDelete(alert)
                    }}
                    style={styles.deleteContainer}
                    underlayColor={Colors.buttonSecondaryBkgdActive}
                >
                  <Text style={styles.delete}>Delete</Text>
                </TouchableHighlight>

              </View>
          )})}
      </View>
  )
}

ExistingNoActivityAlerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.object),
  onClickDelete: PropTypes.func,
}