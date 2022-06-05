import { StyleSheet } from "react-native";
import { uiBase } from "../../UI/styles/uiBase.style";

export default StyleSheet.create({
    pageWrapper: {
        paddingTop: uiBase.padding.appTopPadding,
        paddingBottom: uiBase.padding.appBottomPadding,
        // backgroundColor: uiBase.colors.appBg,
    },
    fixedContent: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})