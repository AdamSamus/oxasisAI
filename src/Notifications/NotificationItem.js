/**
 * It's a component for one notification
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableHighlight } from 'react-native'

import { DateTime } from 'luxon'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SensorIcon from '../Common/SensorIcons'
import Swipeout from 'react-native-swipeout';
import NotificationStyles from './NotificationStyles'
import { Colors } from '../styles'

const styles = NotificationStyles.createStyles()

export default class NotificationItem extends Component {
  static propTypes = {
    notification: PropTypes.shape({
      Body: PropTypes.string,
      ID: PropTypes.number,
      SensorID: PropTypes.number,
      SensorType: PropTypes.string,
      SentDateUTC: PropTypes.string,
      Type: PropTypes.string,
    }),
    dismissing: PropTypes.bool,
    onDismiss: PropTypes.func,
    onSensorClick: PropTypes.func,
    onSummaryClick: PropTypes.func,
    isDailySummary: PropTypes.func,
  }

  /**
   * Listner for press event
   */
  _handleOnPress() {
    const { onSensorClick, notification, onSummaryClick, onFaqClick } = this.props
    const { SensorID, ID, Type } = notification

    if (Type === 'Daily Summary') {
      return onSummaryClick(ID)
    }
    //console.log((Type))
    if (SensorID) {
      return onSensorClick(SensorID)
    }

    if (Type === 'System Issue') {
      return onFaqClick()
    }

    return null
  }

  swipeButtons(notification) {
    return [{
      backgroundColor: Colors.deleteLinkColor,
      color: Colors.white,
      component: <DismissButton />,
      underlayColor: Colors.deleteLinkColor,
      onPress: () => {
        this.props.onDismiss(notification)
      },
    }]
  }

  formatDate(utcDate) {
    return DateTime.fromISO(utcDate).toRelative()
  }

  render() {
    const { dismissing, notification } = this.props
    const { Body, SensorType, SentDateUTC, Type } = notification
    const swipeButtons = this.swipeButtons(notification)
    const bodyText = dismissing ? 'Deleting...' : Body

    return (
        <Swipeout
            autoClose
            backgroundColor={Colors.deleteLinkColor}
            buttonWidth={100}
            right={swipeButtons}
            sensitivity={15}
        >
          <TouchableHighlight
              onPress={() => {
                this._handleOnPress()
              }}
              underlayColor={Colors.buttonSecondaryBkgdActive}
          >
            <View style={styles.notificationItem}>
              <NotificationIcon alertType={Type} sensorType={SensorType} />
              <View style={styles.details}>
                <View style={styles.bodyWrapper}>
                  <Text style={styles.body}>{bodyText}</Text>
                </View>
                {!dismissing && (
                    <View style={styles.smallPrint}>
                      <Text style={styles.time}>{this.formatDate(SentDateUTC)}</Text>
                    </View>
                )}
              </View>
              <Icon style={[styles.icon, styles.iconArrow]} size={28} name="chevron-right" />
            </View>
          </TouchableHighlight>
        </Swipeout>
    );
  }
}

// eslint-disable-next-line complexity
const NotificationIcon = ({ alertType, sensorType }) => {
  const alertIcons = {
    'Daily Summary': 'file-document-box-multiple-outline',
    'Low Battery': 'battery-alert',
    'No Activity': 'radio-tower',
    'default': 'account',
  }
  const iconProps = {
    name: alertIcons[alertType] || alertIcons.default,
    size: styles.icon.width,
    style: styles.icon,
  }
  const iconStyle = sensorType === 'Primary Bathroom' ? [{ ...iconProps.style }, { transform: [{ rotateY: '180deg' }] }]
      : iconProps.style
  if (sensorType && alertType !== 'Low Battery') {
    return <SensorIcon size={iconProps.size} style={iconStyle} type={sensorType} />
  }

  return <Icon {...iconProps} />
}

