import { StyleSheet } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";

export default StyleSheet.create({
    title: {
        marginLeft: uiBase.padding.appHorizontalPadding,
        fontSize: 25,
    },
    followers: {
        color: uiBase.colors.textSecondary,
        paddingHorizontal: uiBase.padding.appHorizontalPadding,
    },
    playBtn: {

    },
    userWrapper: {
        flexDirection: "row",
        paddingLeft: uiBase.padding.appHorizontalPadding,
        alignItems: "center",
        marginBottom: 10,
    },
    userImg: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
    },
    userName: {
        color: uiBase.colors.textPrimary,
        marginLeft: 10,
        lineHeight: 19
    },
})