import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native'

import SensorIcon from '../../Common/SensorIcons'

import ActivitiesStyles from '../ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()

const GraphRowIcons = ({doorSensorEvents, motionSensorEvents}) => {

  /**
   *
   * @param {mixed} Activity information that contain the below attribute
   *   - {array} doorSensorEvents
   *   - {array} motionSensorEvents
   */
  return (
    <View style={activityStyles.graphLabels}>
      {doorSensorEvents && doorSensorEvents.map(({SensorType: sensorType}) => {
          const iconStyle = sensorType==='Primary Bathroom'
          ?
          [{...activityStyles.graphIcon}, {transform: [{ rotateY: '180deg'}]}]
          :
          activityStyles.graphIcon
        return <View style={activityStyles.graphRowLabel} key={sensorType}>
          <SensorIcon style={iconStyle} size={28} type={sensorType} />
        </View>
      })}

      {motionSensorEvents && motionSensorEvents.map(({SensorType: sensorType}) => {
          const iconStyle = sensorType==='Primary Bathroom'
          ?
          [{...activityStyles.graphIcon}, {transform: [{ rotateY: '180deg'}]}]
          :
          activityStyles.graphIcon
        return <View style={activityStyles.graphRowLabel} key={sensorType}>
          <SensorIcon style={iconStyle} size={28} type={sensorType} />
        </View>
      })}
    </View>
  )
}

GraphRowIcons.propTypes = {
  doorSensorEvents: PropTypes.array,
  motionSensorEvents: PropTypes.array,
}

export default GraphRowIcons
