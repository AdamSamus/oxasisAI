import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class Logout extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const {
      navigation: {navigate},
      screenProps: {auth: {logOutUser}},
    } = this.props

    logOutUser(navigate)
  }

  render() {
    return null
  }
}
