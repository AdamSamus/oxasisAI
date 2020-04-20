
import React from 'react'
import {View} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation'
import OverviewStack from './overviewStack'
import ActivityStack from './activityStack'
import CalendarStack from './calendarStack'
import OtherStack from './otherStack'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Colors, Fonts} from '../styles'

import TabNavigator from './tabNavigatorStyles'
import AveragesStack from '../Averages'

const tabNavigator = TabNavigator.createStyles()

/* eslint-disable react/display-name, react/prop-types */
export default createBottomTabNavigator(
  {
    Overview: {
      screen: OverviewStack,
    },
    Activities: {
      screen: ActivityStack,
      navigationOptions: {
        title: 'EMPTY',
      },
    },
    Averages: {
      screen: AveragesStack,
      navigationOptions: {
        title: 'EMPTY',
      },
    },
    Calendar: {
      screen: CalendarStack,
      navigationOptions: {
        title: 'EMPTY',
      },
    },
    Menu: {
      screen: OtherStack,
      navigationOptions: ({navigation}) => ({
        tabBarOnPress: () => {
          navigation.toggleMenuDrawer()
        },
      }),
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Colors.navigationBkgdActive,
      activeTintColor: Colors.navigationColorActive,
      inactiveBackgroundColor: Colors.navigationBkgd,
      inactiveTintColor: Colors.navigationColor,
      backgroundColor: Colors.navigationColor,
      labelBottomStyle: {
        fontSize: Fonts.bodyFontSizeSmall,
      },
      style: {
        backgroundColor: Colors.navigationBkgd,
        height: 64,
      },
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
    },
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const icons = { }

        const style = focused ? tabNavigator.activeTab : {}

        return (
          <View style={tabNavigator.container}>
            <View style={style} />
            <Icon style={tabNavigator.icon} size={28} name={icons[navigation.state.key]} />
          </View>
        )
      },
      showIcon: true,
    }),
  }
)
