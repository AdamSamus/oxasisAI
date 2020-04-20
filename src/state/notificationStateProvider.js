import {Alert} from 'react-native'
import {Container} from 'unstated'
import * as Permissions from 'expo-permissions'
import {Notifications} from 'expo';
import {oxasisEndpoint, oxasisHeaders} from '../helpers/api'

// @TODO: We need try/catch/finally wrapped around a lot of these.
// We shouldnt be leaning on the main components to handle errors

class NotificationContainer extends Container {
  state = {
    alertTypes: null,
    noActivityAlerts: [],
    notifications: [],
    preferences: [],
    dailySummary: {},
    isFetching: false,
    dismissInProgressNotificationIDs: [],
  }

  dailySummary(id) {
    return this.state.dailySummary[id]
  }

  notificationForID(id) {
    return this.state.notifications.find((notification) => notification.ID === id)
  }

  get isFetching() {
    return this.state.isFetching
  }

  get alertTypes() {
    return this.state.alertTypes
  }

  get noActivityAlerts() {
    return this.state.noActivityAlerts
  }

  get notifications() {
    return this.state.notifications
  }

  get preferences() {
    return this.state.preferences
  }

  get dismissInProgressNotificationIDs() {
    return this.state.dismissInProgressNotificationIDs
  }

  activateNotifications = async(user) => {
    try {
      await this.setState({isFetching: true})
      if (!await this.deviceAllowsNotifications()) {
        return false
      }
      const token = await Notifications.getExpoPushTokenAsync()

      await this.saveDeviceToken(user, token)
      return true
    } catch (error) {
      // TODO: no user feedback required, but it'd be nice to log somewhere
      return false
    } finally {
      this.setState({isFetching: false})
    }
  }

  /**
   * Create a new 'no activity' alert
   * @param {object} user current user
   * @param {string} user.token JWT
   * @param {object} params data about the alert
   * @param {number} params.sensorID id of the sensor (see mostRecent activity response)
   * @param {number} params.time seconds after midnight to trigger the alarm
   * @returns {promise<array>} resolves to the updated alert list when the alert is saved
   */
  async createNoActivityAlert(user, params) {
  console.log("createNoActivityAlert")
    //console.log(params)
    await this.setState({isFetching: true})
    const url = oxasisEndpoint('NoActivityAlert')
    const resp = await fetch(url, {
      method: 'PUT',
      headers: oxasisHeaders(user),
      body: JSON.stringify(params),
    })

    const {Error: err} = await resp.json()

    this.setState({isFetching: false})
  // console.log(err)
    if (err) {
      throw new Error(err)
    }


    return this.fetchNoActivityAlerts(user)
  }

