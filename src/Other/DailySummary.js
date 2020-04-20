import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  Linking,
} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {patientTimeZone, toPatientLocalTime} from '../helpers/dateTime'
import {queryString} from '../helpers/format'
import {DateTime} from 'luxon'

import DailySummaryStyles from './DailySummaryStyles'
const styles = DailySummaryStyles.createStyles()

export default class NotificationItem extends Component {
  static propTypes = {
    screenProps: PropTypes.object,
    navigation: PropTypes.object,
  }

  state = {
    summaryID: null,
  }

  // We need to use this in addition to onWillFocus in the event thst someone
  // re-opens the drawer and selects a new Daily Summary, since it doesnt
  // actually blur or focus this page.
  componentWillReceiveProps(nextProps) {
    if (nextProps.navigation.state.params.id !== this.state.summaryID) {
      this.clearSummary()
      this.setState({
        summaryID: nextProps.navigation.state.params.id,
      }, () => {
        this.loadSummary()
      })
    }
  }

  clearSummary = () => {
    this.setState({summary: {}})
  }

  loadSummary = async() => {
    const {
      screenProps: {notificationStore, auth, homeStore},
    } = this.props

    await notificationStore.fetchDailySummary(auth.currentUser, this.state.summaryID)
    await homeStore.fetchHomeInfo(auth.currentUser)
  }

  get addressString() {
    const {screenProps: {homeStore: {homeInfo}}} = this.props

    let string = ''

    if (homeInfo.AddressOne) {
      string += homeInfo.AddressOne
    }

    if (homeInfo.AddressTwo) {
      if (string !== '') {
        string += ', '
      }
      string += homeInfo.AddressTwo
    }

    if (homeInfo.City) {
      if (string !== '') {
        string += ', '
      }
      string += `${homeInfo.City  }, ${  homeInfo.State  } ${  homeInfo.ZipCode}`
    }

    return string
  }

  render() {
    const {
      screenProps: {notificationStore, homeStore, auth},
      navigation: {navigate},
    } = this.props
    const summary = notificationStore.dailySummary(this.state.summaryID)
    const notification = notificationStore.notificationForID(this.state.summaryID)
    const date = notification && notification.SentDateUTC
    const luxonDate = date && DateTime.fromISO(date)
    const timezone = luxonDate && patientTimeZone(luxonDate, homeStore.homeInfo)
    const patientDate = timezone && date && toPatientLocalTime(luxonDate, timezone)

    const query = queryString({
      subject: '',
      cc: auth.currentUser.email,
    })
    const supportURL = ``

    return (
      <ScrollView
        style={styles.pageWrapper}
      >
        <NavigationEvents
          onWillFocus={this.clearSummary}
          onDidFocus={this.loadSummary}
          onDidBlur={this.clearSummary}
        />
        <View style={styles.containerExpand}>
          <Text style={styles.h1}>Daily Activity</Text>
          <Text style={styles.h4}>for {patientDate && patientDate.toFormat('MM/dd/yyyy')}</Text>
          <Text style={styles.bodyText}>
            Below is a record of daily activity for the property monitored at {this.addressString}
          </Text>

          {summary && (
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.h6, styles.tableTextFirst]}>Sensor Type</Text>
                <Text style={[styles.h6, styles.textRight]}>Amount</Text>
                <Text style={[styles.h6, styles.textRight]}>Daily Avg.</Text>
              </View>
              {summary.map((sensor, index) => (
                <SensorDisplay sensor={sensor} key={index} />
              ))}
            </View>
          )}

          <Text style={styles.bodyText}>
            test <Text style={styles.linkText} onPress={() => Linking.openURL(supportURL)}>adad</Text> or <Text style={styles.linkText} onPress={() => navigate('Faq')}>visit the FAQs</Text> selection.
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const SensorDisplay = ({sensor}) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableTextFirst}> {sensor.SensorType} </Text>
    <Text style={[styles.tableText, styles.textRight]}> {sensor.MetricValues.DailyValue} </Text>
    <Text style={[styles.tableText, styles.textRight]}> {sensor.MetricValues.DailyAverage} </Text>
  </View>
)
