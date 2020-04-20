import React, { Component } from 'react'
import { ScrollView, Text, View, AsyncStorage, ActivityIndicator,} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { container, pageWrapper } from '../styles/components/containers'
import { h1, h6 } from '../styles/components/headers'
import { bodyCopy } from '../styles/components/typography'
import tableStyles from '../styles/components/tables'
import { SharedHeader } from '../Common/SharedHeader'
import { createStackNavigator} from 'react-navigation'
import { Subscribe } from 'unstated'
import { AuthContainer } from '../state/authStateProvider'
import { HomeInfoContainer } from '../state/homeInfoProvider'
import { ActivitiesContainer } from '../state/activitiesStateProvider'
import {Colors, Containers, Typography} from '../styles'
import PropTypes from 'prop-types'
import { oxasisEndpoint, oxasisHeaders } from '../helpers/api'
import { userAccess} from '../Common/const'
import { Tooltip} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SensorIcon from '../Common/SensorIcons'
import ActivitiesStyles from '../Activities/ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()

const SensorDisplay = ({sensorKey, daily, average, dailya, dailyb}) => (
  <View style={tableStyles.tableRow}>
    <Text style={[tableStyles.tableTextFirst, {alignSelf: 'center'}]}>  {sensorKey}</Text>
                        <Text style={[tableStyles.tableText, {alignSelf: 'center'}]}> {dailyb}</Text>
                        <Text style={[tableStyles.tableText, {alignSelf: 'center'}]}> {dailya}</Text>
                        <Text style={[tableStyles.tableText, {alignSelf: 'center'}]}>{daily}</Text>
        <View style={[tableStyles.tableAverage, {alignSelf: 'center'}]}><Text style={{fontWeight: 'bold', color: Colors.oxasisBlue}}> {average}</Text></View>
  </View>
)

SensorDisplay.propTypes = {
  sensorKey: PropTypes.string,
  average: PropTypes.number,
  daily: PropTypes.number,
}

var pink = 0
const Loading = () =>{ return <View style={tableStyles.tableRow}></View>}

/** format the time string coming out of the home info store
   * @param {string} timeString from homeInfo, formatted like '7:30 AM'
   * @returns {string} formatted like '7:30pm' */

function formatTime(timeString) {
  return timeString && timeString.replace(' ', '').toLowerCase()
}

function summaryLabel(daily, i) {
  return daily && daily[i].SummaryDate || ''
}

function iconStyle(sensorKey){
return sensorKey=='Primary Bathroom'?[{...activityStyles.icon}, {transform: [{ rotateY: '180deg'}]}]:activityStyles.icon
}


const DataSection = ({daily, average, title, isFetching, startTime, endTime}) => {
  return (
    <View style={tableStyles.tableWrapper}>
      <View style={tableStyles.tableWrapperHeaders}>
        <Text style={tableStyles.tableWrapperHeader}>{title}</Text>
        <Text style={tableStyles.tableWrapperHeader}>{formatTime(startTime)} - {formatTime(endTime)}</Text>
      </View>
      <View style={tableStyles.tableContainer}>
        <View style={tableStyles.tableHeader}>
          <Text style={{...h6, ...tableStyles.tableTextFirst}}>Sensor</Text>
            <Text style={{...h6, ...tableStyles.tableText}}>{summaryLabel(daily, 2)}</Text>
            <Text style={{...h6, ...tableStyles.tableText}}>{summaryLabel(daily, 1)}</Text>
            <Text style={{...h6, ...tableStyles.tableText}}>{summaryLabel(daily, 0)}</Text>
            <Text style={[{...h6, ...tableStyles.tableText}]}>   Average</Text>
        </View>

{daily && Object.keys(daily[1].SummaryData).map((sensorKey) => (
          <SensorDisplay
            sensorKey={<SensorIcon type={sensorKey}
            style={sensorKey==='Primary Bathroom'?[{...activityStyles.icon}, {transform: [{ rotateY: '180deg'}]}]:activityStyles.icon} size={Typography.bodyLineHeight} />}
            daily={daily[0].SummaryData[sensorKey]}
            dailya={daily[1].SummaryData[sensorKey]}
            dailyb={daily[2].SummaryData[sensorKey]}
            average={average.SummaryData[sensorKey]}
            key={sensorKey}
          />
        ))}
        {isFetching}
      </View>
    </View>
  )
}

