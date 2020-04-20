import {Alert} from 'react-native'
import {Container} from 'unstated'
import {oxasisURL} from '../config'
import {queryString} from '../helpers/format'
import {patientTimeZone, changeTimezoneOnly} from '../helpers/dateTime'

const VIEWS = ['Graph', 'List']
/* eslint-disable camelcase,space-before-function-paren */

const emptyFilter = {
  startDate: null,
  endDate: null,
  sensorTypes: [],
}

class ActivitiesContainer extends Container {
  constructor(props = {}) {
    super(props)

    this.state = {
      activities: [],
      selectedView: VIEWS[0],
      sensorEvents: [],
      systemAlerts: [],
      graphEvents: {},
      filter: emptyFilter,
      isFetching: false,
    }
  }

  get isFetching() {
    return this.state.isFetching
  }

  get systemAlerts() {
    return this.state.systemAlerts
  }

  get activities() {
    return this.state.activities
  }

  get filter() {
    return this.state.filter
  }

  get graphEvents() {
    return this.state.graphEvents
  }

  get sensorEvents() {
    return this.state.sensorEvents
  }

  get selectedView() {
    return this.state.selectedView
  }

  get selectedViewIndex() {
    return VIEWS.indexOf(this.selectedView) || 0
  }

  get views() {
    return VIEWS
  }

  applyFilter(_user, filter) {
    // set isFetching to true here so the user's nav from the filter screen
    // to the activities screen will take them directly to a spinner.
    // Otherwise, they see the previous view for a sec before the navigation-induced fetch kicks in.
    // isFetching gets set back to false once the fetch is complete.
    return this.setState({filter, isFetching: true})
  }

  async filterBySensor(user, sensorID) {
  console.log("filterBySensor")
    const activities = this.state.activities.length > 0 ?
        this.state.activities :
        await this.mostRecent(user)
    const deviceActivity = activities.find((event) => event.SensorID === sensorID)

    if (!deviceActivity) {
      return
    }

    await this.applyFilter(user, {
      ...emptyFilter,
      sensorTypes: [deviceActivity.SensorType],
    })
    console.log("applyFilter")
  }

  resetFilter() {
    this.setState({filter: emptyFilter})
  }

  mostRecent = async (user) => {
    if (!user.token) {
      return null
    }
    try {
      await this.setState({isFetching: true})
      const resp = await fetch(`${oxasisURL}/MostRecentData`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      })
      const rawResults = await resp.json()
      const results = JSON.parse(rawResults)
      //console.log(JSON.stringify(rawResults))

      this.setState({
        activities: results.EventData,
        systemAlerts: results.Issues,
      })

      return results.EventData
    } catch (error) {
      Alert.alert(error)
      //Alert.alert('There was an error', 'Could not fetch most recent activities. Please try refreshing data or check your signal strength')
    } finally {
      await this.setState({isFetching: false})
    }
  }

  fetchSensorEvents = async (user, homeInfo, pageNumber=1) => { // eslint-disable-line complexity
    //console.log('pageNumber:', pageNumber)
    const {startDate, endDate} = this.state.filter
    const formatOpts = {suppressMilliseconds: true}
    const params = {}
    params.pageNumber = pageNumber
    // NOTE: Android likes to include milliseconds in `toISO` but the server doesn't like it
    if (startDate) {
      const startTimezone = patientTimeZone(startDate, homeInfo)
      params.startDate = changeTimezoneOnly(startDate, startTimezone).startOf('second').toISO(formatOpts)
    }
    if (endDate) {
      const endTimezone = patientTimeZone(endDate, homeInfo)
      params.endDate = changeTimezoneOnly(endDate, endTimezone).startOf('second').toISO(formatOpts)
    }

    try {
      if (pageNumber == 1) {
        await this.setState({isFetching: true})

      }

      const url = `${oxasisURL}/SensorEvents?${queryString(params)}`
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      })
      const results = await resp.json()
      //console.log(results)
      if (pageNumber == 1) {
        //const sensorEvents = this.parseSensorEventResponse(results).slice(0, 1)
        //console.log('pageNumber:', pageNumber, sensorEvents.length)
        //this.setState({sensorEvents})
        this.setState({sensorEvents: this.parseSensorEventResponse(results)})
        await this.setState({isFetching: false})
      } else {
        //console.log(this.parseSensorEventResponse(results))
        const sensorEvents = this.state.sensorEvents.concat(this.parseSensorEventResponse(results))
        //console.log('pageNumber:', pageNumber, sensorEvents.length)
        this.setState({sensorEvents})
      }
    } catch (error) {
      Alert.alert('There was an error', 'Could not fetch sensor activities. Please try refreshing data or check your signal strength')
      await this.setState({isFetching: false})
    } finally {
    }
  }

  fetchGraphEvents = async (user, homeInfo, state) => {
  console.log("fetchGraphEvents")
    const {startDate, endDate} =  this.state.startDate === null ?  this.state.filter :  state.filter
    // eslint-disable-line complexity
    //const {startDate, endDate} = this.state.filter
    console.log("startDate: " + startDate)
    const formatOpts = {suppressMilliseconds: true}
    const params = {}

    // NOTE: Android likes to include milliseconds in `toISO` but the server doesn't like it
    if (startDate) {// only in case valid start date
      const startTimezone = patientTimeZone(startDate, homeInfo)
      params.startDate =
          changeTimezoneOnly(startDate, startTimezone).startOf('second').toISO(formatOpts)
        }

    if (endDate) {// only in case valid end date otherwise crash
      const endTimezone = patientTimeZone(endDate, homeInfo)
      params.endDate =
          changeTimezoneOnly(endDate, endTimezone).startOf('second').toISO(formatOpts)
        }


    try {
     // await this.setState({isFetching: true})
      const url = `${oxasisURL}/TimelineData?${queryString(params)}`
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      })
      const results = await resp.json()
      //console.log(results)
      await this.setState({graphEvents: results})
    } catch (error) {
      Alert.alert('There was an error', 'Could not fetch sensor activities. Please try refreshing data or check your signal strength')
    } finally {
      await this.setState({isFetching: false})
    }
  }

  parseSensorEventResponse(results) {
    const parsed = JSON.parse(results)

    return parsed ? parsed.SensorEventTimes : []
  }

  setView(selectedView) {
    return this.setState({selectedView})
  }

  setViewIndex(selectedViewIndex) {
    return this.setState({selectedView: VIEWS[selectedViewIndex]})
  }
}


export {ActivitiesContainer}
