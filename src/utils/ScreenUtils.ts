import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export class ScreenUtils {
    public static window = Dimensions.get("window");
    public static vw = this.window.width;
    public static statusBarHeight = getStatusBarHeight();
    public static vh = this.window.height + this.statusBarHeight;

    public static getScreenTitle() {
        
    }
}