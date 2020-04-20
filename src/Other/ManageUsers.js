import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {UserDisplay} from './UserDisplay'
import {Colors} from '../styles'
import SettingsStyles from './SettingsStyles'

const styles = SettingsStyles.createStyles()

export default class ManageUsers extends Component {
  static propTypes = {
    screenProps: PropTypes.object,
  }

  state = {
    refreshing: false,
  }

  handleClickDelete = (id) => {
    const {auth: {currentUser}, homeStore} = this.props.screenProps

    if (homeStore.isFetching) {
      return
    }

    Alert.alert(
      'Deactivate this user?',
      'Permanently deactivate this user, and remove their access to all sensor data?',
      [
        {
          text: 'Deactivate',
          onPress: () => homeStore.deactivateUser(currentUser, id),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  loadUsers = async() => {
    await this.props.screenProps.homeStore.secondaryUsers(this.props.screenProps.auth.currentUser, this.props.navigation)
  }

  onRefresh = async() => {
    this.setState({refreshing: true});
    await this.loadUsers()
    this.setState({refreshing: false});
  }

  render() {
    const {screenProps: {homeStore: {isFetching}}} = this.props

    return (
      <ScrollView
        style={styles.pageWrapper}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
      >
        <NavigationEvents onDidFocus={this.loadUsers} />
        <View style={styles.containerExpand}>
          <Text style={styles.h1}>Manage Users</Text>
          {(isFetching && !this.state.refreshing) ? (
            <View style={styles.containerHorizontal}>
              <ActivityIndicator size="large" color={Colors.oxasisBlue} />
            </View>
          ) : (
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('InviteUsers')}>
              <View style={styles.linkContent}>
                <Icon style={styles.icon} size={28} name="person-add" />
                <Text style={styles.text}>Invite Users</Text>
              </View>
              </TouchableOpacity>
            <Users users={this.props.screenProps.homeStore.allUsers} handleClickDelete={this.handleClickDelete} />
            </View>
          )}
        </View>
      </ScrollView>
    )
  }
}

const Users = ({users, handleClickDelete}) => (
  users.map((user, index) => (
    <UserDisplay user={user} handleClickDelete={handleClickDelete} key={index} />
  ))
)
