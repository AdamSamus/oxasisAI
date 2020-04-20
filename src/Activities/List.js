import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import ActivitiesStyles from './ActivitiesStyles'
import ActivityItem from './ActivityItem'

const activityStyles = ActivitiesStyles.createStyles()

export default class ActivityList extends Component {
  static propTypes = {
    filteredEvents: PropTypes.arrayOf(PropTypes.object),
    homeInfo: PropTypes.object,
  }


 renderFooter = () => {
   //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.props.loading) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    )
  }

  render() {
    //console.log('this.props.filteredEvents:', this.props.filteredEvents.length)
    return (
      <View style={activityStyles.container}>
        <FlatList
          data={this.props.filteredEvents}
          extraData={this.props.filteredEvents}
          /*renderItem={(item) => <ActivityItem {...item} homeInfo={this.props.homeInfo} />}*/
          renderItem={(item) => <ActivityItem {...item} homeInfo={this.props.homeInfo} sensorID={''} />}
          ListHeaderComponent={<Text style={activityStyles.h1}>Activity</Text>}
          ListEmptyComponent={<Text style={activityStyles.text}>No activity found matching your selection</Text>}
          onEndReachedThreshold={0.6}
          onEndReached={this.props.handleLoadMore}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    )
  }
}
