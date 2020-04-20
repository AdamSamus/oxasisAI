import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  AsyncStorage
} from 'react-native'
import { NavigationEvents } from 'react-navigation';
import SensorIcon from '../Common/SensorIcons'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../styles'
import OverviewStyles from './OverviewStyles'
import NotificationStyles from '../Notifications/NotificationStyles'
import ActivityItem from './OverviewItem'
import {DateTime} from 'luxon'
import {userAccess} from '../Common/const'
import {toPatientLocalTime, patientTimeZone} from '../helpers/dateTime'
import { Tooltip } from 'react-native-elements';
import ActivitiesStyles from '../Activities/ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()

const overviewStyles = OverviewStyles.createStyles()
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
  const alert = todayString === eventDayString ? (<Text>{eventTime}</Text>) : (<Text>{eventTime}{"\n"}    {dayPart}</Text>)


  /**rendering sensor icon, type, time. */
      /*<SensorIcon style={[overviewStyles.heroIcon, { transform: [{ rotateY: '180deg' }] }]} size={50} type={event.type} />*/
  return (
    <View style={overviewStyles.linkContent}>
    <View style={{flexDirection: 'row'}}><Text></Text></View>
      <View style={{flexDirection: 'row'}}>
      <SensorIcon size={30} type={event.type} color={Colors.oxasisBlue}/>
          <Tooltip popover={<Text>Most recent event in the home.</Text>} backgroundColor={'rgb(240, 179, 16)'} height={70} width={250}>
            <View style={{  alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
             <Text> <Text style={overviewStyles.heroText}>{event.type} </Text></Text>
              <Icon name="info" size={30} color='#F0AD00'/>
            </View>
          </Tooltip>

       </View >
       <View style={overviewStyles.heroIcon}>
        <Text style={{justifyContent: "center", color: Colors.oxasisGold, alignSelf: 'center', justifyContent: "center", fontWeight: 'bold', fontSize: 25}}>{alert}</Text>
    </View>
    </View>
  )
}

export default class OverviewIndex extends Component {

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

  /**alert notification presetting */
  _popupAlert = () => {
    const popupTimerId = setTimeout(()=>{
        Alert.alert(
            'Notification preferences',
            'Please create Notification Alert',
            [
              {
                text: 'Ok',
                onPress: () => this.jumpTo('NotificationPreferences')
              },
              {
                text: 'Ignore',
                onPress: () => this._storeData(),
                style: 'cancel'
              },
            ]
        );
    }, 30000) // time out for the notification alert
    this.props.navigation.setParams({popupTimerId})
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
  checkAlert = async () => {
    /**if customer has already setup notification setting won't show alert.  */
    //await AsyncStorage.removeItem('startedate')
    //await AsyncStorage.removeItem('NoteAlert')
    const {notificationStore, currentUser} = this.props.screenProps
    const noActivityAlerts = await notificationStore.fetchNoActivityAlerts(currentUser)
    if (noActivityAlerts.length > 0) {
      return true
    }

    //const NoteAlert = await AsyncStorage.getItem('NoteAlert')
    //console.log(NoteAlert)
    const startedate = await AsyncStorage.getItem('startedate');
    //if (NoteAlert === 'true') {
    //  return
    //}

    /**
     * showing alert except to be less than 3 days from when ignoring alert.
     */
    //console.log(startedate)
    if (startedate == null) { // if empty
      this._popupAlert()

      //let todayStr = new Date().toString()
      //await AsyncStorage.setItem('startedate', todayStr)
    } else {
      /**
       * if more than 3 days from ignoring alert then showing alert again.
       */
      let endDate = new Date(startedate)
      let today = new Date()
      endDate.setDate(endDate.getDate() + 3)
      //console.log(today, endDate)
      if (today > endDate) { // check passed date
        this._popupAlert()
      }
    }
  }

  /**
   * check and show alert after mounted component
   */
  async componentDidMount() {
    await this.checkAlert()
  }

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

    if (currentUser.token) {
      // This screen gets focus for a frame before logout takes effect,
      // so prevent it from re-fetching in that case (because there is no
      // user to fetch for the because they just logged out).
      await this.props.screenProps.homeStore.fetchHomeInfo(currentUser)
      await store.mostRecent(currentUser)
      await activateNotifications(currentUser)
    }
    this.bload = true

  }

  /**
   * listener for refresh
   */
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadActivities()
    this.setState({ refreshing: false });
  }

  /**
   * rearrage activities date from server
   */
  get activities() {
    return this.props.screenProps.store.activities.map((sensor) => {
      return {
        id: sensor.SensorID,
        type: sensor.SensorType,
        timestamp: sensor.EventDate,
        key: sensor.SensorType,
      }
    }).sort((eventA, eventB) => {
            if (eventA.id > eventB.id) {
              return 1
            } else if (eventA.id === eventB.id) {
              return 0
            } else {
              return -1
            }
          })
  }


  get timeSortedActivity() {
     return this.props.screenProps.store.activities.map((sensor) => {
        return {
          id: sensor.SensorID,
          type: sensor.SensorType,
          timestamp: sensor.EventDate,
          key: sensor.SensorType,
        }
      }).sort((eventA, eventB) => {
              if (eventA.timestamp < eventB.timestamp) {
                return 1
              } else if (eventA.timestamp === eventB.timestamp) {
                return 0
              } else {
                return -1
              }
            })
          }


  /**
   *
   */
  get roomTypes() {
    return this.activities.map((act) => act.SensorType)
  }

   render() {
          return (<Text>Hello, I'm Empty.</Text>);
      }
}