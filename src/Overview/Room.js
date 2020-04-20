import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'


/* eslint-disable camelcase,space-before-function-paren */

const returnToButton = (navigation) => (
  <TouchableHighlight
    onPress={() => navigation.goBack()}
    underlayColor="rgba(0, 0, 0, 0)"
  >
    <Icon name="arrow-back" />
  </TouchableHighlight>
)

export default class Room extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        height: 60,
      },
      headerTitle: (<Image
        style={topBar.logo}
        resizeMode="contain"
        source={require('../../assets/images/logo-IH_blue_gold-small.png')}
      />),
      headerLeft: returnToButton(navigation),
      // headerStyle: loginStyles.navigationContainer,
    }
  }

  render() {
    return (
      <View>
        <Text>
          {this.props.navigation.state.params.roomType}
        </Text>
      </View>
    )
  }
}
