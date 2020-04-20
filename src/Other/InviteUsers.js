import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  Button
} from 'react-native'
import BusyButton from '../Common/BusyButton'
import {requiredFields} from '../helpers/forms'
import UserForm from '../Common/UserForm'
import Icon from 'react-native-vector-icons/Feather'
import {Colors} from '../styles'
import LoginStyles from '../Auth/LogInStyles'

const loginStyles = LoginStyles.createStyles()

export default class Invite extends Component {
  static navigationOptions = ({ navigation }) =>  {
    return {
      
      headerLeft: <Icon style={{marginLeft: 10, color: Colors.oxasisBlue}} name='arrow-left' size={30}
        onPress={()=>{
        navigation.goBack()
      }}/>
  }}
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.object.isRequired,
  }

  state = {
    EmailAddress: '',
    MobileNumber: '',
    FirstName: '',
    LastName: '',
    AddressOne: '',
    AddressTwo: '',
    City: '',
    State: '',
    ZipCode: '',
    CodeRedeemedDate: '',

  }

  handleSubmit = () => {
    const {screenProps: {auth: {sendInvite}}, navigation: {navigate}} = this.props

    if (
      requiredFields(
        ['EmailAddress', 'MobileNumber', 'FirstName', 'LastName'],
        ['Email Address', 'Mobile Number', 'First Name', 'Last Name'],
        this.state
      )
    ) {
      sendInvite(this.state, navigate)
    }
  }

  handleChange = (updates) => {
    this.setState(updates)
  }

  render() {
    const {screenProps: {auth: {isFetching}}} = this.props

    return (
      <ScrollView style={loginStyles.pageWrapper}>
        <View style={loginStyles.containerExpand}>
          <View>
            <Text style={loginStyles.h1}>Invite a User</Text>
            <UserForm user={this.state} onChange={this.handleChange} />
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
              <Text style={loginStyles.buttonText}>Send Invite</Text>
            </BusyButton>
          </View>
        </View>

      </ScrollView>
    )
  }
}
