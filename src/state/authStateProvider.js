import {apiURL, oxasisURL} from '../config'
import {Container} from 'unstated'
import {Component} from "react";
import {apiErrorAlert} from '../helpers/api'
import {AsyncStorage, Alert} from 'react-native'
import {info, userAccess} from '../Common/const'
import base64 from 'react-native-base64'

console.log(apiURL)
console.log(oxasisURL)

class AuthContainer extends Container {
  constructor(props = {}) {
    super(props)


    this.state = this.defaultState
  }

  get defaultState() {
    return {
      currentUser: null,
      isFetching: false,
      isNewUser: false,
    }
  }
  get isFetching() {
    return this.state.isFetching

  }
  get currentUser() {
    return this.state.currentUser
  }
  get isPrimary() {
    return this.state.currentUser && this.state.currentUser.customer_type === 'Primary'
  }
  getCurrentUser = async() => {
    return this.state.currentUser
  }


  /*validateUser
  * called by AuthLoadingScreen
  * Fetch the token from storage then navigate to our appropriate place
  * user already logged in and credentials are saved but the app was closed*/
  validateUser = async(token, email, id) => {
        navigate('Overview')
  };


  logOutUser = async(navigate) => {
    try {
      await this.setState({isFetching: true})

      const UserAccessParam = {
        activity: 'logout'
      }
      userAccess(UserAccessParam)
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)

      this.setState({currentUser: {}}, () => {
        navigate('AuthLoading')
      })
    } catch (e) {
      Alert.alert(e.message)
    } finally {
      this.setState({isFetching: false})
    }
  }


  /*this method is for sign up, it check the back end to confirm that the sign up code is linked to a user*/
  userByCode = async(code, navigate) => {
    console.log("userByCode")
    try {
      this.setState({isFetching: true})
      console.log(`${apiURL}/code/${code}`)
      const resp = await fetch(`${apiURL}/code/${code}`, {

        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const results = await resp.json()
      console.log(JSON.stringify(results))

      if (results.errors) {
        Alert.alert("Invalid code")
        //throw apiErrorAlert(results.errors)
      }

      await this.setState({currentUser: results, isNewUser: true})
      await navigate('TwoFactor', {email: results.EmailAddress})
    } catch (e) {
        Alert.alert("Invalid code")
      //Alert.alert(e.title, e.message)
    } finally {
      this.setState({isFetching: false})
    }
  }


  /*  this method is called whenever the user wants to update password it just check to see if the user exist from the db using his email*/
  userByEmail = async(email, navigate) => {
     console.log("userByEmail")
     try {
       this.setState({isFetching: true})
       console.log(`${apiURL}?email=${email}`)
       const resp = await fetch(`${apiURL}?email=${email}`, {

         method: 'GET',
         headers: new Headers({
           'Authorization': `Basic ${base64.encode("cwApCsHm2A" + ":" + "KNbyu64x4Z")}`,
           'Content-Type': 'application/json'
         }),
       })
       const results = await resp.json()
       console.log(JSON.stringify(results))

       if (results.errors) {
         //throw apiErrorAlert(results.errors)
         Alert.alert("Invalid email address")
         return false
       }

       await this.setState({currentUser: results, isNewUser: false})
       await navigate('TwoFactor', {email: results.EmailAddress})
     } catch (e) {
        Alert.alert("Invalid email address")
       //Alert.alert(e.title, e.message)
     } finally {
       this.setState({isFetching: false})
     }
   }


  /*this method create/update credentials*/
  createUser = async(user, navigate) => {
    console.log("createUser")
    let creds = {EmailAddress: user.EmailAddress, password: user.password}
    try {
      this.setState({isFetching: true})
      const resp = await fetch(`${apiURL}/credentials`, {
        method: 'PUT',
        headers: new Headers({
          'Authorization': `Basic ${base64.encode("cwApCsHm2A" + ":" + "KNbyu64x4Z")}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(creds),
      })
      const results = await resp.json()
      console.log("results:")
      console.log(results)
      if (results.errors) {
        throw apiErrorAlert(results.errors)
      }
      /*await this.setState({currentUser: results.user, isNewUser: true}, () => {*/
      await this.setState({currentUser: results.user}, () => {
      AsyncStorage.multiSet([
        ['token', this.state.currentUser.token],
        ['email', this.state.currentUser.email],
        ['id', `${this.state.currentUser.id}`],
        ])
      })
      //if (results.user.created_at == results.user.updated_at)
    if (results.user.token) {
            //navigate(this.props.isNewUser ? 'WalkThru' : 'Overview')
            navigate("Overview")
            }
            console.log('ERR')

    } catch (e) {
      Alert.alert(e.title, e.message)
    } finally {
      this.setState({isFetching: false})
    }
  }





  replaceUserPassword = async(user, navigate) => {
    console.log("replaceUserPassword")
    try {
      this.setState({isFetching: true})
      // credentials
      //PUT

      const resp = await fetch(`${apiURL}/change_password`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user}),
      })

      const results = await resp.json()

      if (results.errors) {
        throw apiErrorAlert(results.errors)
      }

      await this.setState({currentUser: results.user}, () => {
        AsyncStorage.multiSet([
          ['token', this.state.currentUser.token],
          ['email', this.state.currentUser.email],
          ['id', `${this.state.currentUser.id}`],
        ])
      })
      navigate('Overview')
    } catch (e) {
      Alert.alert(e.title, e.message)
    } finally {
      this.setState({isFetching: false})
    }
  }


  sendVerificationCode = async(email, verification_code, navigate) => {
  console.log("ValidateVerificationCode")
    try {
      this.setState({isFetching: true})
      const {currentUser, isNewUser} = this.state
      const resp = await fetch(`${apiURL}/ValidateVerificationCode`, {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Basic ${base64.encode("cwApCsHm2A" + ":" + "KNbyu64x4Z")}`,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({email: email, code: verification_code}),
      });
      const results = await resp.json()
      if (results === false) {
        //throw apiErrorAlert("wrong confirmation code")
        Alert.alert("Invalid confirmation code")
      }if (results === true) {
      //await this.setState({currentUser: results.user})

        navigate('Password')
    }
      //navigate(isNewUser ? 'WalkThru' : 'Overview')
    } catch (e) {
    Alert.alert("Invalid confirmation code")
      Alert.alert(e.title, e.message)
    } finally {
      this.setState({isFetching: false})

    }
  }


    sendInvite = async(user, navigate) => {
    console.log("sendInvite")
      try {
        this.setState({isFetching: true})

        const resp = await fetch(`${oxasisURL}/secondaryuser`, {

          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.currentUser.token}`,
          },
          body: JSON.stringify(user),
        })



/*
        const results = await resp.json()

        if (results.errors) {
          throw apiErrorAlert(results.errors)
        }
*/

        if (resp.status == 400) {
          Alert.alert("Email is invalid or already taken")
        }
        if (resp.status == 204){
        navigate('InviteConfirmation')
        }

      } catch (e) {
        Alert.alert(e.title, e.message)

      } finally {

        this.setState({isFetching: false})
      }
    }


  }


export {AuthContainer}
