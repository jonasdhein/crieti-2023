import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View
} from 'react-native';

import { DemoScreen } from './src/screens/DemoScreen';
import { TasksScreen } from './src/screens/TasksScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style='auto'
      translucent={false}
      backgroundColor='#FFF'
      />

      <TasksScreen />
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
