import { StyleSheet } from "react-native";
import { uiBase } from "../../styles/uiBase.style";

export default StyleSheet.create({
    wrapper: {
        paddingHorizontal: uiBase.padding.appHorizontalPadding,
        marginBottom: 30,
    },
    scrollWrapper: {

    },
    heading: {
        fontSize: 25,
        fontFamily: uiBase.fontFamilies.primary.bold,
        color: uiBase.colors.textPrimary,
        marginBottom: 20,
    }
})