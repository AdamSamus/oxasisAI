import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
const numColumns = 4;
const data = [ 'android', 'date-range', 'edit', 'directions-car', 'local-bar' ,'laptop-windows' ,'face','free-breakfast','import-contacts','warning',
  'pan-tool', 'phonelink-ring','radio', 'restaurant', 'sentiment-satisfied', 'sentiment-very-dissatisfied', 'sentiment-dissatisfied', 'free-breakfast',
   'shopping-cart', 'straighten', 'store-mall-directory', 'subway', 'tablet','thumb-down', 'thumb-up', 'toc', 'toys', 'transfer-within-a-station', 'view-comfy', 'vpn-key',
  'wallpaper',  'wb-sunny', 'wb-incandescent', 'wb-cloudy', 'wc','weekend', 'whatshot', 'transfer-within-a-station', 'work', 'wifi-tethering',
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};


export default class App extends React.Component {

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Icon name={data[index]} size={50} color='#13477D'/>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
         renderItem={({item ,index}) => (

                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => Alert.alert(`You bastard clicked on ${item} icon`)}
                >
                        <View style={styles.item}>
                          <Icon name={data[index]} size={30} color='#13477D'/>
                        </View>
                </TouchableOpacity>
              )}
              numColumns={numColumns}


      />

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  item: {
  width: 105,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'blue',
  },
  itemText: {
    color: 'red',
  },
});