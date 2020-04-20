import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import {View, Text, TouchableHighlight} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

import {Colors} from '../styles'

const ViewState = {
  Default: 'default',
  StartDatePicker: 'startDatePicker',
  EndDatePicker: 'endDatePicker',
}

// displays two date pickers, one for start and one for end
// with a label on the left and a clickable placeholder or current value on the right
// meant to stack vertically inside a form with other inputs
export default class DateRange extends Component {
  static propTypes = {
    allDay: PropTypes.bool,
    allowFutureDates: PropTypes.bool,
    allowPastDates: PropTypes.bool,
    defaultStartDate: PropTypes.object, // js date (picker starting point)
    defaultEndDate: PropTypes.object, // js date (picker starting point)
    onStartDateChange: PropTypes.func.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    startLabel: PropTypes.string,
    endLabel: PropTypes.string,
    startDateValue: PropTypes.object, // js date (selected value to display)
    endDateValue: PropTypes.object, // js date (selected value to display)
    styles: PropTypes.shape({
      dateRangeContainer: PropTypes.object,
      inputRowWrapper: PropTypes.object,
      placeholder: PropTypes.object,
    }),
  }

  static defaultProps = {
    allDay: false,
    allowFutureDates: true,
    allowPastDates: true,
    startLabel: 'From Date',
    endLabel: 'To Date',
  }

  state = {
    view: ViewState.Default,
  }

  get defaultStartDate() {
    const {startDateValue, defaultStartDate} = this.props

    return startDateValue || defaultStartDate
  }

  get defaultEndDate() {
    const {endDateValue, defaultEndDate} = this.props

    return endDateValue || defaultEndDate
  }

  get shouldShowStartDatePicker() {
    return this.state.view === ViewState.StartDatePicker
  }

  get shouldShowEndDatePicker() {
    return this.state.view === ViewState.EndDatePicker
  }

  datePickerProps() {
    return {
      is24Hour: false,
      minuteInterval: 15,
      mode: this.props.allDay ? 'date' : 'datetime',
      onCancel: this.handleCancelDatePicker,
      ...this.dateRestrictions(),
    }
  }

  dateRestrictions() {
    const {allowFutureDates, allowPastDates} = this.props
    const now = new Date()
    now.setDate(now.getDate() - 60); //so users can select a date in the past for add event. now it is up to 60 days in the past.


    const dateRestrictions = {}

    if (!allowPastDates) {
      dateRestrictions.minimumDate = now
    }
    if (!allowFutureDates) {
      dateRestrictions.maximumDate = now
    }
    return dateRestrictions
  }

  formatDate = (date) => {
    const {allDay} = this.props
    const dateFormat = 'LLLL d, yyyy'
    const format = allDay ? dateFormat : `${dateFormat} 'at' h:mm a`

    return DateTime.fromJSDate(date).toFormat(format)
  }

  handleClickStartDate = () => this.setState({view: ViewState.StartDatePicker})
  handleClickEndDate = () => this.setState({view: ViewState.EndDatePicker})
  handleCancelDatePicker = () => this.setState({view: ViewState.Default})
  handleStartDateSelection = (date) => {
    this.props.onStartDateChange(date)
    this.handleCancelDatePicker()
  }
  handleEndDateSelection = (date) => {
    this.props.onEndDateChange(date)
    this.handleCancelDatePicker()
  }

  render() {
    const {styles, startDateValue, endDateValue, startLabel, endLabel} = this.props

    return (
      <View style={styles.dateRangeContainer}>
        <TouchableHighlight
          onPress={this.handleClickStartDate}
          underlayColor={Colors.buttonSecondaryBkgdActive}
        >
          <View style={styles.inputRowWrapper}>
            <Text>{startLabel}</Text>
            <DateValueDisplay
              value={startDateValue}
              formatter={this.formatDate}
              placeholderStyle={styles.placeholder}
            />
          </View>
        </TouchableHighlight>
        <DateTimePicker
          date={this.defaultStartDate}
          isVisible={this.shouldShowStartDatePicker}
          onConfirm={this.handleStartDateSelection}
          {...this.datePickerProps()}
        />
        <TouchableHighlight
          onPress={this.handleClickEndDate}
          underlayColor={Colors.buttonSecondaryBkgdActive}
        >
          <View style={styles.inputRowWrapper}>
            <Text>{endLabel}</Text>
            <DateValueDisplay
              value={endDateValue}
              formatter={this.formatDate}
              placeholderStyle={styles.placeholder}
            />
          </View>
        </TouchableHighlight>
        <DateTimePicker
          date={this.defaultEndDate}
          isVisible={this.shouldShowEndDatePicker}
          onConfirm={this.handleEndDateSelection}
          {...this.datePickerProps()}
        />
      </View>
    )
  }
}

const DateValueDisplay = ({value, formatter, placeholderStyle}) => {
  return value ? (
    <Text>{formatter(value)}</Text>
  ) : (
    <Text style={placeholderStyle}>choose a date</Text>
  );
}

DateValueDisplay.propTypes = {
  formatter: PropTypes.func,
  placeholderStyle: PropTypes.object,
  value: PropTypes.object,
}
