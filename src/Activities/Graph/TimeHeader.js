import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import {hourIntervals} from './intervals'
import {DateTime} from 'luxon'
import {patientTimeZone} from '../../helpers/dateTime'

import ActivitiesStyles, {cellHeight} from '../ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()

const TimeHeader = ({startDate, endDate, numSensors, homeInfo}) => {
  return (
    <View style={activityStyles.timeRow}>
      {hourIntervals(startDate, endDate).map((interval) => {
        // Grab the patient (not phone) timezone so we show those in the header
        const patientTimeZoneName = patientTimeZone(interval.start, homeInfo)
        return (
          <View key={interval.start.toMillis()} style={activityStyles.timeCol}>
            <Text style={activityStyles.graphLabel}>
              {interval.start.setZone(patientTimeZoneName).toFormat('M/dd')}
            </Text>
            <Text style={activityStyles.graphLabel}>
              {interval.start.setZone(patientTimeZoneName).toLocaleString(DateTime.TIME_SIMPLE)}
            </Text>
            <View
              style={{
                ...activityStyles.graphColRule,
                height: cellHeight * numSensors,
              }}
            />
          </View>
        )
      })}
    </View>
  )
}

TimeHeader.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  numSensors: PropTypes.number,
}

export default TimeHeader
