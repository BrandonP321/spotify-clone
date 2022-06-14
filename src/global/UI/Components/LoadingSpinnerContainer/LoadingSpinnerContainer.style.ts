import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

export default StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: ScreenUtils.vh,
        backgroundColor: uiBase.colors.appBg(1),
        zIndex: 2000,
        opacity: 0,
    }
})