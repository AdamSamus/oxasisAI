import React from 'react'
import {Image, View} from 'react-native'
import NotificationIndicator from '../Notifications/NotificationIndicator'
import topBarStyles from '../styles/components/topBarStyles';

const topBar = topBarStyles.createStyles()


export const SharedHeader = (navigation) => (
  {
    headerStyle: {
      height: 60,
      borderBottomColor: '#D9D8D6',
      borderBottomWidth: 1,
    },
    // keep the left & right sections of the header the same width
    // so the title can be centered in the space between them
    // (mainly for Android, iOS centers the title for you by default)
    headerLeftStyle: {
      width: 80,
    },
    headerRightStyle: {
      width: 80,
    },
    headerLeft: <View />,
    headerTitle: (
      <View style={topBar.logoWrapper}>
        <Image
          style={topBar.logo}
          resizeMode="contain"
          source={require('../../assets/images/logo-IH_blue_gold-small.png')}
        />
      </View>
    ),
    headerRight: <NotificationIndicator navigation={navigation} />,
  }
)
