import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import { StyleSheet, View } from 'react-native';
import { uiBase } from '../UI/styles/uiBase.style';
import FloatingMusicPlayer from '../UI/Components/FloatingMusicPlayer/FloatingMusicPlayer';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenUtils } from '../../utils/ScreenUtils';
import AuthLoadingScreen from '../../Screens/AuthLoadingScreen/AuthLoadingScreen';
import { navigationRef } from '../../utils/NavigationHelper';
import ArtistScreen from '../../Screens/ArtistScreen/ArtistScreen';

export default function Navigation() {

  return (
    <NavigationContainer ref={navigationRef}>
      <FloatingMusicPlayer/>
      <TabNavigator />
    </NavigationContainer>
  )
}

type TabNavigatorProps = {

}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderTopWidth: 0,
    height: uiBase.heights.tabBarHeight,
    paddingBottom: 10,
    paddingTop: 10,
    /* removes default box shadow under tab bar */
    elevation: 0,
    position: "absolute",
    zIndex: 10
  },
  tabIcon: {
    color: uiBase.colors.textPrimary
  },
  gradientBg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: ScreenUtils.vw,
    height: uiBase.heights.tabBarHeight + uiBase.heights.floatingMusicPlayerHeight,
    zIndex: 9
  }
})

const TabNavigator = () => {
  /* Can use one tab navigator for entire app since bottom tab bar is always available for navigation */
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={"AuthLoading"} sceneContainerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }} screenOptions={({ route }) => ({
      header: () => null,
      tabBarStyle: styles.tabBar,
      tabBarIconStyle: styles.tabIcon,
      tabBarBackground: () => (
        <LinearGradient
          style={styles.gradientBg}
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, .7)", "rgba(0, 0, 0, 1)"]}
          locations={[0, 0.5, .9]}
        />
      )
    })}>
      <Tab.Screen name={"AuthLoading"} component={AuthLoadingScreen} options={{ tabBarButton: () => null }}/>
      <Tab.Screen name={"Home"} component={HomeScreen} options={{}}/>
      <Tab.Screen name={"Artist"} component={ArtistScreen} options={{ tabBarButton: () => null }}/>
    </Tab.Navigator>
  )
}