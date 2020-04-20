/**
 * Notification screen component.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FlatList, View, Text, TouchableHighlight, Alert} from 'react-native'

import {Subscribe} from 'unstated'
import {ActivitiesContainer} from '../state/activitiesStateProvider'
import {AuthContainer} from '../state/authStateProvider'
import {HomeInfoContainer} from '../state/homeInfoProvider'
import {NotificationContainer} from '../state/notificationStateProvider'
import NotificationItem from './NotificationItem'
import NotificationStyles from './NotificationStyles'
import {activeRouteKey} from '../helpers/nav'

const styles = NotificationStyles.createStyles()

class Notifications extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        screenProps: PropTypes.shape({
            activityStore: PropTypes.object,
            currentUser: PropTypes.object,
            notificationStore: PropTypes.object,
        }),
    }

    componentDidMount() {
        this.refreshData()
    }

    /**
     * rearrange notification data from server
     */
    get notifications() {
        const {notificationStore: {notifications}, activityStore: {activities}} = this.props.screenProps
        const sensorMap = activities.reduce((map, activity) => ({
            ...map,
            [activity.SensorID]: activity.SensorType,
        }), {})

        return notifications.map((notification) => ({
            ...notification,
            SensorType: sensorMap[notification.SensorID] || null,
            key: String(notification.ID),
        }))
    }

    /**
     * dismiss one notification
     */
    handleDismiss = (notification) => {
        const {currentUser, notificationStore} = this.props.screenProps

        notificationStore.dismissNotifications(currentUser, [notification.ID])
    }

    /**
     * dismiss all notification
     */
    handleDismissAll = () => {
        const {currentUser, notificationStore} = this.props.screenProps
        const notificationIDs = notificationStore.notifications.map((notification) => notification.ID)

        Alert.alert(
            'Delete All Notifications',
            `Would you like to delete all ${notificationIDs.length} notifications?`,
            [
                {
                    text: 'Delete All',
                    onPress: () => notificationStore.dismissNotifications(currentUser, notificationIDs),
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
            {cancelable: true},
        );
    }

    /**
     * Once select one notification will go to overview screen and have it highlighted selected sensor.
     */
    handleSensorClick = async(sensorID) => {
        //const {screenProps} = this.props
        //const {currentUser, activityStore} = screenProps

        //await activityStore.filterBySensor(currentUser, sensorID)
        //await activityStore.setView('List')
        //if (activeRouteKey(this.props.navigation.state) === 'Activities') {
            // nav event won't fire to trigger data refresh, so we manually fetch
        //    activityStore.fetchSensorEvents(currentUser)
        //}
        //console.log(sensorID)
        //this.jumpTo('Activities')

        /**transfer parameters sensorID to overview screen it will be showing highlight to parameter's sensor */
        //console.log('------', sensorID)
        this.jumpTo('Overview', {sensorID})
    }

    handleFaqClick = () => {
        this.jumpTo('Faq')
    }

    /**
     * go to summary screen stack
     */
    handleDailySummaryClick = (id) => {
        this.jumpTo('DailySummary', {id})
    }

    jumpTo(screen, options = {}) {
        const {navigation} = this.props

        navigation.closeNotificationDrawer()
        navigation.navigate(screen, options)
    }

    refreshData = async() => {
        const {currentUser, notificationStore, activityStore} = this.props.screenProps

        notificationStore.fetchNotifications(currentUser)
        if (!activityStore.activities.length) {
            activityStore.mostRecent(currentUser)
        }
    }

    /**
     * rendering delete all button and list of notification. Child component is NotificationItem.
     */
    render() {
        const {notificationStore} = this.props.screenProps
        const notifications = this.notifications
        const dismissingIDs = notificationStore.dismissInProgressNotificationIDs

        return (
            <View style={styles.container}>
                <Text style={styles.h2}>Alerts</Text>
                {notifications.length > 0 && (
                    <TouchableHighlight
                        style={styles.dismissAllLink}
                        onPress={this.handleDismissAll}
                        underlayColor="rgba(0, 0, 0, 0)"
                    >
                        <Text style={styles.dimissAllText}>Delete All</Text>
                    </TouchableHighlight>
                )}
                <View style={styles.content}>
                    <FlatList
                        data={notifications}
                        ListEmptyComponent={<Text style={styles.note}>No New Alerts</Text>}
                        renderItem={({item}) => (
                            <NotificationItem
                                notification={item}
                                dismissing={dismissingIDs.includes(item.ID)}
                                onDismiss={this.handleDismiss}
                                //onSensorClick={() => this.props.navigation.navigate('Overview')}
                                onSensorClick={this.handleSensorClick}
                                onSummaryClick={this.handleDailySummaryClick}
                                onFaqClick={this.handleFaqClick}
                            />
                        )}
                    />
                </View>
            </View>
        )
    }
}

const ConnectedNotifications = (props) => {
    return (
        <Subscribe to={[ActivitiesContainer, AuthContainer, NotificationContainer, HomeInfoContainer]}>
            {(activityStore, authStore, notificationStore,  homeInfoStore) => (
                <Notifications
                    {...props}
                    screenProps={{
                        activityStore,
                        currentUser: authStore.currentUser,
                        notificationStore,
                        homeInfoStore,
                    }}
                />
            )}
        </Subscribe>
    )
}

export default ConnectedNotifications
