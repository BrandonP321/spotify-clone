import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home: {},
    AuthLoading: {},
    Artist: {
        artistId: string;
    }
}

export type ValidScreenName = keyof RootStackParamList;

export type ScreenProps<screen extends keyof RootStackParamList> = {
    navigation: NativeStackNavigationProp<RootStackParamList, screen>;
    route: RouteProp<RootStackParamList, screen>;
}