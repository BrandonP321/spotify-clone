import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import { StyleSheet, View } from 'react-native';
import { uiBase } from '../UI/styles/uiBase.style';
import FloatingMusicPlayer from '../UI/Components/FloatingMusicPlayer/FloatingMusicPlayer';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenUtils } from '../../utils/ScreenUtils';
import { navigationRef } from '../../utils/NavigationHelper';
import ArtistScreen from '../../Screens/ArtistScreen/ArtistScreen';
import AlbumScreen from '../../Screens/AlbumScreen/AlbumScreen';
import PlaylistScreen from '../../Screens/PlaylistScreen/PlaylistScreen';
import HomeActiveIcon from "../../../assets/tabIcons/house-blank-solid.svg";
import HomeInactiveIcon from "../../../assets/tabIcons/house-blank-light.svg";
import SearchActiveIcon from "../../../assets/tabIcons/magnifying-glass-solid.svg";
import SearchInactiveIcon from "../../../assets/tabIcons/magnifying-glass-light.svg";
import LibraryActiveIcon from "../../../assets/tabIcons/books-solid.svg";
import LibraryInactiveIcon from "../../../assets/tabIcons/books-light.svg";
import SearchScreen from '../../Screens/SearchScreen/SearchScreen';

export default function Navigation() {

  return (
    <NavigationContainer ref={navigationRef}>
      <FloatingMusicPlayer/>
      <TabNavigator />
    </NavigationContainer>
  )
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
    height: 25,
    width: 25,
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

const sharedTabIconProps = {
  style: styles.tabIcon
}

const inactiveIconProps = {
  ...sharedTabIconProps,
  fill: uiBase.colors.textSecondary
}

const activeIconProps = {
  ...sharedTabIconProps,
  fill: uiBase.colors.textPrimary
}

const TabNavigator = () => {
  /* Can use one tab navigator for entire app since bottom tab bar is always available for navigation */
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={"Home"} sceneContainerStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }} backBehavior={"history"} screenOptions={({ route }) => ({
      header: () => null,
      tabBarStyle: styles.tabBar,
      tabBarIconStyle: styles.tabIcon,
      tabBarActiveTintColor: uiBase.colors.textPrimary,
      tabBarInactiveTintColor: uiBase.colors.textSecondary,
      tabBarBackground: () => (
        <LinearGradient
          style={styles.gradientBg}
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, .7)", "rgba(0, 0, 0, 1)"]}
          locations={[0, 0.5, .9]}
        />
      ),
    })}>
      <Tab.Screen name={"Home"} component={HomeScreen} options={({route}) => ({
        tabBarIcon: ({ color, focused, size }) => focused ? <HomeActiveIcon {...activeIconProps}/> : <HomeInactiveIcon {...inactiveIconProps}/>
      })}/>
      <Tab.Screen name={"Artist"} component={ArtistScreen} options={{ tabBarButton: () => null }}/>
      <Tab.Screen name={"Album"} component={AlbumScreen} options={{ tabBarButton: () => null }}/>
      <Tab.Screen name={"Playlist"} component={PlaylistScreen} options={{ tabBarButton: () => null }}/>
      <Tab.Screen name={"Search"} component={SearchScreen} options={({route}) => ({
        tabBarIcon: ({ color, focused, size }) => focused ? <SearchActiveIcon {...activeIconProps}/> : <SearchInactiveIcon {...inactiveIconProps}/>
      })}/>
      <Tab.Screen name={"Library"} component={View} options={({route}) => ({
        tabBarIcon: ({ color, focused, size }) => focused ? <LibraryActiveIcon {...activeIconProps}/> : <LibraryInactiveIcon {...inactiveIconProps}/>
      })}/>
    </Tab.Navigator>
  )
};