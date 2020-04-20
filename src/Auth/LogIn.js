import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image, Alert,
} from 'react-native'
import BusyButton from '../Common/BusyButton'
import {requiredFields} from '../helpers/forms'
import {Colors} from '../styles'
import base64 from 'react-native-base64'
import LoginStyles from './LogInStyles'
import {oxasisEndpoint, oxasisHeaders} from "../helpers/api";
const loginStyles = LoginStyles.createStyles()

export default class LogIn extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  state = {
    password: '',
    email: '',
  }



  handleSubmit = () => {
    const {screenProps: {auth: {logInUser}}, navigation: {navigate}} = this.props
    const user = {
      password: this.state.password,
      email: this.state.email,
    }
    if (requiredFields(['email', 'password'], ['Email Address', 'Password'], this.state)) {
      logInUser(user, navigate)
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
            <Text style={loginStyles.h1}>Sign In</Text>
            <View style={loginStyles.inputContainer}>
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

            <View style={loginStyles.inputContainer}>
              <Text style={loginStyles.label}>Password</Text>
              <TextInput
                style={loginStyles.input}
                placeholder="password"
                placeholderTextColor={Colors.lightGray}
                onChangeText={(password) => this.setState({password})}
                returnKeyType='go'
                secureTextEntry
                password
                autoCorrect={false}
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
              onPress={
              this.handleSubmit
              }

            >
              <Text style={loginStyles.buttonText}>Sign In</Text>
            </BusyButton>
          </View>
          <View style={loginStyles.helpTextContainer}>
            <TouchableHighlight onPress={() => navigate('ResetPassword')} underlayColor='transparent'>
              <Text style={loginStyles.helpTextLink}>Forgot Your Password?</Text>
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
