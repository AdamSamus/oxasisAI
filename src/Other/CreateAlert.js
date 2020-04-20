import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Feather'
import {NavigationEvents} from 'react-navigation'
import RNPickerSelect from 'react-native-picker-select'
import {Colors, Typography} from '../styles'
import SettingsStyles from './SettingsStyles'
import {DateTime} from 'luxon'
import WeekdayPicker from "react-native-weekday-picker"
import MultiSelect from 'react-native-multiple-select';
import CheckboxList from '../Common/CheckboxList'
import {userAccess} from '../Common/const'
import {Tooltip} from 'react-native-elements';
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
const styles = SettingsStyles.createStyles()

const TimePicker = ({alertTimeOptions, handleChangeTime, selectedTime}) => {
  return Platform.OS === 'ios' ? (
      <RNPickerSelect
          placeholder={{label: 'Alert Time', value: null}}
          items={alertTimeOptions}
          onValueChange={handleChangeTime}
          style={{inputIOS: styles.inputIOS, inputAndroid: styles.inputAndroid}}
          value={selectedTime}
      />
  ) : (
      <Picker
          selectedValue={selectedTime}
          style={styles.inputAndroid}
          onValueChange={handleChangeTime}
      >
        <Picker.Item label="Alert Time" value="null" />
        {
          alertTimeOptions.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))
        }
      </Picker>
  )
}

TimePicker.propTypes = {
  alertTimeOptions: PropTypes.arrayOf(PropTypes.object),
  handleChangeTime: PropTypes.func,
  selectedTime: PropTypes.number,
}

const SensorPicker = ({sensorOptions, handleChangeSensor, selectedSensorID}) => {
  return Platform.OS === 'ios' ? (
      <RNPickerSelect
          placeholder={{label: 'Select a Sensor', value: null}}
          items={sensorOptions}
          onValueChange={handleChangeSensor}
          style={{inputIOS: styles.inputIOS, inputAndroid: styles.inputAndroid}}
          value={selectedSensorID}
          textColor={Colors.oxasisGold}
      />
  ) : (
      <Picker
          selectedValue={selectedSensorID}
          style={styles.inputAndroid}
          onValueChange={handleChangeSensor}
      >
        <Picker.Item  label="Select a Sensor" value="null" />
        {
          sensorOptions.map((item) => (
              <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))
        }
      </Picker>
  )
}

SensorPicker.propTypes = {
  sensorOptions: PropTypes.object,
  handleChangeSensor: PropTypes.func,
  selectedSensorID: PropTypes.number,
}

export default class NotificationPreferences extends Component {

  static propTypes = {
    screenProps: PropTypes.shape({
      auth: PropTypes.object, // the auth store
      notificationStore: PropTypes.object,
      store: PropTypes.object, // the activities store
    }),
  }

  state = {
    // only store in-progress updates so we can show the right UI state
    // even when the server is still updating
    updatesInProgress: {
      'No Activity': true,
      'Door Left Open': null,
      'Abnormal toilet usage': null,
    },
    selectedSensorID: null,
    selectedTime: null, // number of seconds past midnight
    refreshing: false,
    selectedDay:[1,2,3,4,5,6,0],

    Days: [
        {label:"Sunday", value: 0, selected: true},
        {label:"Monday", value: 1, selected: true} ,
        {label: "Tuesday",value: 2, selected: true},
        {label:"Wednesday", value: 3, selected: true} ,
        {label:"Thursday", value: 4, selected: true} ,
        {label: "Friday",value: 5, selected: true},
        {label: "Saturday",value: 6, selected: true},
    ]
  }


  async componentDidMount() {
    await this.loadPreferences()
    //await this.checkNotificationsEnabled()
  }

  loadPreferences = async() => {
    const {notificationStore, store} = this.props.screenProps
    await notificationStore.fetchNoActivityAlerts(this.currentUser)

    if (!store.activities) {
      store.mostRecent(currentUser)
    }

    await notificationStore.fetchPreferences(this.currentUser)
  }

