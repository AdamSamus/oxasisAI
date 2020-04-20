import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Subscribe} from 'unstated'
import {NotificationContainer} from '../state/notificationStateProvider'
import NotificationStyles from './NotificationStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = NotificationStyles.createStyles()


/**
 ** ADD TO tabNavigator.js to add a global top message bar
 *
// export default class Ttabs extends Component {
//   static router = BottomTabs.router;

//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <SystemAlerts />
//         <BottomTabs navigation={this.props.navigation} />
//       </View>
//     );
//   }
// }
 *
**/


class SystemAlerts extends Component {

  render() {
    return (
      <Subscribe
        to={[
          NotificationContainer,
        ]}
      >
        {(store) => {
          const {systemAlerts} = store

          return (
            <View>
              {systemAlerts.map((alert, index) => (
                <View key={index} style={styles.alertContainer}>
                  <Icon style={styles.alertIcon} size={25} name='alert-circle-outline' />
                  <Text style={styles.alertText}>{alert.Body}</Text>
                </View>
              ))}
            </View>
          )
        }}
      </Subscribe>
    )
  }
}

export default SystemAlerts
