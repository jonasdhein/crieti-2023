import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View
} from 'react-native';

import { DemoScreen } from './src/screens/DemoScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style='auto' translucent={false}/>

      <DemoScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  }
});
