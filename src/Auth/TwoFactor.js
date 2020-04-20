import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native'
import {requiredFields} from '../helpers/forms'
import BusyButton from '../Common/BusyButton'
import DismissKeyboard from '../Common/DismissKeyboard'
import {Colors} from '../styles'
import LoginStyles from './LogInStyles'

const loginStyles = LoginStyles.createStyles()

/* eslint-disable camelcase,space-before-function-paren */
export default class TwoFactor extends Component {
  static propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  state = {
    verificationCode: '',
  }

/*  constructor(props) {
    super(props);
    const {screenProps: {auth: {resetPassword}}} = this.props
    console.log("using email : "+ this.props.navigation.state.params.toLowerCase())
    resetPassword(this.props.navigation.state.params.toLowerCase())
  }*/

  handleSubmit = () => {
    console.log("two factor reached")
    try{

    const {screenProps: {auth: {sendVerificationCode}},  navigation: {navigate}} = this.props


    if (requiredFields(['verificationCode'], ['Verification Code'], this.state)) {
      sendVerificationCode(this.props.navigation.state.params.email, this.state.verificationCode, navigate)
    }

    return false
    }catch(e){
      console.log(e)
    }
  }

  componentDidMount() {
    const {screenProps: {auth: {resetPassword}}} = this.props
    resetPassword(this.props.navigation.state.params.email)
    console.log("email sent to :" + this.props.navigation.state.params.email)
    }

  render() {
    const {screenProps: {auth: {isFetching}}} = this.props


    return (
      <DismissKeyboard style={loginStyles.pageWrapper}>
        <View style={loginStyles.logoContainer}>
          <Image
            style={loginStyles.logo}
            resizeMode="contain"
            source={require('../../assets/images/logo-IH_blue_gold-small.png')}
          />
        </View>
        <View style={loginStyles.containerExpand}>
          <Text style={loginStyles.h1}>ID Verification</Text>
          <Text style={loginStyles.label}>
            A verification code has been sent to the phone number on file. Please enter the code below.
          </Text>
          <TextInput
            style={loginStyles.input}
            placeholder="Verification Code"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(verificationCode) => this.setState({verificationCode})}
            keyboardType="number-pad"
          />
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
        </View>
      </DismissKeyboard>
    )
  }
}
