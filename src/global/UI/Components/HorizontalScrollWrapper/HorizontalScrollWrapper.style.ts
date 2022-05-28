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
        fontSize: 28,
        fontWeight: "700",
        color: uiBase.colors.textPrimary,
        marginBottom: 20,
    }
})