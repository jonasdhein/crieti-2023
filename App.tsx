import 'react-native-gesture-handler';
import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

import { DemoScreen } from './src/screens/DemoScreen';
import { TasksScreen } from './src/screens/TasksScreen';
import { StorageScreen } from './src/screens/StorageScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { theme } from './src/themes/Theme';
import { Routes } from './src/routes/Routes';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, error ] = useFonts({
    'Exo2Light': require('./src/assets/fonts/Exo2-Light.ttf'),
    'Exo2Regular': require('./src/assets/fonts/Exo2-Regular.ttf'),
    'Exo2Bold': require('./src/assets/fonts/Exo2-Bold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} 
      onLayout={onLayoutRootView}>
      <StatusBar style='dark'
        translucent={false}
        backgroundColor='#7E57C2'
      />

      <Routes />

    </View>
  );
}