NotificationIcon.propTypes = {
  alertType: PropTypes.string,
  sensorType: PropTypes.string,
}

const DismissButton = () => (
    <View style={styles.dismissWrapper}>
      <Text style={styles.dismissText}>Delete</Text>
    </View>
)


/*import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableHighlight} from 'react-native'

import {DateTime} from 'luxon'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SensorIcon from '../Common/SensorIcons'
import Swipeout from 'react-native-swipeout';
import NotificationStyles from './NotificationStyles'
import {Colors} from '../styles'

const styles = NotificationStyles.createStyles()

export default class NotificationItem extends Component {
  static propTypes = {
    notification: PropTypes.shape({
      Body: PropTypes.string,
      ID: PropTypes.number,
      SensorID: PropTypes.number,
      SensorType: PropTypes.string,
      SentDateUTC: PropTypes.string,
      Type: PropTypes.string,
    }),
    dismissing: PropTypes.bool,
    onDismiss: PropTypes.func,
    onSensorClick: PropTypes.func,
    onSummaryClick: PropTypes.func,
    isDailySummary: PropTypes.func,
  }

  _handleOnPress() {
    const {onSensorClick, notification, onSummaryClick} = this.props
    const {SensorID, ID, Type} = notification

    if (Type === 'Daily Summary') {
      return onSummaryClick(ID)
    }

    if (SensorID) {
      return onSensorClick(SensorID)
    }

    return null
  }

  swipeButtons(notification) {
    return [{
      backgroundColor: Colors.deleteLinkColor,
      color: Colors.white,
      component: <DismissButton />,
      underlayColor: Colors.deleteLinkColor,
      onPress: () => {
        this.props.onDismiss(notification)
      },
    }]
  }

  formatDate(utcDate) {
    return DateTime.fromISO(utcDate).toRelative()
  }

  render() {
    const {dismissing, notification} = this.props
    const {Body, SensorType, SentDateUTC, Type} = notification
    const swipeButtons = this.swipeButtons(notification)
    const bodyText = dismissing ? 'Deleting...' : Body

    return (
      <Swipeout
        autoClose
        backgroundColor={Colors.deleteLinkColor}
        buttonWidth={100}
        right={swipeButtons}
        sensitivity={15}
      >
        <TouchableHighlight
          onPress={() => {
            this._handleOnPress()
          }}
          underlayColor={Colors.buttonSecondaryBkgdActive}
        >
          <View style={styles.notificationItem}>
            <NotificationIcon alertType={Type} sensorType={SensorType} />
            <View style={styles.details}>
              <View style={styles.bodyWrapper}>
                <Text style={styles.body}>{bodyText}</Text>
              </View>
              {!dismissing && (
                <View style={styles.smallPrint}>
                  <Text style={styles.time}>{this.formatDate(SentDateUTC)}</Text>
                </View>
              )}
            </View>
            <Icon style={[styles.icon, styles.iconArrow]} size={28} name="chevron-right" />
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

// eslint-disable-next-line complexity
const NotificationIcon = ({alertType, sensorType}) => {
  const alertIcons = {
    'Daily Summary': 'file-document-box-multiple-outline',
    'Low Battery': 'battery-alert',
    'No Activity': 'radio-tower',
    'default': 'account',
  }
  const iconProps = {
    name: alertIcons[alertType] || alertIcons.default,
    size: styles.icon.width,
    style: styles.icon,
  }

  if (sensorType && alertType !== 'Low Battery') {
    return <SensorIcon size={iconProps.size} style={iconProps.style} type={sensorType} />
  }

  return <Icon {...iconProps} />
}

NotificationIcon.propTypes = {
  alertType: PropTypes.string,
  sensorType: PropTypes.string,
}

const DismissButton = () => (
  <View style={styles.dismissWrapper}>
    <Text style={styles.dismissText}>Delete</Text>
  </View>
)
*/

