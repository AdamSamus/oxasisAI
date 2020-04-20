import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native'
import BusyButton from '../Common/BusyButton'
import {requiredFields} from '../helpers/forms'

import {Colors} from '../styles'
import LoginStyles from './LogInStyles'

const loginStyles = LoginStyles.createStyles()

/* eslint-disable camelcase,space-before-function-paren */

export default class SignUp extends Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  state = {
    password: '',
    passwordConfirmation: '',
  }

  handleSubmit = () => {
    try{
    const {screenProps: {auth: {currentUser, createUser, replaceUserPassword}}, navigation: {navigate}} = this.props

    if (requiredFields(['password', 'passwordConfirmation'], ['Password', 'Password Confirmation'], this.state)) {
      if (this.state.password === this.state.passwordConfirmation) {
        const user = {
          ...currentUser,
          password: this.state.password,
          password_confirmation: this.state.passwordConfirmation,
        }
        /*if (currentUser.temporary_password) {
          replaceUserPassword(user, navigate)
        } else */{
          createUser(user, navigate)
        }
      } else {
        Alert.alert('There was an error', 'Password did not match Password Confirmation')
      }
    }
    }catch(e){
      console.log(e)
    }
  }

  render() {
    const {screenProps: {auth: {currentUser, isFetching}}} = this.props

    return (
      <ScrollView style={loginStyles.pageWrapper}>

        <View style={loginStyles.logoContainer}>
          <Image
            style={loginStyles.logo}
            resizeMode="contain"
            source={require('../../assets/images/logo-IH_blue_gold-small.png')}
          />
        </View>
        <View style={loginStyles.containerExpand}>
          <Text style={loginStyles.h1}>{currentUser.temporary_password ? 'Reset Password' : 'Sign Up'}</Text>
          <View style={loginStyles.staticInputContainer}>
            <Text style={loginStyles.staticInputLabel}>Email Address:</Text>
            <Text>{currentUser.EmailAddress}</Text>
          </View>
          <View style={loginStyles.staticInputContainer}>
            <Text style={loginStyles.staticInputLabel}>Mobile Phone:</Text>
            <Text>{currentUser.MobileNumber}</Text>
          </View>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.label}>Password</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Password"
              placeholderTextColor={Colors.lightGray}
              onChangeText={(password) => this.setState({password})}
              returnKeyType='go'
              secureTextEntry
              password
              autoCorrect={false}
            />
          </View>
          <View style={loginStyles.inputContainer}>
            <Text style={loginStyles.label}>Confirm Password</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.lightGray}
              onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
              returnKeyType='go'
              secureTextEntry
              password
              autoCorrect={false}
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
          <View  style={loginStyles.helpTextContainer}>
            <Text style={loginStyles.helpText}>Already have an account?</Text>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('LogIn')} underlayColor='transparent'>
              <Text style={loginStyles.helpTextLink}>Sign In</Text>
            </TouchableHighlight>
          </View>
        </View>

      </ScrollView>
    )
  }
}
