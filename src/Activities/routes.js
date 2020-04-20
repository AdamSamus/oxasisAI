import React from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableHighlight} from 'react-native'
import ActivitiesIndex from './index'
import Graph from './Graph'

import ActivitiesStyles from './ActivitiesStyles'
const styles = ActivitiesStyles.createStyles()

const ActivitiesIndexRoute = {
  screen: ActivitiesIndex,
  navigationOptions: ({navigation}) => ({
    headerLeft: <FilterLink navigation={navigation} />,
  }),
}

const GraphRoute = {
  screen: Graph,
  navigationOptions: ({navigation}) => ({
    headerLeft: <FilterLink navigation={navigation} />,
  }),
}

const FilterLink = ({navigation}) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('ActivityFilter')}
    underlayColor="rgba(0, 0, 0, 0)"
    style={styles.filterLink}
  >
    <Text style={styles.filterLinkText}>Filter</Text>
  </TouchableHighlight>
)

FilterLink.propTypes = {
  navigation: PropTypes.object,
}

const ROUTES = {
  Activities: ActivitiesIndexRoute,
  Graph: GraphRoute,
}

export default ROUTES