  /**
   * Delete a new 'no activity' alert
   * @param {object} user current user
   * @param {string} user.token JWT
   * @param {number} sensorID the id of the sensor (see mostRecent activity response)
   * @returns {promise<array>} resolves to the updated alert list when the alert is removed
   */
  async deleteNoActivityAlert(user, alert) {
  AlertID = alert.AlertID
    await this.setState({isFetching: true})
    const url = oxasisEndpoint('noactivityalert', {AlertID})
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: oxasisHeaders(user),
    })
    const {Error: err} = await resp.json()
    this.setState({isFetching: false})
    if (err) {

      throw new Error(err)

    }

    return this.fetchNoActivityAlerts(user)
  }



  async dismissNotifications(user, notificationIDs) {
    await this.setState({
      dismissInProgressNotificationIDs: notificationIDs,
    })

    try {
      const body = JSON.stringify({
        Notifications: notificationIDs,
      })
      const url = oxasisEndpoint('DismissNotification')
      const resp = await fetch(url, {
        method: 'POST',
        headers: oxasisHeaders(user),
        body,
      })
      const {Error: error} = await resp.json()
      console.log(resp)
      console.log(resp.json())

      if (error) {
        throw new Error(error)
        console.log("throw new Error(error)")
      }
      await this.fetchNotifications(user, true)
    } catch (_error) {
      Alert.alert('Save error', 'Sorry, there was an error while dismissing your notification')
    } finally {
      this.setState({dismissInProgressNotificationIDs: []})
    }
  }

  /**
   * get a mapping of device ids to type names, and save it in state as well
   * @param {object} user the current user
   * @returns {Promise<object>} {1: 'No Activity', 2: 'Daily Summary', ...}
   */
  async fetchAlertTypes(user) {
    // this should not change often, so use what's in state if it exists
    if (this.alertTypes) {
      return this.alertTypes
    }
    await this.setState({isFetching: true})

    const url = oxasisEndpoint('AlertType')
    const resp = await fetch(url, {
      method: 'GET',
      headers: oxasisHeaders(user),
    })
    const results = await resp.json()
    const alertTypes = results.reduce((map, alert) => ({
      ...map,
      [alert.Key]: alert.Value,
    }), {})

    this.setState({alertTypes, isFetching: false})
    return alertTypes
  }

  /**
   * Fetch all 'no activity' alerts for this user
   * @param {object} user current user
   * @param {string} user.token JWT
   * @returns {null} Does not return anything, should not be used to send data directly
   */
  async fetchNoActivityAlerts(user) {
    await this.setState({isFetching: true})
    const url = oxasisEndpoint('NoActivityNotification')
    const resp = await fetch(url, {
      method: 'GET',
      headers: oxasisHeaders(user),
    })
    const noActivityAlerts = await resp.json()

    this.setState({noActivityAlerts, isFetching: false})
    return noActivityAlerts
  }

  /**
   * fetch notifications for this user
   * @param {object} user current user
   * @param {string} user.token JWT
   * @returns {Prommise<array>} resolves to a list of notification info
   */
  async fetchNotifications(user) {
    await this.setState({isFetching: true})
    const alertTypes = await this.fetchAlertTypes(user)

    const url = oxasisEndpoint('Notification')
    const resp = await fetch(url, {
      method: 'GET',
      headers: oxasisHeaders(user),
    })
    const rawNotifications = await resp.json()
    const notifications = []

    rawNotifications.forEach((notification) => {
      notifications.push(
        {
          ...notification,
          TypeID: notification.Type,
          Type: alertTypes[notification.Type] || 'Unknown',
        }
      )
    })

    this.setState({
      notifications,
      isFetching: false,
    })
  }

  async fetchPreferences(user) {
    await this.setState({isFetching: true})
    const alertTypes = await this.fetchAlertTypes(user)
    const url = oxasisEndpoint('AlertPreferences')
    const resp = await fetch(url, {
      method: 'GET',
      headers: oxasisHeaders(user),
    })
    const results = await resp.json()
    const preferences = results.Preferences.map((rawPref) => ({
      alertTypeId: rawPref.AlertType,
      alertType: alertTypes[rawPref.AlertType] || 'unknown',
      enabled: Boolean(rawPref.ActiveFlag),
    }));

    this.setState({preferences, isFetching: false})
    return preferences
  }

  async deviceAllowsNotifications() {
    const granted = await this.getExistingPermission() || await this.getNewPermission()

    return granted
  }

  async getExistingPermission() {
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    return status === 'granted'
  }

  async getNewPermission() {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    return status === 'granted'
  }


  async saveDeviceToken(user, token) {
    await this.setState({isFetching: true})

    const url = oxasisEndpoint('UserDeviceToken', {token})
    const resp = await fetch(url, {
      method: 'POST',
      headers: oxasisHeaders(user),
    })
    const {Error: error} = await resp.json()

    this.setState({isFetching: false})

    if (error) {
      throw new Error(error)
    }
  }

  /**
   * update the user's notification preferences
   * @param {object} user the current user
   * @param {object[]} preferences in the same format returned by fetchPreferences
   * @param {string} preferences[].alertTypeId the id of the alert type
   * @param {boolean} preferences[].enabled the id of the alert type
   * @returns {Promise} resolves then the save is complete
   */
  async savePreferences(user, preferences) {
    await this.setState({isFetching: true})

    const formattedPreferences = this.formatPreferencesForAPI(preferences)
    const url = oxasisEndpoint('AlertPreferences')
    const resp = await fetch(url, {
      method: 'PUT',
      headers: oxasisHeaders(user),
      body: formattedPreferences,
    })

    const {Error: error} = await resp.json()

    this.setState({isFetching: false})

    if (error) {
      throw new Error(error)
    }
    this.setState({preferences})
  }

  /**
   * format from our format to what's expected by the API
   * @param {object[]} preferences preferences in the form returned by fetchPreferences
   * @returns {string} JSON-encoded preference data
   */
  formatPreferencesForAPI(preferences) {
    const Preferences = preferences.map((setting) => ({
      AlertType: parseInt(setting.alertTypeId, 10),
      ActiveFlag: setting.enabled ? 1 : 0,
    }));

    return JSON.stringify({Preferences})
  }

  /**
   * get the Daily Summary
   * @param {object} user the current user
   * @param {string} id the notification id
   * @returns {null} returns null
   */
  async fetchDailySummary(user, id) {
    this.setState({isFetching: true})
    const url =oxasisEndpoint(`DailySummary?notificationID=${id}`)

    const resp = await fetch(url, {
      method: 'GET',
      headers: oxasisHeaders(user),
    })
    const results = await resp.json()
    const dailySummary = this.state.dailySummary

    dailySummary[id] = JSON.parse(results).Summary
    this.setState({dailySummary})
  }
}

export {NotificationContainer}
