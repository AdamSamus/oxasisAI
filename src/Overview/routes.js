/*Overview stack where are 2 components OverviewIndex and RoomRoute.*/
import OverviewIndex from './index'
import Room from './Room'

const RoomRoute = {
  screen: Room,
  navigationOptions: ({navigation}) => ({
    roomType: navigation.state.params.roomType,
    title: navigation.state.params.roomType,
  }),
}

const ROUTES = {
  Overview: OverviewIndex,
  Room: RoomRoute,
}

export default ROUTES
