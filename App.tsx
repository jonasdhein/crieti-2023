import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View
} from 'react-native';

import { DemoScreen } from './src/screens/DemoScreen';
import { TasksScreen } from './src/screens/TasksScreen';

export default function App() {

  return (
    <>
      <StatusBar style='light'
      translucent={false}
      backgroundColor='#7E57C2'
      />

      <TasksScreen />
    </>
  );
}
