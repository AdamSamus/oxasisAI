import React from 'react'
import {
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import {buildRange} from './intervals'

import ActivitiesStyles, {cellWidth, dotDiameter, dotRadius} from '../ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()

/**
 * The renderer of MotionSensorEvent
 *
 * @param {mixed} MotionSensorEvent data object
 *  - {string} startTimeString start time
 *  - {string} endTimeString end time
 *  - graphStartTime start datetime of graph view
 */
const MotionSensorEvent = ({startTimeString, endTimeString, graphStartTime}) => {
  const eventStartTime = DateTime.fromISO(startTimeString)
  const eventEndTime = DateTime.fromISO(endTimeString)
  const {hours: startOffsetHours} = eventStartTime.diff(graphStartTime, 'hours').toObject()
  const {hours: durationHours} = eventEndTime.diff(eventStartTime, 'hours').toObject()

  return (
    <View
      style={{
        ...activityStyles.statusOn,
        left: cellWidth * startOffsetHours - dotRadius,
        width: cellWidth * durationHours + dotDiameter,
      }}
    />
  )
}

MotionSensorEvent.propTypes = {
  startTimeString: PropTypes.string,
  endTimeString: PropTypes.string,
  graphStartTime: PropTypes.instanceOf(DateTime),
}

/**
 * The renderer of MotionSensor row
 *
 * @param {mixed} MotionSensor object
 *  - {array} startTimes the array of start times
 *  - {array} endTimes the array of end times
 *  - {DateTime} startDate the start datetime
 *  - {DateTime} endDate the end datetime
 */
const MotionSensorRow = ({StartTimes: startTimes, EndTimes: endTimes, startDate, endDate}) => {
  const {startTime: graphStartTime} = buildRange(startDate, endDate)

  return (
    <View style={activityStyles.graphRow}>
      {startTimes && startTimes.map((startTimeString, index) => {
        while(index !==startTimes.length){
          return (
              <MotionSensorEvent
                  key={index}
                  startTimeString={startTimeString}
                  endTimeString={endTimes[index]}
                  graphStartTime={graphStartTime}
              />
          )

        }

      })}
    </View>
  )
}

MotionSensorRow.propTypes = {
  StartTimes: PropTypes.arrayOf(PropTypes.string),
  EndTimes: PropTypes.arrayOf(PropTypes.string),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
}

export default MotionSensorRow
