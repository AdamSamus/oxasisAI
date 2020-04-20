import React from 'react'
import {
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import {buildRange} from './intervals'

import ActivitiesStyles, {cellWidth, dotRadius} from '../ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()
/**
 * Door Sensor event renderer
 *
 * @param {string} eventTimeString event time string formatted iso
 * @param {Date} startTime Door filter start time
 */
const DoorSensorEvent = ({eventTimeString, startTime}) => {
  const eventTime = DateTime.fromISO(eventTimeString)
  // get diff hours
  const {hours} = eventTime.diff(startTime, 'hours').toObject()

  return <View style={{...activityStyles.statusOn, left: hours * cellWidth - dotRadius}} />
}

DoorSensorEvent.propTypes = {
  eventTimeString: PropTypes.string,
  startTime: PropTypes.instanceOf(DateTime),
}

/**
 * The renderer for every Door Sensor
 *
 * @param {eventTimes} Array of event date
 * @param startDate start date
 * @param endDate end date
 */

const DoorSensorRow = ({EventTimes: eventTimes, startDate, endDate}) => {
  const {startTime} = buildRange(startDate, endDate)

  return (
    <View style={activityStyles.graphRow}>
      {eventTimes && eventTimes.map((eventTimeString, index) => {
        return (
          <DoorSensorEvent
            key={index}
            eventTimeString={eventTimeString}
            startTime={startTime}
          />
        )
      })}
    </View>
  )
}

DoorSensorRow.propTypes = {
  EventTimes: PropTypes.arrayOf(PropTypes.string),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
}

export default DoorSensorRow
