import React from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'
import {buildRange} from './intervals'

import ActivitiesStyles, {cellWidth} from '../ActivitiesStyles'
const activityStyles = ActivitiesStyles.createStyles()

/**
 * @param {string} sleepTime in the format 7:30 PM
 * @returns {object} like {hour: 19, minute: 30}
 * NOTE: This is ugly b/c the sleep times come in a string format
 * that's not readily parsed by any lib functions I know of
 */
// eslint-disable-next-line complexity
function parseSleepTime(sleepTime) {
  const [_full, hourString, minuteString, ampm] = sleepTime.toLowerCase().match(/^(\d+):(\d+) ([apm]{2})$/)
  const minute = parseInt(minuteString, 10)
  const isPM = ampm === 'pm'

  let hour = parseInt(hourString, 10)

  if (hour === 12) {
    hour = isPM ? 12 : 0
  } else if (isPM) {
    hour += 12
  }
  return {hour, minute}
}

/**
 * Start with the sleep time block beginning in the day before the start of the graph
 * Generate blocks until the next start time is beyond the end time of the graph
 * @param {DateTime} startTime time on the left edge of the graph
 * @param {DateTime} endTime time on the right edge of the graph
 * @param {object} homeInfo homeInfo from the homeInfoProvider
 * @returns {object[]} list of sleep time blocks, consisting of `start` and `durationHours` keys
 */
function sleepTimeBlocks(startTime, endTime, homeInfo) {
  const {SleepStartTime, SleepEndTime} = homeInfo
  const {hour: sleepStartHour, minute: sleepStartMinute} = parseSleepTime(SleepStartTime)
  const {hour: sleepEndHour, minute: sleepEndMinute} = parseSleepTime(SleepEndTime)

  let sleepStart = startTime.minus({day: 1}).set({hour: sleepStartHour, minute: sleepStartMinute})
  const firstSleepEnd = sleepStartHour > sleepEndHour ?
    sleepStart.plus({day: 1}).set({hour: sleepEndHour, minute: sleepEndMinute}) :
    sleepStart.set({hour: sleepEndHour, minute: sleepEndMinute})
  const {hours: sleepDuration} = firstSleepEnd.diff(sleepStart, 'hours').toObject()
  const timeBlocks = []

  while (sleepStart < endTime) {
    timeBlocks.push({start: sleepStart, durationHours: sleepDuration})
    sleepStart = sleepStart.plus({days: 1})
  }
  return timeBlocks
}

const SleepTimeBlocks = ({startDate, endDate, homeInfo}) => {
  const {startTime, endTime} = buildRange(startDate, endDate)

  if (!homeInfo.SleepStartTime || !homeInfo.SleepEndTime) {
    return null
  }

  return (
    <React.Fragment>
      {sleepTimeBlocks(startTime, endTime, homeInfo).map(({start, durationHours}) => {
        const {hours: sleepStartHours} = start.diff(startTime, 'hours').toObject()

        return (
          <View
            key={start.toMillis()}
            style={{
              ...activityStyles.sleepTimeBlock,
              left: sleepStartHours * cellWidth + 1,
              width: durationHours * cellWidth - 2,
            }}
          />
        )
      })}
    </React.Fragment>
  )
}

SleepTimeBlocks.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  homeInfo: PropTypes.object,
}

export default SleepTimeBlocks
