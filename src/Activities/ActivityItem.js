import React from 'react'
import {Colors, Typography} from '../styles'
import SensorIcon from '../Common/SensorIcons'
import {DateTime} from 'luxon'
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import ActivitiesStyles from './ActivitiesStyles'
import { patientTimeZone, toPatientLocalTime } from '../helpers/dateTime'
const activityStyles = ActivitiesStyles.createStyles()

export default (props) => {
  const {item: event, sensorID, homeInfo} = props
  const now = DateTime.local()
  const eventDate = DateTime.fromISO(event.timestamp)
  const patientTimeZoneName = patientTimeZone(eventDate, homeInfo)
  const eventDateLocal = toPatientLocalTime(eventDate, patientTimeZoneName)
  const todayString = now.toFormat('M/d')
  const eventDayString = eventDateLocal.toFormat('M/d')
  const eventTime = eventDateLocal.toFormat('h:mm a')

  // Drop the date if the date is today
  const dayPart = todayString === eventDayString ? '' : eventDayString
  //console.log(sensorID, event.id)
  const iconStyle = event.type==='Primary Bathroom'?[{...activityStyles.icon}, {transform: [{ rotateY: '180deg'}]}]:activityStyles.icon
  return (
    <TouchableHighlight
      style={[activityStyles.link, ]}
      //style={[activityStyles.link, {backgroundColor: sensorID===event.id?'#fff1da':null}]}
      underlayColor={Colors.navigationBkgdActive}
    >
      <View style={activityStyles.linkContent} underlayColor={Colors.navigationBkgdActive}>
        <View style={{flex: 0.60, flexDirection: 'row'}}>
          <SensorIcon style={iconStyle} size={Typography.bodyLineHeight} type={event.type} />
          <Text style={activityStyles.text}>{event.type}</Text>
        </View>
        <View style={{flex: 0.40}}>
          <Text style={activityStyles.dateText}>{dayPart} {eventTime}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}
