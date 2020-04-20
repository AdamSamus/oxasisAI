import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = null;
const LONGITUDE = null;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class DeviceLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0,
            longitudeDelta: 0
      })
    };
  }

  componentDidMount() {
  this.watchLocation();
  }

/*user’s coordinates to be sent continuously to our Tracker app*/
/*componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      this.pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude
        },
        channel: "location"
      });
    }
  }*/

  /*to avoid any memory leaks.*/
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


/*The watchLocation uses the geolocation API to watch changes in user’s location coordinates. So any time the user moves and
his position coordinates changes, watchPosition will return the user’s new coordinates.*/
  watchLocation = () => {
  const { coordinate } = this.state;
  console.log("findCoordinates")
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
        const { latitude, longitude } = position.coords; //added

        const newCoordinate = {
                  latitude,
                  longitude
                };

/*     if (Platform.OS === "android") {
                if (this.marker) {
                  this.marker._component.animateMarkerToCoordinate(
                    newCoordinate,
                    500 // 500 is the duration to animate the marker
                  );
                }
              } else {*/
                coordinate.timing(newCoordinate).start();
              //}

              this.setState({
                latitude,
                longitude
              });
            },
            error => console.log(error),
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter: 10
            }
          );
        };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

