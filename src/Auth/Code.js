import React, {Component} from 'react'
import PropTypes from 'prop-types' //checking for React props and similar objects
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native'
import {requiredFields} from '../helpers/forms'
import BusyButton from '../Common/BusyButton'
import {Colors} from '../styles'
import LoginStyles from './LogInStyles'

const loginStyles = LoginStyles.createStyles()
/* eslint-disable camelcase,space-before-function-paren */

export default class RegistrationCode extends Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  state = {
    code: '',
  }

  handleSubmit = () => {
    const {screenProps: {auth: {userByCode}}, navigation: {navigate}} = this.props
    if (requiredFields(['code'], ['Registration Code'], this.state)) {
      userByCode(this.state.code, navigate)
    }
    return false
  }

  render() {
    const {screenProps: {auth: {isFetching}}, navigation: {navigate}} = this.props

    return (
      <View style={loginStyles.pageWrapper}>
        <View style={loginStyles.logoContainer}>
          <Image
            style={loginStyles.logo}
            resizeMode="contain"
            source={require('../../assets/images/logo-IH_blue_gold-small.png')}
          />
        </View>
        <View style={loginStyles.containerExpand}>
          <Text style={loginStyles.h1}>Sign Up</Text>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.label}>Please enter the registration code provided to you in your new user welcome email.</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Registration Code"
              name="registration_code"
              placeholderTextColor={Colors.lightGray}
              onChangeText={(code) => this.setState({code})}
            />
          </View>
        </View>
        <View style={loginStyles.container}>
          <View style={loginStyles.buttonContainer}>
            <BusyButton
              style={loginStyles.button}
              underlayColor={Colors.buttonPrimaryBkgd}
              isBusy={isFetching}
              onPress={this.handleSubmit}
            >
              <Text style={loginStyles.buttonText}>Next</Text>
            </BusyButton>
          </View>
          <View style={loginStyles.helpTextContainer}>
            <Text style={loginStyles.helpText}>Already have an account?</Text>
            <TouchableHighlight onPress={() => navigate('LogIn')} underlayColor='transparent'>
              <Text style={loginStyles.helpTextLink}>Sign In</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}
