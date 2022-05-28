import { Dimensions } from "react-native";

export class ScreenUtils {
    public static window = Dimensions.get("window");
    public static vw = this.window.width;
    public static vh = this.window.height;

    public static getScreenTitle() {
        
    }
}