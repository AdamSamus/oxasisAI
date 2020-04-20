import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import {NavigationEvents} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../styles'
import CalendarStyles from './CalendarStyles'
import {DateTime} from 'luxon'
import { patientTimeZone, toPatientLocalTime } from '../helpers/dateTime';
import {userAccess} from '../Common/const'

const calendarStyles = CalendarStyles.createStyles()


export default class CalendarIndex extends Component {
      render() {
             return (<Text>Hello, I'm Empty.</Text>);
         }
   }