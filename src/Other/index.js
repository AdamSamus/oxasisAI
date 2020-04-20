import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Linking,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native'
import {Spacing, Colors, Containers, Forms, Headers, Buttons, Icons, Typography} from '../styles'


export default class Help extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

      render() {
             return (<Text>Hello, I'm Empty.</Text>);
         }
  }