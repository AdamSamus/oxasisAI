/**
 * Drawer navigation component.
 * It has also one drawer navigations component for notification and one bottom tab navigation.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Text, View, TouchableHighlight, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  DrawerActions,
  createDrawerNavigator,
} from 'react-navigation'

import NotificationHandler from '../Notifications/NotificationHandler'
import NotificationDrawer from '../Notifications'
import Tabs from './tabNavigator'
import {apiURL} from '../config'
import {timerId} from '../Overview/index'
import drawerStack from './drawerStackStyles'
import {Colors} from '../styles';
import {userAccess} from '../Common/const'

const Drawer = drawerStack.createStyles()

class DrawerMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

// Main Drawer component

  jumpToSection = (section) => {
    // audit trail for right drawer menu item open
    userAccess({
      activity: section
    })

    this.props.navigation.navigate(section);
    this.props.navigation.toggleMenuDrawer()
  };

  render() {
    return (
      <View style={Drawer.drawer}>
  <ScrollView>


      <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('NotificationPreferences')}
      >
          <View style={Drawer.linkContent}>
              <Icon style={Drawer.icon} size={28} name="notifications" />
              <Text style={Drawer.text}>Manage Alerts</Text>
          </View>
      </TouchableHighlight>

   {/*  <TouchableHighlight
              style={Drawer.link}
              underlayColor={Colors.navigationBkgdActive}
              onPress={() => this.jumpToSection('ManageSensors')}
            >
              <View style={Drawer.linkContent}>
                <Icon style={Drawer.icon} size={28} name="build" />
                <Text style={Drawer.text}>Manage Sensors</Text>
              </View>
      </TouchableHighlight>*/}


      <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('Profile')}
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="person" />
            <Text style={Drawer.text}>Profile</Text>
          </View>
       </TouchableHighlight>


        <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('ManageUsers')}
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="people" />
            <Text style={Drawer.text}>Manage Users</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('HomeProfile')}
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="portrait" />
            <Text style={Drawer.text}>Home Profile</Text>
          </View>
        </TouchableHighlight>


      {/*  <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('DeviceLocation')}
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="location-on" />
            <Text style={Drawer.text}>Location</Text>
          </View>
        </TouchableHighlight>*/}


        <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('Faq')}
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="forum" />
            <Text style={Drawer.text}>FAQs</Text>
          </View>
        </TouchableHighlight>





        <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => this.jumpToSection('Help')}
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="help" />
            <Text style={Drawer.text}>Help</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={Drawer.link}
          underlayColor={Colors.navigationBkgdActive}
          onPress={() => {
              try {
                  if (this.props.navigation.state.routes[0].routes[0].routes[0].params.popupTimerId === 'undefined') {
                      //getting popupTimerId from Overview to clear the notification alert.
                      this.jumpToSection('Logout');
                  }else{
                      const popupTimerId = this.props.navigation.state.routes[0].routes[0].routes[0].params.popupTimerId;
                      clearTimeout(popupTimerId);
                      this.jumpToSection('Logout');
                  }
              }catch(e) {

                  this.jumpToSection('Logout');
                  console.error(e); }
              }
              }
        >
          <View style={Drawer.linkContent}>
            <Icon style={Drawer.icon} size={28} name="exit-to-app" />
            <Text style={Drawer.text}>Sign Out</Text>
          </View>
        </TouchableHighlight>
        <NotificationHandler navigation={this.props.navigation} />
         </ScrollView>
      </View>
    );
  }
}

const FirstAppStack = createDrawerNavigator(
  {
    Tabs,
  },
  {
    drawerPosition: 'right',
    contentComponent: (props) => <DrawerMenu {...props} />,
    getCustomActionCreators: (_route, key) => ({
      toggleMenuDrawer: () => DrawerActions.toggleDrawer({key}),
    }),
  }
)

export const AppStack = createDrawerNavigator(
  {
    FirstAppStack,
  },
  {
    drawerPosition: 'right',
    contentComponent: (props) => <NotificationDrawer {...props} />,
    getCustomActionCreators: (_route, key) => ({
      openNotificationDrawer: () => DrawerActions.openDrawer({key}),
      closeNotificationDrawer: () => DrawerActions.closeDrawer({key}),
    }),
  }
)
