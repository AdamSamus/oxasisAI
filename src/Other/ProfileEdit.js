import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import UserForm from '../Common/UserForm'
import {requiredFields} from '../helpers/forms'
import BusyButton from '../Common/BusyButton'

import {Colors} from '../styles'
import SettingsStyles from './SettingsStyles'

const styles = SettingsStyles.createStyles()

export default class ProfileEdit extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
  }

  state = {
    changes: {},
  }

  get mergedUser() {
    const {screenProps: {homeStore: {userProfile}}} = this.props
    const {changes} = this.state

    return {
      ...userProfile,
      ...changes,
    }
  }

  loadUser = async() => {
    await this.props.screenProps.homeStore.fetchUserProfile(this.props.screenProps.auth.currentUser)
  }

  handleChange = (updates) => {
    this.setState((state) => ({
      changes: {
        ...state.changes,
        ...updates,
      },
    }))
  }

  handleClickCancel = () => {
    this.props.navigation.goBack()
  }

  handleClickSave = async() => {
    const user = this.mergedUser
    const {changes} = this.state
    const {auth: {currentUser}, homeStore} = this.props.screenProps

    if (
      requiredFields(
        ['EmailAddress', 'MobileNumber', 'FirstName', 'LastName'],
        ['Email Address', 'Mobile Number', 'First Name', 'Last Name'],
        user
      )
    ) {
      await homeStore.updateCustomerProfile(currentUser, changes)
      this.props.navigation.goBack()
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const {screenProps: {homeStore: {isFetching, isSaving}}} = this.props
    const user = this.mergedUser

    return (
      <ScrollView style={styles.pageWrapper}>
        <NavigationEvents onDidFocus={this.loadUser} />
        <View style={styles.containerExpand}>
          <Text style={styles.h1}>Edit Profile</Text>
          {isFetching ? (
            <View style={styles.containerHorizontal}>
              <ActivityIndicator size="large" color={Colors.oxasisBlue} />
            </View>
          ) : (
            user.EmailAddress && (
              <React.Fragment>
                <UserForm user={user} onChange={this.handleChange} />
                <View style={styles.buttonGroup}>
                  <TouchableHighlight
                    style={styles.buttonGroupContainer}
                    onPress={this.handleClickCancel}
                    underlayColor={Colors.buttonSecondaryBkgdActive}
                  >
                    <View style={styles.buttonSecondary}>
                      <Text style={styles.buttonSecondaryText}>Cancel</Text>
                    </View>
                  </TouchableHighlight>
                  <View style={styles.buttonGroupContainer}>
                    <BusyButton
                      style={styles.buttonPrimary}
                      underlayColor={Colors.buttonPrimaryBkgd}
                      isBusy={isSaving}
                      onPress={this.handleClickSave}
                    >
                      <Text style={styles.buttonPrimaryText}>Save</Text>
                    </BusyButton>
                  </View>
                </View>
              </React.Fragment>
            )
          )}
        </View>
      </ScrollView>
    )
  }
}
