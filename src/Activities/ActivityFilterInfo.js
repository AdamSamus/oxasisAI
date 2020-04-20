import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableHighlight} from 'react-native'
import {DateTime} from 'luxon'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles'

/**
 * is filter empty
 * @param {mixed} filterProps filter
 * @return true if the filter is empty
 */
function isEmptyFilter(filterProps) {
  const {startDate, endDate, sensorTypes} = filterProps

  return !(startDate || endDate || sensorTypes.length)
}

/**
 * human readable filter date string from filter date range
 *
 * @param {DateTime} startDate start date
 * @param {DateTime} endDate end date
 * @return {string} readable date range string
 */

// eslint-disable-next-line complexity
function dateFilterString(startDate, endDate) {
  const format = (date) => DateTime.fromJSDate(date).toFormat("LLL d 'at' h:mm a")

  if (startDate && endDate) {
    return `from ${format(startDate)} to ${format(endDate)}`
  } else if (startDate) {
    return `after ${format(startDate)}`
  } else if (endDate) {
    return `before ${format(endDate)}`
  }
  return 'for all dates';
}

function sensorFilterString(sensorTypes) {
  if (sensorTypes.length === 0) {
    return 'all activity'
  }

  if (sensorTypes.length < 3) {
    return `${sensorTypes.join(' and ')} activity`
  }
  return `${sensorTypes.slice(0, -1).join(', ')}, and ${sensorTypes[sensorTypes.length - 1]} activity`
}

/**
 * The banner on top of a filtered activities view, describing the current filter
 * @param {object} params params for the component
 * @returns {JSX} some JSX to render
 */
function ActivityFilterInfo({filter, onClick, styles}) {
  if (isEmptyFilter(filter)) {
    return null
  }
  const {startDate, endDate, sensorTypes} = filter

  return (
    <TouchableHighlight
      onPress={onClick}
      underlayColor={Colors.buttonSecondaryBkgdActive}
    >
      <View style={styles.filterInfoContainer}>
        <Icon style={styles.filterIcon} name='filter' size={styles.filterIcon.width} />
        <Text style={styles.filterText}>
          Displaying {sensorFilterString(sensorTypes)} {dateFilterString(startDate, endDate)}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

ActivityFilterInfo.propTypes = {
  filter: PropTypes.shape({
    startDate: PropTypes.object, // js date
    endDate: PropTypes.object, // js date
    sensorTypes: PropTypes.arrayOf(PropTypes.string),
  }),
  onClick: PropTypes.func,
  styles: PropTypes.object,
}

export default ActivityFilterInfo
