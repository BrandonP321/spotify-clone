import React, { useEffect } from 'react';
import { LogBox, NativeModules, View } from 'react-native';
import styles from "./App.style";
import Navigation from './src/global/Navigation/Navigation';
import { StatusBar } from 'expo-status-bar';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { Provider } from 'react-redux';
import { store } from './src/global/features/store';

LogBox.ignoreLogs(["Require cycle"]);

export default function Index() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  )
}

export const App = function App() {
  useEffect(() => {
    /* Gives app access to javascript URL functionality */
    setupURLPolyfill();

    /* Android specific navigation bar settings */
    // NavigationBar.setBackgroundColorAsync("rgba(0, 0, 0, 1)");
  }, []);

  return (
    <View style={styles.appWrapper}>
      {/* controls phone's native status bar at top of screen */}
      <StatusBar style={"light"} backgroundColor={"rgba(0, 0, 0, 0.5)"} />
      <Navigation />
    </View>
  );
}