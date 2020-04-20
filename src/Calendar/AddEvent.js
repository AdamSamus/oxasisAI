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

export default class AddEvent extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
  }

  state = {
    allDay: true,
    end: null,
    start: null,
    title: null,
  }

  componentDidMount() {
    const {homeInfoStore, currentUser} = this.props.screenProps;

    homeInfoStore.fetchHomeInfo(currentUser)
  }

  getValidationError() {
    const {start, end} = this.state
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
    const {title, start, end} = this.state
    const eventInfo = {title, startDate: start, endDate: end}
    const success = await store.createOutOfHomeEvent(currentUser, eventInfo)

    if (success) {
      this.goBackToCalendar()
    }
  }

  render() {
    const {homeInfo = {}} = this.props.screenProps.homeInfoStore

    return (
      <View style={calendarStyles.container}>
        <Text style={calendarStyles.h1}>New Event</Text>
        <EventForm
          event={this.state}
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
              <Text style={calendarStyles.buttonText}>Add Event</Text>
            </BusyButton>
          </View>
        </View>
      </View>
    )
  }
}
