import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const sensorIcons = {
  'Front Door': 'door',
  'Refrigerator Door': 'fridge',
  'Bedroom': 'hotel',
  'Living Room': 'sofa',
  'Office': 'desktop-classic',
  'Primary Bathroom': 'toilet',

  // Deprecated / old sensor names, should not be used but kept in case
  'Toilet Flush': 'toilet',
}
const fallbackIcon = 'account'

function SensorIcon(props) {
  const {type, ...restProps} = props
  const iconName = sensorIcons[type] || fallbackIcon

  return <Icon {...restProps} name={iconName} />
}
SensorIcon.propTypes = {
  type: PropTypes.string,
}

export default SensorIcon