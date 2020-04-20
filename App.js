/**
 * It's a main startup component.
 */

import React, {Component, createElement} from 'react'
import {Provider} from 'unstated'
import {loadFonts} from './assets/fonts'
import {loadImages, cacheImages} from './assets/images'
import {View, Image, ImageBackground} from 'react-native'
import { Asset } from 'expo'
import {AppLoading, SplashScreen} from 'expo'
import navigator from './src/navigators/navigator'
import {AuthContainer} from './src/state/authStateProvider'
import {ActivitiesContainer} from './src/state/activitiesStateProvider'
import flatMapPolyfill from 'array.prototype.flatmap'
import { AppState } from 'react-native'
import {apiURL} from './src/config'
import {userAccess} from './src/Common/const'
// Polyfill Array.prototype.flatMap
flatMapPolyfill.shim()

/**
 * The component has 2 kinds of props.(prop can't be changed inside the component however changing props from outside will re-render component.)
 * One is 'auth' and another is 'activities'
 */
const CONTAINERS = {}

function addContainer(key, klass, ...args) {
  CONTAINERS[key] = new klass(...args) // eslint-disable-line
  CONTAINERS[key].containers = CONTAINERS
}

addContainer('auth', AuthContainer)
addContainer('activities', ActivitiesContainer)

const CONTAINERS_TO_INJECT = Object.keys(CONTAINERS).map(
  (key) => CONTAINERS[key]
)

// const styles = SharedStyles.createStyles()

export default class App extends Component {



  nowTime = 0;

  componentDidMount() {
    this.appState = AppState.currentState
    //console.log(AppState.currentState)
    this.nowTime = new Date().getTime()
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    //console.log(this.appState)
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.nowTime = new Date().getTime()
    } else {
      const openTime = (new Date().getTime()-this.nowTime)/1000
// audit trail all duration time
      userAccess({
        activity: 'opentime',
        duration: openTime
      })

    }
    this.appState = AppState.currentState

  };
  /**
   * The component has 2 states.(state can be chnaged inside the component to re-render component.)
   * One is isSplashReady which is setting when completing loading of splash image from cache.
   * Another is isAppReady which is setting when completing loading of required images and fonts from cache.
   */
  state = {
    isAppReady: false,
    isSplashReady: false,
  }

  _cacheResourcesAsync = async() => {
    // eslint-disable-line space-before-function-paren
    await loadFonts()
    await loadImages()
    await new Promise(r => setTimeout(r, 3000))
    this.setState({isAppReady: true})
  }

  _cacheSplashResourcesAsync = async () => {
    const images = [
      require('./assets/images/splash.jpg'),
      require('./assets/images/logo-IH_blue_gold.png'),
    ]

    return cacheImages(images)
  }

  /* eslint-disable complexity */
  render() {
    if (!this.state.isSplashReady) {
      /**
       * rending first app loading progress
       */
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash
        />
      );
    }

    if (!this.state.isAppReady) {
      /**
       * rendering splash image
       */
      return (
        <ImageBackground source={require('./assets/images/splash.jpg')} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View>
            <Image
              style={{width: 300}}
              resizeMode="contain"
              onLoad={this._cacheResourcesAsync}
              source={require('./assets/images/logo-IH_blue_gold.png')}
            />
          </View>
        </ImageBackground>
      )
    }
    /**
     * rendering main component
     * The app main component is navigator which is located in src/navigators/navigator.
     */
    return (
      <Provider inject={CONTAINERS_TO_INJECT}>
        {createElement(navigator)}
      </Provider>
    )
  }
}