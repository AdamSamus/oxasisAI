import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'

import BusyButton from '../Common/BusyButton'
import EventForm from './EventForm'
import {Colors} from '../styles'
import CalendarStyles from './CalendarStyles'
import {DateTime} from 'luxon'

const calendarStyles = CalendarStyles.createStyles()

export default class EditEvent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
  }

  // state stores only the _changes_ made on top of the original event
  state = {}

  componentDidMount() {
    const {homeInfoStore, currentUser} = this.props.screenProps;

    homeInfoStore.fetchHomeInfo(currentUser)
  }

  getValidationError() {
    const {start, end} = this.mergedEvent
    const requiredFields = [start, end];

    if (requiredFields.filter(Boolean).length < requiredFields.length) {
      return 'Please choose a start and end date'
    } else if (DateTime.fromISO(start) > DateTime.fromISO(end)) {
      return 'Please make sure the start date is before the end date'
    }

    return null
  }

  goBackToCalendar = () => {
    this.props.navigation.navigate('Calendar')
  }

  isAllDay({StartDate, EndDate}) {
    return DateTime.fromISO(StartDate).toFormat('HH:mm') === '00:00' &&
      DateTime.fromISO(EndDate).toFormat('HH:mm') === '23:59'
  }

  /**
   * The current effective event, calculated by applying the user's changes
   * (from state) on top of the original event.
   * There's some extra logic for allDay b/c the UI needs to know about it but
   * it doesn't get stored in the database / returned from the API
   */
  get mergedEvent() {
    const {StartDate, EndDate, Title} = this.originalEvent
    const allDay = typeof this.state.allDay === 'undefined' ?
      this.isAllDay(this.originalEvent) :
      this.state.allDay

    return {
      start: StartDate,
      end: EndDate,
      title: Title,
      ...this.state,
      allDay,
    }
  }

  get originalEvent() {
    return this.props.navigation.state.params.event

  }

  get saveInProgress() {
    return this.props.screenProps.store.saveInProgress
  }

  handleChange = (change) => {
    this.setState(change)
  }

  handleSubmit = async() => {
    const errorMessage = this.getValidationError()

    if (errorMessage) {
      Alert.alert('Invalid event info', errorMessage)
      return
    }

    const {currentUser, store} = this.props.screenProps
    const {title, start, end} = this.mergedEvent
    const eventInfo = {title, startDate: start, endDate: end}
    const success = await store.updateOutOfHomeEvent(currentUser, this.originalEvent.StartDate, eventInfo)

    if (success) {
      this.goBackToCalendar()
    }
  }

  render() {
    const {homeInfo = {}} = this.props.screenProps.homeInfoStore

    return (
      <View style={calendarStyles.container}>
        <Text style={calendarStyles.h1}>Edit Event</Text>
        <EventForm
          event={this.mergedEvent}
          homeInfo={homeInfo}
          onChange={this.handleChange}
        />
        <View style={calendarStyles.buttonGroup}>
          <TouchableHighlight
            style={calendarStyles.buttonGroupContainerLeft}
            onPress={this.goBackToCalendar}
            underlayColor={Colors.buttonSecondaryBkgdActive}
          >
            <View style={calendarStyles.buttonSecondary}>
              <Text style={calendarStyles.buttonSecondaryText}>Cancel</Text>
            </View>
          </TouchableHighlight>
          <View style={calendarStyles.buttonGroupContainerRight}>
            <BusyButton
              isBusy={this.saveInProgress}
              style={calendarStyles.button}
              onPress={this.handleSubmit}
              underlayColor={Colors.buttonPrimaryBkgdActive}
            >
              <Text style={calendarStyles.buttonText}>Save</Text>
            </BusyButton>
          </View>
        </View>
      </View>
    )
  }
}
