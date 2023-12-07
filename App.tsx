import 'react-native-gesture-handler';
import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

import { Routes } from './src/routes/Routes';
import { AppProvider } from './src/contexts/AppContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, error] = useFonts({
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
  } else {
    onLayoutRootView();
  }

  return (
    <AppProvider>
      <StatusBar style='light' />
      <Routes />
    </AppProvider>
  );
}
