import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableHighlight, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../styles'
import CheckboxListStyles from './CheckboxListStyles'

export default class CheckboxList extends Component {
  static propTypes = {
    onToggleSelection: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      selected: PropTypes.bool,
      value: PropTypes.any,
    })),
    styles: PropTypes.shape({
      checkboxIcon: PropTypes.object,
      checkboxLabel: PropTypes.object,
      checkboxList: PropTypes.object,
      checkboxRow: PropTypes.object,
    }),
  }

  static defaultProps = {
    options: [],
  }

  get mergedStyles() {
    return CheckboxListStyles.createStyles(this.props.styles)
  }

  render() {
    const {onToggleSelection, options} = this.props
    const styles = this.mergedStyles

    return (
      <View style={styles.checkboxList}>
        {options.map(({label, selected, value}) => (
          <TouchableHighlight
            key={value}
            onPress={() => onToggleSelection(value)}
            underlayColor={Colors.buttonSecondaryBkgdActive}
          >
            <View style={styles.checkboxRow}>
              <Checkbox
                selected={selected}
                size={styles.checkboxLabel.lineHeight}
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxLabel}>{label}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    )
  }
}

const Checkbox = ({selected, size, style}) => {
  const iconName = selected ? 'checkbox-marked' : 'checkbox-blank-outline'

  return (
    <Icon style={style} name={iconName} size={size} />
  )
}

Checkbox.propTypes = {
  selected: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.object,
}