  onRefresh = async() => {
    this.setState({refreshing: true});
    await this.loadPreferences()
    this.setState({refreshing: false});
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

  static navigationOptions = ({ navigation }) =>  {
    return {

      headerLeft: <Icon style={{marginLeft: 10, color: Colors.oxasisBlue}} name='arrow-left' size={30}
                        onPress={()=>{
                          navigation.goBack()
                        }}/>
    }}

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


  get sensorOptions() {
    const {store: {activities}, notificationStore: {noActivityAlerts}} = this.props.screenProps;
    const existingAlertMap = noActivityAlerts.reduce((map, alert) => ({
      ...map,
      [alert.SensorID]: true,
    }), {})

    return activities
    //.filter(({SensorID}) => !existingAlertMap[SensorID])
        .map((activity) => ({
          label: activity.SensorType,
          value: activity.SensorID,
        })).sort(this.compareSensorOptions);
  }



  handleChangeSensor = (selectedSensorID) => this.setState({selectedSensorID})
  handleChangeTime = (selectedTime) => this.setState({selectedTime})

  handleChangeDay = (selectedDay) => {
  //this.state.Days[selectedDay].selected = this.state.Days[selectedDay].selected == true ?  false : true
  const Days = this.state.Days;
  Days[selectedDay].selected = ! Days[selectedDay].selected;
  this.setState({Days});

  }




  handleCreateAlert = async () => {

    const { notificationStore } = this.props.screenProps
    const { selectedSensorID: SensorID, selectedTime, selectedWeekday} = this.state
    const { store: { activities }} = this.props.screenProps;
    var SensorType=''
    activities.map(activity=>{
      if (activity.SensorID === SensorID) {
        SensorType = activity.SensorType
      }
    })


    const DayNumbers = []
        Object.keys(this.state.Days).map((key, index)=>{
          if (this.state.Days[index].selected === true) {
            DayNumbers.push((this.state.Days[index].value)+1)
          }
        })

    const dayStart = DateTime.local().startOf('day')
    const Time = dayStart.plus({ seconds: selectedTime }).toFormat('HH:mm')
    const error = this.getValidationError()

    if (error) {
      return Alert.alert('Invalid alert info', error)
    }

    try {
      await notificationStore.createNoActivityAlert(this.currentUser, { SensorID, SensorType, Time, DayNumbers})
      this.setState({ selectedSensorID: null, selectedTime: null, selectedDay: null })
      const noActivityAlerts = this.noActivityAlerts


    } catch (err) {
      Alert.alert('Save error', err.message)
    }
    this.props.navigation.goBack()
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


  handleChangeWeekday = (selectedWeekday) => {
    this.setState({selectedWeekday})
  }


    render() { // eslint-disable-line complexity
        const noActivityAlerts = this.noActivityAlerts
        const sensorOptions = this.sensorOptions
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
            {this.shouldShowNewAlertInput(sensorOptions) && (
                <View>
                  <Text style={styles.sectionTitle}>Create an Alert</Text>
                  <Text style={Typography.bodyCopy2}>
                    Be alerted if a particular sensor is not activated by a certain time of day.
                  </Text>
                  <View>
                    <View style={styles.newAlertRow}>
                      <Text style={{flex: 2, fontSize: 17}}>Alert me when:</Text>
                      <View style={{flex: 3}}>
                        <SensorPicker
                            sensorOptions={this.sensorOptions}
                            handleChangeSensor={this.handleChangeSensor}
                            selectedSensorID={this.state.selectedSensorID}
                        />
                      </View>
                    </View>
                    <View style={styles.newAlertRow}>
                      <Text style={{flex: 3, fontSize: 17}}>Is not activated by:</Text>
                      <View style={{flex: 3}}>
                        <TimePicker
                            alertTimeOptions={this.alertTimeOptions}
                            handleChangeTime={this.handleChangeTime}
                            selectedTime={this.state.selectedTime}
                        />
                      </View>
                    </View>

          <View style={styles.checkboxListRow}>
             <Text style={{fontSize: 17, textAlign: "left"}}>On which day(s) of the week:</Text>
            <CheckboxList
              onToggleSelection={this.handleChangeDay}
              options={this.state.Days}
            />
          </View>

                    <TouchableHighlight
                        style={styles.buttonContainer}
                        onPress={this.handleCreateAlert}
                        //onPress={this.props.navigation.navigate('NotificationPreferences')}
                        //this.props.navigation.navigate('NotificationPreferences')}
                        underlayColor={Colors.buttonSecondaryBkgdActive}
                    >
                      <View style={styles.buttonPrimary}>
                        <Text style={styles.buttonPrimaryText}>Create</Text>
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

