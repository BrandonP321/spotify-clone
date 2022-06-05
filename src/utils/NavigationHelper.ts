import { createNavigationContainerRef, NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList, ValidScreenName } from "../global/Navigation/Screens";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/* Types useNavigation hook */
export const useAppNavigation = () => useNavigation<NavigationProp<RootStackParamList>>()

export class NavigationHelper {
    public static navigate(name: ValidScreenName, params: RootStackParamList[typeof name]) {
        if (navigationRef.isReady()) {
            navigationRef.navigate(name, params);
        }
    }

    public static goToArtistScreen = (id?: string) => {
        if (id) {
            alert("navigate to artist screen");
        }
    }
}