DataSection.propTypes = {
  average: PropTypes.object,
  daily: PropTypes.object,
  title: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  isFetching: PropTypes.bool,
}

class AveragesIndex extends Component {
  static propTypes = {
    authStore: PropTypes.object,
    homeInfoStore: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  get sleepTimes() {
    const {homeInfoStore} = this.props
    const {SleepStartTime: sleepStart, SleepEndTime: sleepEnd} = homeInfoStore.homeInfo
    return {sleepStart, sleepEnd}
  }

  /**
   * It will calling when get focus to average view.
   */
   fetchInfo = async () => {
    /**
     * reset filter
     */


    await this.resetfilter()
    this.fetchHomeInfo()
    this.fetchSummary()
  }

  async resetfilter() {

    const {currentUser} = this.props.authStore
    // audit trail Average tab open
    userAccess({

      activity: 'Average'
    })
     await this.props.store.applyFilter(currentUser, {
      endDate: null,
      sensorTypes: [],
      startDate: null
    })
  }
  fetchHomeInfo = () => {
    const {currentUser} = this.props.authStore
    this.props.homeInfoStore.fetchHomeInfo(currentUser)
  }

  fetchSummary = async() => {
    try {
      const json = await AsyncStorage.getItem('SummaryData')
      if (json) {
             const jsonData = JSON.parse(json);
             if (jsonData) {
               this.setState({
                 ...jsonData
               })
             }
           }
           this.setState({isFetching: true})
           const user = this.props.authStore.currentUser
           const url = oxasisEndpoint('TrendDetail')
           const resp = await fetch(url, {
             method: 'GET',
             headers: oxasisHeaders(user),
           })
           const result = await resp.json()
           console.log(JSON.stringify(result))
           await AsyncStorage.setItem('SummaryData', JSON.stringify(result));
           this.setState({...result, isFetching: false})
         } catch (e) {
           Alert.alert('There was an error', 'We were unable to fetch the daily summary.')
         } finally {
           this.setState({isFetching: false})
         }
  }


render() {
  if (this.state.isFetching && !this.state.refreshing) {
    if (pink ==0 ){
    pink =1
          return (
              <View style={{...Containers.containerHorizontal,}}>
              <ActivityIndicator size="large" color={Colors.blue} />
            </View>
          )
    }
}

    const {DayAverages, NightAverages, DaySummaries, NightSummaries} = this.state
    const {sleepStart, sleepEnd} = this.sleepTimes

/*<Text style={bodyCopy}>Average sensor activity during Active Time and Sleep Time.</Text>*/
    return <ScrollView style={pageWrapper}>
        <NavigationEvents onDidFocus={this.fetchInfo} />

<View style={container}>
    <View>
        <Tooltip popover={<Text style={{fontSize: 16}}>Average sensor activity during Active Time and Sleep Time. Go to home profile to edit Active/Sleep time.</Text>} backgroundColor={'rgb(240, 179, 16)'} height={80} width={300}>
            <View style={{ alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{textAlign: 'center'}} ><Text style={[h1, {textAlign: 'center'}]}>Averages  </Text></Text>
            <Icon name="info" size={30} color='#F0AD00'/>
            </View>
        </Tooltip>
    </View>

        <DataSection
          title="Active Time"
          daily={DaySummaries}
          average={DayAverages}
          //isFetching={this.state.isFetching}
          startTime={sleepEnd}
          endTime={sleepStart}
        />
        <DataSection
          title="Sleep Time"
          daily={NightSummaries}
          average={NightAverages}
          //isFetching={this.state.isFetching}
          startTime={sleepStart}
          endTime={sleepEnd}
        />
      </View>
    </ScrollView>
  }
}

class ConnectedAveragesIndex extends Component {
   render() {
          return (<Text>Hello, I'm Empty.</Text>);
      }
}

const AveragesStack = createStackNavigator({
  Averages: { screen: ConnectedAveragesIndex,navigationOptions: ({navigation}) => ({...SharedHeader(navigation), }),},
})

export default AveragesStack
