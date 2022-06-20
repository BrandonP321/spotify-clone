import { StyleSheet } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

export default StyleSheet.create({
    contentWrapper: {

    },
    title: {
        marginLeft: uiBase.padding.appHorizontalPadding,
        fontSize: 25,
    },
    artistWrapper: {
        flexDirection: "row",
        paddingLeft: uiBase.padding.appHorizontalPadding,
        alignItems: "center"
    },
    artistImg: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
    },
    artistName: {
        color: uiBase.colors.textPrimary,
        marginLeft: 10,
        lineHeight: 19
    },
    releaseDate: {
        color: uiBase.colors.textSecondary,
        marginLeft: uiBase.padding.appHorizontalPadding,
        marginTop: 7
    },
    playBtn: {

    }
})