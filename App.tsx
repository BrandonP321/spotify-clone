import "react-native-gesture-handler"
import React, { useEffect } from 'react';
import { LogBox, NativeModules, View } from 'react-native';
import styles from "./App.style";
import Navigation from './src/global/Navigation/Navigation';
import { StatusBar } from 'expo-status-bar';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { Provider } from 'react-redux';
import { store } from './src/global/features/store';
import { useFonts } from 'expo-font';
import { Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from "expo-splash-screen";

LogBox.ignoreLogs(["Require cycle"]);

export default function Index() {
  useEffect(() => {
    // keep splash screen active until hidden by home screen being rendered
    SplashScreen.preventAutoHideAsync();
  }, [])

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </Provider>
  )
}

export const App = function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold
  });

  useEffect(() => {
    /* Gives app access to javascript URL functionality */
    setupURLPolyfill();

    /* Android specific navigation bar settings */
    // NavigationBar.setBackgroundColorAsync("rgba(0, 0, 0, 1)");
  }, []);

  if (!fontsLoaded) {
    // TODO: return loading spinner
    return null
  }

  return (
    <View style={styles.appWrapper}>
      {/* controls phone's native status bar at top of screen */}
      <StatusBar style={"light"} backgroundColor={"rgba(0, 0, 0, 0.5)"} />
      <Navigation />
    </View>
  );
}