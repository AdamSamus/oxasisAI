import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native'
import {Spacing, Containers, Headers, Typography} from '../styles'
import WalkThru from "../Auth/WalkThru";
import {oxasisGold, oxasisGrey} from "../styles/colors";


export default class Faq extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {

    return (
      <ScrollView style={{...Containers.pageWrapper, ...Containers.base}}>
        <View style={{paddingBottom: Spacing.globalPaddingLarge * 4}}>
          <Text style={Headers.h1}>FAQs</Text>
          <Button
              title="View the installation guide"
              color={oxasisGold}
              onPress={() => this.props.navigation.navigate("WalkThru")}

          />
          <Text style={Headers.h5}>
            test
          </Text>
          <Text style={Typography.bodyCopy2}>
            test
          </Text>


          <Text style={Headers.h5}>
            2. How do I install the sensors and hub?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Follow the enclosed installation guide to complete setup. It is important that all sensors
            are placed in the appropriate locations for accurate alerts. All materials needed to
            complete installation are provided in the package.
          </Text>
          <Text style={Headers.h5}>
            3. What notifications/alerts can I adjust?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Door Open Alerts notify you when a monitored door (Front door/Fridge Door) remains
            open for an extended time.
          </Text>
          <Text style={Typography.bodyCopy2}>
            No Activity Alerts notify you when a sensor is not activated that day (after midnight)
            before the time you set.          </Text>
          <Text style={Headers.h5}>
            4. How do I adjust my notifications/alerts?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Go to Menu and click Notifications. There you can activate/deactivate alerts. If you no
            longer want to receive any of the Active Alerts, click delete. To create a new alert,
            complete the fields under Create an Alert.          </Text>
          <Text style={Headers.h5}>
            5. How do I disable notifications/alerts while the residents of the monitored household are away?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Go to Going Out. Here you can add and delete away events.          </Text>
          <Text style={Headers.h5}>
          6. How do I adjust the active/sleep times for the household?
        </Text>
          <Text style={Typography.bodyCopy2}>
            Go to Menu and click Home Profile. From there, scroll down and adjust the times. The
            awake/sleep times impact the Activity and Averages displays.          </Text>
          <Text style={Headers.h5}>
            7. How do I add other users to my account?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Go to Menu and click Manage Users. There you can add additional users by clicking
            Invite Users and completing the form.          </Text>
          <Text style={Headers.h5}>
            8. What settings can guest users change?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Guest users can set personal notifications/alerts and add times when the resident(s) will
            be out of the home to disable notifications/alerts. Guest users cannot edit the home
            profile, edit other account information, or invite additional guest users.          </Text>
          <Text style={Headers.h5}>
            9. I received a No Activity alert or Door Open alert – what do I do?
        </Text>
          <Text style={Typography.bodyCopy2}>
            These alerts are sent based off your notification preferences. If you receive one of these
            alerts, we recommend calling or visiting the monitored household to check-in on the
            resident(s) and confirm their safety. If concerned by changes in behavior, contact their
            preferred healthcare provider for guidance.
          </Text>

          <Text style={Headers.h5}>
            10. I received a Low Battery alert – what do I do?
          </Text>
          <Text style={Typography.bodyCopy2}>
            You will need to change the battery in one or more of the sensors. The sensors use
            CR123A lithium batteries, which can be purchased from most electronics and hardware
            stores or large online retailers, like Amazon.
          </Text>
          <Text style={Headers.h5}>
            11. I received a Hub is Running on Battery Backup alert – what do I do?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Call or visit the monitored household to check that the residence has power and the hub
            is plugged into an outlet. If the alert persists, contact Support via the app for assistance.
          </Text>
          <Text style={Headers.h5}>
            12. I received a Hub Lost Connection alert – what do I do?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Call or visit the monitored household to check that the hub is plugged in and the
            residence has power and a cellular signal. A blue light next to “Low Signal Strength” on
            the hub indicates that the cellular signal is too low to transmit data. Attempt to relocate
            the hub to an area where you have strong cellular signal on your phone. If the alert
            persists, contact Support via the app for assistance.
          </Text>
          <Text style={Headers.h5}>
            13. I am experiencing issues with the app or hardware and need Support – how do I contact you?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Contact our team by going to Menu and clicking Help then Get Support. If a
            replacement is needed, we will arrange delivery of the device(s) and an installation
            guide.
          </Text>
          <Text style={Headers.h5}>
            14. I have suggestions for product improvements – how do I contact you?
          </Text>
          <Text style={Typography.bodyCopy2}>
            Contact our team by going to Menu and clicking Help then Share Feedback.
          </Text>
        </View>
      </ScrollView>
    )
  }
}