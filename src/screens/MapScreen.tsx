import { TouchableOpacity, StyleSheet, Text, View } from "react-native"
import MapView from 'react-native-maps';
import { colors, theme } from "../themes/Theme"
import { Feather } from "@expo/vector-icons";
import Constants from 'expo-constants';
import { StatusBar } from "expo-status-bar";

export const MapScreen = ({ navigation, route }) => {

  console.log(route.params)

  console.log('H', Constants.statusBarHeight)

  return (
    <View style={theme.container}>
      <StatusBar style='dark' />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        style={styles.button}>
        <Feather name='arrow-left' size={24} color='#000' />
      </TouchableOpacity>
      <MapView
        initialRegion={{
          latitude: route.params.lat,
          longitude: route.params.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: 10,
    zIndex: 1
  },
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0
  },
});