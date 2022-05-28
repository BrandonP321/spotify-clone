import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import styles from "./App.style";
import Navigation from './src/global/Navigation/Navigation';
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from 'expo-status-bar';
import * as Linking from "expo-linking"

const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      setUrl(initialUrl);
      setProcessing(false);
    };

    getUrlAsync();
  }, []);

  return { url, processing };
};

export default function App() { 
  // const [initialUrl, setInitialUrl] = useState<string | null>(null);
  // const { processing, url } = useInitialURL();

  console.log("render")

  useEffect(() => {
    /* Android specific navigation bar settings */
    NavigationBar.setBackgroundColorAsync("rgba(0, 0, 0, 1)");

    // listens for changes to app url if app is already open
    // Linking.addEventListener("url", (e) => {
    //   console.log("change");
    //   alert(e?.url);
    // });

    // Linking.getInitialURL().then(url => setInitialUrl(url));

    const clientId = "13786cced89e4dba9de0f15126c86c1f";
    const scope = "user-read-private user-read-email";
    const redirectURI = Linking.createURL("");

    console.log(redirectURI);

    // open spotfiy auth page in browser
    Linking.openURL(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectURI}`)
  }, [])

  return (
    <View style={styles.appWrapper}>
      {/* <Text style={{ color: "#ffffff", fontSize: 20, marginTop: 50 }}>{url}</Text> */}
      {/* controls phone's native status bar at top of screen */}
      <StatusBar style={"light"} backgroundColor={"rgba(0, 0, 0, 0.5)"}/>
      <Navigation/>
    </View>
  );
}