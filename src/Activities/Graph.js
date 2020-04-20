/*
* Start off scrolled all the way to the right of the graph This only works for iOS because the ScrollView's contentOffset prop isn't supported on Android
* return screenWidth - graphWidth + 100 the 100 is to make up for padding and the left icons
* Scroll all the way to the right of the ScrollView
* This needs to be triggered at mount and again if the ScrollView changes size,
* because its contents don't load all at once (if it's big).
* This means there's some flicker and performance hit,
* so we're only doing this on Android where contentOffset isn't supported
* @returns {undefined}
*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  Platform,
  Text,
  View,
  Alert,
  ScrollView,
} from 'react-native'
import GraphRowIcons from './Graph/GraphRowIcons'
import {GraphContentArea} from './Graph/GraphContentArea'
import {hourIntervals} from './Graph/intervals'
import ActivitiesStyles, {cellWidth} from './ActivitiesStyles'
import {userAccess} from "../Common/const";
var numberOfDays = 2


export const activityStyles = ActivitiesStyles.createStyles()
export default class ActivityGraph extends Component {
  static propTypes = {
    graphData: PropTypes.object,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    homeInfo: PropTypes.object,
  };


loadHomeInfo = async () => {
    const {
        currentUser,
        homeInfoStore
    } = this.props.screenProps
    if (!homeInfoStore.homeInfo.SleepStartTime) {
        await homeInfoStore.fetchHomeInfo(currentUser)
    }
}


state = {
    filter: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 2))
    },
    graphData: this.props.graphData
};


get initialScrollOffset() {
    const {
        startDate,
        endDate
    } = this.props
    const colCount = hourIntervals(this.state.filter.startDate, endDate).length
    const graphWidth = colCount * cellWidth
    const screenWidth = Dimensions.get('window').width
    return graphWidth - screenWidth + 100
}


componentDidMount() {
  /*  setTimeout(() => {
        if (this.scrollView != null) {
            this.scrollView.scrollToEnd({animated: false})
        }
    }, 0.00001);*/
}



onContentSizeChange = (width, height) => {
this.scrollView.scrollTo({x: 3840, y: 0, animated: false})
}


androidAutoScroll = () => {
    if (Platform.OS === 'android' && this.scrollView) {
        this.scrollView.scrollToEnd()
    }
}


  render() {
    const {DoorSensorEvents: doorSensorEvents, MotionSensorEvents: motionSensorEvents} = this.props.graphData
    return (
            <View style={activityStyles.containerNoHorizontalPadding}>
            <Text style={activityStyles.h1}>Activity</Text>
            <View style={activityStyles.graphContainer}>
            <GraphRowIcons
                doorSensorEvents={doorSensorEvents}
                motionSensorEvents={motionSensorEvents}
            />


      <ScrollView
        horizontal
        contentOffset={{x: this.initialScrollOffset}}
        //onContentSizeChange={this.androidAutoScroll}
        onContentSizeChange={this.onContentSizeChange}

      onMomentumScrollBegin  = {
              (event) => {
                  if (this.state.filter.startDate.getDate() == new Date(new Date().setDate(new Date().getDate() - 2)).getDate()) {
                  if (event.nativeEvent.contentOffset.x <= 100){
                      this.setState({
                          filter: {
                              startDate: new Date(new Date().setDate(new Date().getDate() - 4))
                          }
                      }, () => {
                          this.props.fetchGraphEvents(this.props.currentUser, this.props.homeInfo, this.state)
                      })
                      }
                  }else{
                  if (event.nativeEvent.contentOffset.x <= 100){
                  numberOfDays += 2
                      this.setState({
                            filter: {
                                startDate: new Date(new Date().setDate(new Date().getDate() - numberOfDays))
                            }
                        }, () => {
                            this.props.fetchGraphEvents(this.props.currentUser, this.props.homeInfo, this.state)
                        })
                  }
              }
           }
          } ref={(scrollView) => {this.scrollView = scrollView}}
                            >

          <GraphContentArea
              doorSensorEvents={doorSensorEvents}
              motionSensorEvents={motionSensorEvents}
              startDate={(this.props.startDate != null) ? this.props.startDate : this.state.filter.startDate}
              endDate={this.props.endDate}
              homeInfo={this.props.homeInfo}
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}