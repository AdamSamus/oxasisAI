/* activity filter screen.*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Alert, View, Text, TouchableHighlight} from 'react-native'

import ActivitiesStyles from './ActivitiesStyles'
import {Colors} from '../styles'
import CheckboxList from '../Common/CheckboxList'
import DateRange from '../Common/DateRange'
import {patientTimeZone, currentPatientTime} from '../helpers/dateTime'
const styles = ActivitiesStyles.createStyles()

/* Filter component of Activity*/
export default class ActivityFilter extends Component {
constructor() {
    super()
    }

  static propTypes = {
        navigation: PropTypes.object,
        screenProps: PropTypes.object,
  }

  /*state only tracks the _changes_ from what's already saved in the store*/
  state = {
    filter: {}
  }

  componentDidMount() {
    const {currentUser, homeInfoStore, store} = this.props.screenProps
    if (!this.patientTimeZone) {
      homeInfoStore.fetchHomeInfo(currentUser)
    }
    if (!store.activities.length) {
      store.mostRecent(currentUser)
    }

    this.focusListener = this.props.navigation.addListener('didFocus', async () => {
      this.handleResetFilter()
    });
  }


  /*get default start date of filter */
  get defaultStartDate() {
    // get start date of effectiveFilter (this is fetched from activity store)
    // if it is null, return previous last timezone value that before one minute
    return this.effectiveFilter.startDate || currentPatientTime(this.patientTimeZone).minus({days: 1}).toJSDate()

    currentPatientTime(this.patientTimeZone(DateTime.local())).toJSDate()

  }

  /*get default end date of filter */
  get defaultEndDate() {
    return this.effectiveFilter.endDate ||  currentPatientTime(this.patientTimeZone).toJSDate()

  }

  /* get effective filter from activities provider*/
  get effectiveFilter() {
    const {filter} = this.props.screenProps.store
    console.log('prop:', filter)
    console.log('state:', this.state.filter)
    return {...filter, ...this.state.filter};
  }

  /*get home information using homeInfoProvider*/
  get patientTimeZone() {
    return this.props.screenProps.homeInfoStore.homeInfo.TimeZone
  }

  /*get sensor option*/
  get sensorOptions() {
    const {activities} = this.props.screenProps.store
    const typeMap = activities.reduce((map, event) => ({...map, [event.SensorType]: true}), {})
    return Object.keys(typeMap).sort().map((type) => ({
      label: type,
      selected: this.isSensorSelected(type),
      value: type,
    }));
  }

  /*check the sensor type in the effective filter
   * @param {string} type sensor type*/
  isSensorSelected(type) {
    const {sensorTypes} = this.effectiveFilter
    const x = sensorTypes.includes(type)
    return x
  }

  //eslint-disable-next-line complexity
  getValidationError() {
    const {startDate, endDate} = this.effectiveFilter
    if (startDate && endDate && startDate > endDate) {
      return 'Please make sure the start date is before the end date'
    }
    return null
  }

  /*filter the activities using current filter*/
  handleApplyFilter = async() => {
    const {currentUser, store} = this.props.screenProps
    const errorMessage = this.getValidationError()

    if (errorMessage) {
      Alert.alert('Invalid filter', errorMessage)
      return
    }
    await store.applyFilter(currentUser, this.effectiveFilter)
    this.props.navigation.goBack()
  }

  /*reset filter*/
  handleResetFilter = () => {
    this.props.screenProps.store.resetFilter()
    this.setState({filter: {}})
  }

  /*toggle sensor type handler*/
  handleSensorToggle = (sensorType) => {
    const {sensorTypes} = this.effectiveFilter

    let newTypes;

    if (this.isSensorSelected(sensorType)) {
      newTypes = sensorTypes.filter((type) => type !== sensorType)
    } else {
      newTypes = [...sensorTypes, sensorType].sort();
    }
    this.setState((state) => ({filter: {...state.filter, sensorTypes: newTypes}}))
  }

  /*select start date handler*/
  handleStartDateSelection = (date) => this.setState((state) => ({
    filter: {
      ...state.filter,
      startDate: date,
    },
  }))

  /*handle end date handler*/
  handleEndDateSelection = (date) => this.setState((state) => ({
    filter: {
      ...state.filter,
      endDate: date,
    },
  }))


  render() {
    const {startDate, endDate} = this.effectiveFilter
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.h4}>Filter Activities</Text>
          <View style={styles.checkboxListRow}>
            <Text>Sensor(s)</Text>
            <CheckboxList
              onToggleSelection={this.handleSensorToggle}
              options={this.sensorOptions}
            />
          </View>
          <DateRange
            allowFutureDates={true}
          /*defaultStartDate={this.defaultStartDate}
            defaultEndDate={this.defaultEndDate}*/
            onStartDateChange={this.handleStartDateSelection}
            onEndDateChange={this.handleEndDateSelection}
            startDateValue={startDate}
            endDateValue={endDate}
            styles={styles}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableHighlight
            style={styles.buttonGroupContainerLeft}
            onPress={this.handleResetFilter}
            underlayColor={Colors.buttonSecondaryBkgdActive}
          >
            <View style={styles.buttonSecondary}>
              <Text style={styles.buttonSecondaryText}>Reset</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonGroupContainerRight}
            onPress={this.handleApplyFilter}
            underlayColor={Colors.buttonPrimaryBkgdActive}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Apply</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
