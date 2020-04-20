import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'
import {NavigationEvents} from 'react-navigation';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import ActivitiesStyles from './ActivitiesStyles'
import {Colors} from '../styles'
import ActivityFilterInfo from './ActivityFilterInfo'
import List from './List'
import Graph from './Graph'
import { userAccess } from '../Common/const'



const activityStyles = ActivitiesStyles.createStyles()

export default class ActivityIndex extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
  };



  state = {
    refreshing: false,
    listLoading: false,
    filter: { startDate : new Date(new Date().setDate(new Date().getDate() - 2))}
  };

  pageNumber = 1;

  /* tab selected handler*/
  handleIndexChange = (index) => {
    this.props.screenProps.store.setViewIndex(index)
  };

  loadData = async() => {
    await this.loadHomeInfo()
    await this.loadActivities()
    await this.loadGraphData()
  };

  loadActivities = async() => {
    // audit trail Activities tab open
    userAccess({ activity: 'Activities' })
    await this.props.screenProps.store.fetchSensorEvents(this.props.screenProps.currentUser, this.homeInfo)
  };

  loadGraphData = async() => {
    await this.props.screenProps.store.fetchGraphEvents(this.props.screenProps.currentUser, this.homeInfo, this.state)
  };

  loadHomeInfo = async() => {
    const {currentUser, homeInfoStore} = this.props.screenProps

    if (!homeInfoStore.homeInfo.SleepStartTime) {
      await homeInfoStore.fetchHomeInfo(currentUser)
    }
  };

  /*pull down action*/
  onRefresh = async() => {
    console.log("on refresh triggered")
    this.pageNumber = 1
    this.setState({refreshing: true});
    await this.loadData()
    this.setState({refreshing: false});
  }

  /*Graph view always shows all sensors (i.e. empty sensor filter)*/
  get effectiveFilter() {
    const {filter} = this.props.screenProps.store

    return this.selectedView === 'Graph' ?
      {...filter, sensorTypes: []} :
      filter
  }

  get homeInfo() {
    return this.props.screenProps.homeInfoStore.homeInfo
  }

  get selectedView() {
    return this.props.screenProps.store.selectedView
  }

  get selectedViewIndex() {
    return this.props.screenProps.store.selectedViewIndex
  }

  get sensorEvents() {
    return this.props.screenProps.store.sensorEvents
  }

  get filteredEvents() {
    const {sensorEvents, filter: {sensorTypes}} = this.props.screenProps.store
    const filteredSensors = sensorTypes.length ?
      sensorEvents.filter((sensor) => sensorTypes.includes(sensor.SensorType)) :
      sensorEvents

    return filteredSensors.flatMap((sensor) => {
      return sensor.EventTimes.map((timestamp, index) => {
        return {
          type: sensor.SensorType,
          timestamp,
          key: `${sensor.SensorType}-${timestamp}-${index}`,
        }
      })
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
  listLoading = false
  handleLoadMore = async ()=>{
    //console.log('handleLoadMore:')
    if (!this.listLoading) {
      this.pageNumber++
      this.listLoading = true
      //this.setState({listLoading: true})
      await this.props.screenProps.store.fetchSensorEvents(this.props.screenProps.currentUser, this.homeInfo, this.pageNumber)
      this.listLoading = false
      //this.setState({listLoading: false})
    }
  }


  get view() {
    if (this.selectedView === 'Graph') {
      const {graphEvents, filter: {startDate, endDate} } = this.props.screenProps.store
      return (
<ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
        <Graph
         graphData={graphEvents}
         startDate={startDate}
         endDate={endDate}
         homeInfo={this.homeInfo}

          fetchGraphEvents = {this.props.screenProps.store.fetchGraphEvents}
          currentUser={this.props.screenProps.currentUser}
        />

        </ScrollView>
      )
    } else {
      return(
        <List
          filteredEvents={this.filteredEvents}
          homeInfo={this.homeInfo}
          loading={this.listLoading}
          handleLoadMore={this.handleLoadMore}
        />
      )
    }
  }

  handleFilterClick = () => {
    this.props.navigation.navigate('ActivityFilter')
  }

    render() {
           return (<Text>Hello, I'm Empty.</Text>);
       }
}