import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, View, TouchableHighlight, Image, ImageBackground, ScrollView} from 'react-native'
import LandingStyles from './LandingStyles'
import { Colors } from '../styles';
const landingStyles = LandingStyles.createStyles()

export default class AuthIndex extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    // const {navigate} = this.props.navigation

    return (
      <ScrollView style={landingStyles.pageWrapper}>
        <ImageBackground source={require('../../assets/images/welcome.jpg')} style={landingStyles.container}>

          <View style={landingStyles.logoContainer}>
            <Image
              style={landingStyles.logo}
              resizeMode="contain"
              source={require('../../assets/images/logo-IH_blue_gold.png')}
            />
          </View>

          <View style={landingStyles.contentContainer}>
            <Text style={[landingStyles.h1]}>
              Welcome
            </Text>
            <Text style={[landingStyles.content]}>
              hello
            </Text>
            <View style={landingStyles.buttonContainer}>
              <TouchableHighlight
                style={landingStyles.button}
                onPress={() => this.props.navigation.navigate('LogIn')}
                underlayColor={Colors.buttonPrimaryBkgdActive}
              >
                <Text style={landingStyles.buttonText}>Sign In</Text>
              </TouchableHighlight>
            </View>

            <View style={landingStyles.buttonContainer}>
              <TouchableHighlight
                style={landingStyles.buttonSecondary}
                onPress={() => this.props.navigation.navigate('Code')}
                underlayColor={Colors.buttonInvertedBkgdActive}
              >
                <Text style={landingStyles.buttonSecondaryText}>Sign Up</Text>
              </TouchableHighlight>
            </View>
          </View>
          
        </ImageBackground>
      </ScrollView>
    )
  }
}
