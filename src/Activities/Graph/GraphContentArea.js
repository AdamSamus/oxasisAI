import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import DoorSensorRow from './DoorSensorRow'
import MotionSensorRow from './MotionSensorRow'
import TimeHeader from './TimeHeader'
import SleepTimeBlocks from './SleepTimeBlocks'

import ActivitiesStyles from '../ActivitiesStyles'
export const activityStyles = ActivitiesStyles.createStyles()


/**
 * get count of all events count, if there is empty events, return 0
 *
 * @param {array} doorSensorEvents door Sensor events
 * @param {*} motionSensorEvents motion sensor events
 */
const countSensors = (doorSensorEvents, motionSensorEvents) => {
  return motionSensorEvents && doorSensorEvents ?
    motionSensorEvents.length + doorSensorEvents.length :
    0
}

/**
 * Graph view of Activities Content renderer
 *
 * @param {mixed} activity information that contain the below properties
 *   {array} doorSensorEvents door sensor events
 *   {array} motionSensorEvents motion sensor events
 *   {date} startDate start date of filter
 *   {date} endDate end of date of filter
 *   {array} homeInfo  home main information
 */
export const GraphContentArea = ({doorSensorEvents, motionSensorEvents, startDate, endDate, homeInfo}) => {
  const numSensors = countSensors(doorSensorEvents, motionSensorEvents)
  //console.log(doorSensorEvents)
  return (<View style={activityStyles.dataContainer}>
    <SleepTimeBlocks
      startDate={startDate}
      endDate={endDate}
      homeInfo={homeInfo}
    />
    <TimeHeader startDate={startDate}
                endDate={endDate}
                numSensors={numSensors}
                homeInfo={homeInfo}
    />
    {doorSensorEvents && doorSensorEvents.map((sensor) => {
      return (
        <DoorSensorRow
          {...sensor}
          startDate={startDate}
          endDate={endDate}
          key={sensor.SensorType}
        />
      )
    })}

    {motionSensorEvents && motionSensorEvents.map((sensor) => {
      return (
        <MotionSensorRow
          {...sensor}
          startDate={startDate}
          endDate={endDate}
          key={sensor.SensorType}
        />
      )
    })}
  </View>)
}

GraphContentArea.propTypes = {
  doorSensorEvents: PropTypes.array,
  motionSensorEvents: PropTypes.array,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  homeInfo: PropTypes.object,
}
