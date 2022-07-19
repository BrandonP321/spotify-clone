import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList, ValidScreenName } from "../global/Navigation/Screens";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/* Typed useNavigation hook */
export const useAppNavigation = () => useNavigation<BottomTabNavigationProp<RootStackParamList>>()