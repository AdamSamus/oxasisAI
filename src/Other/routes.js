import Help from './index'
import Faq from './Faq'
import DeviceLocation from './DeviceLocation'
import Logout from './Logout'
import DailySummaryScreen from './DailySummary'
import ManageUsers from './ManageUsers'
import ManageSensors from './ManageSensors'
import InviteUsers from './InviteUsers'
import CreateAlert from './CreateAlert'
import InviteConfirmation from './InviteConfirmation'
import Profile from './Profile'
import ProfileEdit from './ProfileEdit'
import NotificationPreferences from './NotificationPreferences'
import HomeProfile from './HomeProfile'
import ManageSensorEditIcons from './ManageSensorEditIcons'

const DailySummary = {
  screen: DailySummaryScreen,
  navigationOptions: ({navigation}) => ({
    id: navigation.state.params.id,
  }),
}

const ROUTES = {
  Help,
  Faq,
  Logout,
  DailySummary,
  ManageUsers,
  InviteUsers,
  ManageSensorEditIcons,
  Profile,
  ManageSensors,
  ProfileEdit,
  NotificationPreferences,
  InviteConfirmation,
  HomeProfile,
  CreateAlert,
  DeviceLocation
}

export default ROUTES
