import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  Text,
  View,
  Switch,
  TextInput,
} from 'react-native'

import {currentPatientTime, changeTimezoneOnly} from '../helpers/dateTime'
import DateRange from '../Common/DateRange'
import {Colors} from '../styles'
import CalendarStyles from './CalendarStyles'
import {DateTime} from 'luxon'

const calendarStyles = CalendarStyles.createStyles()

export default class EventForm extends Component {
  static propTypes = {
    // event prop is the current event info to display in the UI
    event: PropTypes.shape({
      allDay: PropTypes.bool,
      end: PropTypes.string,
      start: PropTypes.string,
      title: PropTypes.string,
    }),
    // homeInfo is from the homeInfoProvider, and used to handle TZ conversions
    homeInfo: PropTypes.shape({
      DstUtcOffset: PropTypes.number,
      UtcOffset: PropTypes.number,
      TimeZone: PropTypes.string,
    }),
    // onChange prop is called with {fieldName: newValue}
    // and the dates are already ISO strings in the patient's TZ
    onChange: PropTypes.func,
  }

  get defaultStartDate() {
    const {start} = this.props.event

    return start ?
      DateTime.fromISO(start).toJSDate() :
      currentPatientTime(this.patientTimeZone(DateTime.local())).toJSDate()
  }

  get defaultEndDate() {
    const {start, end} = this.props.event
    const existing = end || start

    return existing ?
      DateTime.fromISO(existing).toJSDate() :
      currentPatientTime(this.patientTimeZone(DateTime.local())).toJSDate()
  }

  luxonDate(jsDate) {
    return DateTime.fromJSDate(jsDate)
  }

  patientDateString(luxonDate) {
    return changeTimezoneOnly(luxonDate, this.patientTimeZone(luxonDate))
      .toISO({suppressMilliseconds: true})
  }

  patientTimeZone(luxonDate) {
    const {homeInfo} = this.props

    if (Platform.OS === 'android') {
      // Android react-native lack good Intl support, so we have to do a bit of
      // our date math unfortunately: take the luxonDate local, check if it is DST
      // and then use that to determine whether to use the DST offset from the API
      // or not. Note, this is an imperfect way of doing things, because yes, it
      // is possible for the phone to be in DST and the home isn't or vice versa--
      // for example, if the time is set for exactly midnight on the day of a DST
      // transition or the home is in DST in LA and the phone is in Arizona.
      if (luxonDate.isInDST) {
        return `UTC${homeInfo.DstUtcOffset}`
      } else {
        return `UTC${homeInfo.UtcOffset}`
      }
    } else {
      return homeInfo.TimeZone
    }
  }

  handleUpdateTitle = (title) => this.props.onChange({title})

  handleUpdateAllDay = (allDay) => {
    if (allDay) {
      const {event} = this.props
      const startOfStartDate = DateTime.fromISO(event.start).startOf('day')
      const endOfEndDate = DateTime.fromISO(event.end).endOf('day')

      this.handleStartDateSelection(startOfStartDate.toJSDate())
      this.handleEndDateSelection(endOfEndDate.toJSDate())
    }
    this.props.onChange({allDay})
  }

  /**
   * We're handling all of the patient TZ munging here so the parent components
   * don't have to worry about it. onChange is called with a formatted ISO
   * string in the patient's TZ
   * @param {Date} date javascript Date from the datepicker input
   * @returns {undefined}
   */
  handleStartDateSelection = (date) => {
    const {allDay} = this.props.event
    const startInterval = allDay ? 'day' : 'second'
    const start = this.luxonDate(date).startOf(startInterval)

    this.props.onChange({start: this.patientDateString(start)})
  }
  handleEndDateSelection = (date) => {
    const {allDay} = this.props.event
    const end = allDay ? this.luxonDate(date).endOf('day') : this.luxonDate(date)

    this.props.onChange({end: this.patientDateString(end.startOf('second'))})
  }

  render() {
    const {event} = this.props

    return (
      <View style={calendarStyles.eventForm}>
        <View style={calendarStyles.inputContainer}>
          <TextInput
            style={calendarStyles.input}
            onChangeText={this.handleUpdateTitle}
            placeholder="Event Title"
            placeholderTextColor={Colors.lightGray}
            value={event.title}
          />
        </View>
        <View style={calendarStyles.firstInputRowWrapper}>
          <Text>All-day</Text>
          <Switch
            ios_backgroundColor={Colors.oxasisBlue}
            onValueChange={this.handleUpdateAllDay}
            trackColor={Colors.oxasisBlue}
            thumbColor={Colors.white}
            value={event.allDay}
          />
        </View>
        <DateRange
          allDay={event.allDay}
          allowPastDates={false}
          defaultStartDate={this.defaultStartDate}
          defaultEndDate={this.defaultEndDate}
          onStartDateChange={this.handleStartDateSelection}
          onEndDateChange={this.handleEndDateSelection}
          startDateValue={event.start ? DateTime.fromISO(event.start).toJSDate() : null}
          endDateValue={event.end ? DateTime.fromISO(event.end).toJSDate() : null}
          startLabel='Starts'
          endLabel='Ends'
          styles={calendarStyles}
        />
      </View>
    )
  }
}
