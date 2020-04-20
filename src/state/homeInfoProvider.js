import {Alert} from 'react-native'
import {Container} from 'unstated'
import {oxasisEndpoint, oxasisHeaders} from '../helpers/api'

class HomeInfoContainer extends Container {
  state = {
    homeInfo: {},
    allUsers: [],
    userProfile: {},
    isFetching: false,
    isSaving: false,
  }

  get isFetching() {
    return this.state.isFetching
  }

  get isSaving() {
    return this.state.isSaving
  }

  get userProfile() {
    return this.state.userProfile
  }

  get homeInfo() {
    return this.state.homeInfo
  }

  get allUsers() {
    return this.state.allUsers
  }

  async fetchUserProfile(user) {
    try {
      await this.setState({isFetching: true})
      const url = oxasisEndpoint('UserProfile')
      const resp = await fetch(url, {
        method: 'GET',
        headers: oxasisHeaders(user),
      })
      const userProfile = await resp.json()

      this.setState({userProfile})
    } catch (error) {
      Alert.alert('There was an error', 'Could not fetch your profile. Please try refreshing data or check your signal strength.')
    } finally {
      await this.setState({isFetching: false})
    }
  }

  /**
   * update portions of a user profile
   * @param {object} user the current user
   * @param {string} user.token JWT
   * @param {object} changes an object containint a key and value for each _updated_ field
   * @returns {Promise} resolves when the profile is updated and the updated profile is saved in state
   */
  async updateCustomerProfile(user, changes) {
    try {
      await this.setState({isSaving: true})
      const url = oxasisEndpoint('UpdateCustomerProfile')
      const resp = await fetch(url, {
        method: 'PUT',
        headers: oxasisHeaders(user),
        body: JSON.stringify(changes),
      })

      const {Error: error} = await resp.json()

      if (error) {
        throw new Error(error)
      }

      await this.fetchUserProfile(user)
    } catch (error) {
      Alert.alert('There was an error', 'Could not save changes to your profile.')
    } finally {
      await this.setState({isSaving: false})
    }
  }

  async secondaryUsers(user, navigation) {
    try {
      await this.setState({isFetching: true})
      const url = oxasisEndpoint('SecondaryUser')
      const resp = await fetch(url, {
        method: 'GET',
        headers: oxasisHeaders(user),
      })
      const allUsers = await resp.json()

      this.setState({allUsers})
    } catch (error) {
      //console.log(error.message)

      //Alert.alert('Only primary User can manage Users.')
      //navigation.navigate('Overview')
       Alert.alert(
         'Alert',
         'Only primary User can manage Users.',
         [
           {text: 'Return to Overview', onPress: () => navigation.navigate('Overview')},

         ]
       )

/*      Alert.alert('Only primary User can manage Users.', alertMessage, [

                 {text: 'Return to the Overview', onPress: () =>  navigation.navigate('Overview')}
                  ])*/



    } finally {
      await this.setState({isFetching: false})
    }
  }

  async deactivateUser(user, id) {
    try {
      await this.setState({isFetching: true})

      const url = oxasisEndpoint('DeactivateUser')
      const resp = await fetch(url, {
        method: 'POST',
        headers: oxasisHeaders(user),
        body: JSON.stringify({userID: id}),
      })

      const results = await resp.json()

      if (results.errors) {
        throw apiErrorAlert(results.errors)
      } else {
        await this.secondaryUsers(user)
      }
    } catch (e) {
      Alert.alert(e.title, e.message)
    } finally {
      this.setState({isFetching: false})
    }
  }

  async fetchHomeInfo(user) {
    try {
      await this.setState({isFetching: true})
      const url = oxasisEndpoint('HomeInfo')
      const resp = await fetch(url, {
        method: 'GET',
        headers: oxasisHeaders(user),
      })
      const results = await resp.json()
      //console.log("fetchHomeInfo :" + JSON.stringify(results))
      this.setState({homeInfo: JSON.parse(results)})
    } catch (error) {
      console.log(error.message)
      Alert.alert('There was an error', 'Could not fetch Home Info. Please try refreshing data or check your signal strength.')
    } finally {
      await this.setState({isFetching: false})
    }
  }

  getMinsFromMidnight = timeString => {
    const items = timeString.split(/[ :]+/)
    //console.log(items)
    var hours = parseInt(items[0])
    const mins = parseInt(items[1])
    const ampm = items[2] === 'AM'?0:12
    if (ampm === 0 && hours === 12) {
      hours = 0
    }
    //console.log(hours, ampm, mins)
    return ((hours+ampm)*60+mins)*60
  }

  async saveTimeInfo(user, changes) {
    try {

      const url = oxasisEndpoint('SleepTimes')

      const resp = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          StartTime: this.getMinsFromMidnight(changes.StartTime),
          EndTime: this.getMinsFromMidnight(changes.EndTime)
        }),
        headers: oxasisHeaders(user),
      })

      const results = await resp.json()
      //const results = JSON.parse(rawResults)
      return results

    } catch (error) {
      //console.log(error.message)
      Alert.alert('There was an error', 'Could not fetch Home Info. Please try refreshing data or check your signal strength.')
    } finally {
      //await this.setState({isFetching: false})
    }
  }
}

export {HomeInfoContainer}

