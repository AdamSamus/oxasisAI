import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native'
import BusyButton from '../Common/BusyButton'
import {requiredFields} from '../helpers/forms'
import {Colors} from '../styles'
import LoginStyles from './LogInStyles'

const loginStyles = LoginStyles.createStyles()

export default class LogIn extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  state = {
    email: '',
  }

  handleSubmit = () => {
    const {screenProps: {auth: {userByEmail}}, navigation: {navigate}} = this.props

    if (requiredFields(['email'], ['Email Address'], this.state)) {
      userByEmail(this.state.email.toLowerCase(), navigate)

      }
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
          <View>
            <Text style={loginStyles.h1}>Reset Password</Text>
            <View style={loginStyles.inputContainer}>
              <View style={loginStyles.helpTextContainer}>
                <Text style={loginStyles.helpText}>This will reset your password. You will be prompted to select a new password when you login.</Text>
              </View>
              <Text style={loginStyles.label}>Email</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="email address"
                placeholderTextColor={Colors.lightGray}
                onChangeText={(email) => this.setState({email})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
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
              <Text style={loginStyles.buttonText}>Reset Password</Text>
            </BusyButton>
          </View>
          <View style={loginStyles.helpTextContainer}>
            <Text style={loginStyles.helpText}>Already have an account?</Text>
            <TouchableHighlight onPress={() => navigate('LogIn')} underlayColor='transparent'>
              <Text style={loginStyles.helpTextLink}>Sign In</Text>
            </TouchableHighlight>
          </View>
          <View style={loginStyles.helpTextContainer}>
            <Text style={loginStyles.helpText}>Don't have an account?</Text>
            <TouchableHighlight onPress={() => navigate('Code')} underlayColor='transparent'>
              <Text style={loginStyles.helpTextLink}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>

      </View>
    )
  }
}
