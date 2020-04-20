import React from 'react'
import {Colors, Typography} from '../styles'
import SensorIcon from '../Common/SensorIcons'
import ActivitiesStyles from '../Activities/ActivitiesStyles'
import { fromLeft } from 'react-navigation-transitions';
import {
    Text,
    View,
    Alert,
    TextInput,
    TouchableHighlight,
} from 'react-native'

const activityStyles = ActivitiesStyles.createStyles()

export default (props) => {
    const {item: event, sensorID, homeInfo} = props
    const iconStyle = event.type==='Primary Bathroom'?[{...activityStyles.icon}, {transform: [{ rotateY: '180deg'}]}]:activityStyles.icon;

  return (
<View style={activityStyles.linkContent} underlayColor={Colors.navigationBkgdActive}>
    <View style={{flex: 0.60, flexDirection: 'row'}}>
        <TouchableHighlight onPress={(event)=>{props.navigation.navigate('ManageSensorEditIcons')}}>
            <SensorIcon style={iconStyle} size={Typography.bodyLineHeight} type={event.type} />
        </TouchableHighlight>
        <TextInput
            placeholder={event.type}
            style={activityStyles.text}>
        </TextInput>
    </View>
</View>
 )

}
