import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  Alert,
  AsyncStorage
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import SensorIcon from '../Common/SensorIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../styles'
import ManageSensorsStyles from './ManageSensorsStyles'
import NotificationStyles from '../Notifications/NotificationStyles'
import ManageSensorsItems from './ManageSensorsItems'
import {DateTime} from 'luxon'
import {userAccess} from '../Common/const'
import {toPatientLocalTime, patientTimeZone} from '../helpers/dateTime'
import { Tooltip } from 'react-native-elements';


import SettingsStyles from './SettingsStyles'
const styles = SettingsStyles.createStyles()
const manageSensorsStyles = ManageSensorsStyles.createStyles()
const notificationStyles = NotificationStyles.createStyles()
/** a child component for one item of recent activities.*/
const MostRecentActivity = (props) => {
  const {item: event, homeInfo} = props
  const now = DateTime.local()
  // Parse the ISO timestamp into a Luxon object
  const eventDate = DateTime.fromISO(event.timestamp)
  // Grab the home timezone out of the homeInfo API object
  const patientTimeZoneName = patientTimeZone(eventDate, homeInfo)
  // Convert the time to local in the home's timezone (instead of the phone's timezone)
  const eventDateLocal = toPatientLocalTime(eventDate, patientTimeZoneName)
  const todayString = now.toFormat('M/d')
  const eventDayString = eventDateLocal.toFormat('M/d')
  const eventTime = eventDateLocal.toFormat('h:mm a')

  // Drop the date if the date is today
  const dayPart = todayString === eventDayString ? '' : eventDayString

  /**rendering sensor icon, type, time. */
  return (
    <View style={styles.containerExpand}>
             <View>
                 <Tooltip popover={<Text style={{fontSize: 16}}>Only custom sensors can be renamed.</Text>} backgroundColor={'rgb(240, 179, 16)'} height={80} width={300}>
                     <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                     <Text style={{textAlign: 'center'}} ><Text style={[styles.h1, {textAlign: 'center'}]}>Manage Sensors  </Text></Text>
                     <Icon name="info" size={30} color='#F0AD00'/>
                     </View>
                 </Tooltip>
             </View>
    </View>
  )
}

export default class ManageSensors extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.shape({
        activateNotifications: PropTypes.func,
        currentUser: PropTypes.object,
        store: PropTypes.object,
    }),
  }

  state = {
    refreshing: false,
    sensorID: null
  }


  /**Saving current time in case to choose ignore */
  _storeData = () => {
    let todayStr = new Date().toString()
    AsyncStorage.setItem('startedate', todayStr)
  }
  /**Going to other component*/
  jumpTo(screen, options = {}) {
    const { navigation } = this.props
    navigation.navigate(screen, options)
  }

  /** Checking if customer has setup notifications already or ignore it and then showing alert or not. */


  /**
   * check and show alert after mounted component
   */

  /**
   * if one item of activities is highlighted turn off highlight in 5 sec.
   */
  componentWillUpdate() {
    //setTimeout(() => {
    //  const { navigation } = this.props;
    //  navigation.setParam('sensorID', '')
    //  this.setState({})
    //}, 5000);
  }

  /**
   * fetching most recent activities and notification from server
   */

   /**
    * It will be called when customer click overview tab
    * will send time and some info to server
    *
    */
   bload = false
    loadActivities = async () => {
    const { activateNotifications, currentUser, store } = this.props.screenProps
    // audit trail Overview tab open
    userAccess( {
    activity: 'Overview'
    })
    await store.applyFilter(currentUser, {
      endDate: null,
      sensorTypes: [],
      startDate: null
    })


    this.bload = true

  }

  /** listener for refresh*/
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadActivities()
    this.setState({ refreshing: false });
  }

  /* rearrage activities date from server*/
get activities() {
    return this.props.screenProps.store.activities
      .reduce((acc, sensor) => {
       // Push the element to final array only if the SensorId >= 9
        if (sensor.SensorID >= 9) {
          acc.push({
            id: sensor.SensorID,
            type: sensor.SensorType,
            timestamp: sensor.EventDate,
            key: sensor.SensorType,
          });
        }
        return acc;
      }, []);
  }



  render() { // eslint-disable-line complexity
    const {
      screenProps: {
        homeStore,
      },
      navigation: { navigate },
    } = this.props

    // getting parameter what sensor will be highlighted
    const { navigation } = this.props;
    const sensorID = navigation.getParam('sensorID', '')

    const mostRecentActivity = this.activities.slice(0, 1)[0]

    /**
     * notitication button and list of activitt
     */
    return (
      <View style={manageSensorsStyles.pageWrapper}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={manageSensorsStyles.container}>
            <NavigationEvents onDidFocus={this.loadActivities} />

            {(!this.activities || this.activities.length === 0) ?
              (!this.bload?<Text/>:
                <Text style={manageSensorsStyles.text}>No recent activity found.</Text>
              ) :
              (
                  <View>

                    <MostRecentActivity
                        item={mostRecentActivity}
                        homeInfo={homeStore.homeInfo}
                    />
                    <FlatList
                        data={this.activities}
                        renderItem={(item) => {
                          return <ManageSensorsItems {...item} homeInfo={homeStore.homeInfo} navigation={this.props.navigation} />

                        }}
                    />
                    <View style={styles.buttonPrimary}>
                    <Text style={styles.buttonPrimaryText}>Save Changes</Text>
                    </View>
                </View>
              )
            }
          </View>
        </ScrollView>
    </View>
    )
  }
}



