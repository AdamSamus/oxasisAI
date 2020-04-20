import {DateTime, Duration, Interval} from 'luxon'

/**
 * @param {DateTime} endOfHour a DateTime at the end of an hour
 * @returns {DateTime} the start of the next hour
 */
function startOfNextHour(endOfHour) {
  return endOfHour.plus({hour: 1}).startOf('hour')
}

function buildRange(filterStart, filterEnd) {
  const currentHourEnd = DateTime.fromJSDate(new Date()).endOf('hour')
  const endTime = filterEnd ?
    DateTime.fromJSDate(filterEnd).endOf('hour') :
    currentHourEnd
  const startTime = filterStart ?
    DateTime.fromJSDate(filterStart).startOf('hour') :
    startOfNextHour(endTime.minus({day: 1}))

  return {startTime, endTime}
}

function buildIntervals(filterStart, filterEnd, durationConfig) {
  const {startTime, endTime} = buildRange(filterStart, filterEnd)
  const displayInterval = Interval.fromDateTimes(startTime, endTime)

  return displayInterval.splitBy(Duration.fromObject(durationConfig))
}

const hourIntervals = (startDate, endDate) => {
  return buildIntervals(startDate, endDate, {'hours': 1})
}

export {buildRange, hourIntervals}
