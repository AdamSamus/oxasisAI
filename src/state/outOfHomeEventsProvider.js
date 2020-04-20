import {Alert} from 'react-native'
import {Container} from 'unstated'
import {oxasisEndpoint, oxasisHeaders} from '../helpers/api'

class OutOfHomeEventsContainer extends Container {
  state = {
    saveInProgress: false,
    deleteInProgressStartDate: null,
    outOfHomeEvents: [],
  };

  get saveInProgress() {
    return this.state.saveInProgress
  }

  get deleteInProgressStartDate() {
    return this.state.deleteInProgressStartDate
  }

  get outOfHomeEvents() {
    return this.state.outOfHomeEvents
  }

  async fetchOutOfHomeEvents(user) {
    const url = oxasisEndpoint('OutOfHomeEvent')
    const resp = await fetch(url, {
      method: 'GET',
      headers: oxasisHeaders(user),
    })

    const results = await resp.json()

    this.setState({outOfHomeEvents: JSON.parse(results)})
  }

  /**
   * Create a new Out of Home Event for this user
   * @param {object} user the current user
   * @param {strign} user.token the JWT fo the API request
   * @param {object} eventInfo info about the event to create
   * @param {string} eventInfo.startDate ISO8601 formatted date, patient local time
   * @param {string} eventInfo.endDate ISO8601 formatted date, patient local time
   * @param {string} eventInfo.title the name of the event
   * @return {Promise} resolves when the event is saved
   */
  async createOutOfHomeEvent(user, eventInfo) {
    this.setState({saveInProgress: true})
    const url = oxasisEndpoint('OutOfHomeEvent', eventInfo)
    const resp = await fetch(url, {
      method: 'POST',
      headers: oxasisHeaders(user),
    })

    let success = true

    try {
      result = await resp.json()
      if (result.Error) {
        throw new Error(result.Error)
      }
      await this.fetchOutOfHomeEvents(user)
    } catch (error) {
      Alert.alert('Error saving event', error.message)
      success = false
    } finally {
      this.setState({saveInProgress: false})
    }
    return success
  }

  /**
   * Update an existing Out of Home Event for this user
   * @param {object} user the current user
   * @param {strign} user.token the JWT fo the API request
   * @param {string} startDate the original start date of the event
   * @param {object} eventInfo info about the event to edit
   * @param {string} eventInfo.startDate ISO8601 formatted date, patient local time
   * @param {string} eventInfo.endDate ISO8601 formatted date, patient local time
   * @param {string} eventInfo.title the name of the event
   * @return {Promise} resolves when the event is saved
   */
  async updateOutOfHomeEvent(user, startDate, eventInfo) {
    this.setState({saveInProgress: true})
    const params = {
      startDate,
      newStartDate: eventInfo.startDate,
      newEndDate: eventInfo.endDate,
      newTitle: eventInfo.title,
    }
    const url = oxasisEndpoint('OutOfHomeEvent', params)
    const resp = await fetch(url, {
      method: 'PUT',
      headers: oxasisHeaders(user),
    })

    let success = true

    try {
      result = await resp.json()
      if (result.Error) {
        throw new Error(result.Error)
      }
      await this.fetchOutOfHomeEvents(user)
    } catch (error) {
      Alert.alert('Error saving event', error.message)
      success = false
    } finally {
      this.setState({saveInProgress: false})
    }
    return success
  }

  /**
   * Delete an existing Out of Home Event for this user
   * @param {object} user the current user
   * @param {strign} user.token the JWT fo the API request
   * @param {string} startDate ISO8601 formatted date, patient local time
   * @return {Promise} resolves when the event is deleted
   */
  async deleteOutOfHomeEvent(user, startDate) {
    this.setState({deleteInProgressStartDate: startDate})
    const url = oxasisEndpoint('OutOfHomeEvent', {startDate})
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: oxasisHeaders(user),
    })

    let success = true

    try {
      result = await resp.json()
      if (result.Error) {
        throw new Error(result.Error)
      }
      await this.fetchOutOfHomeEvents(user)
    } catch (error) {
      Alert.alert('Error deleting event', error.message)
      success = false
    } finally {
      this.setState({deleteInProgressStartDate: null})
    }
    return success
  }
}

export {OutOfHomeEventsContainer}
