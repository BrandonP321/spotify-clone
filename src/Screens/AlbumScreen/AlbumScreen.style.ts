import { StyleSheet } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

const albumImgPadding = 20;
const albumImgWrapperHeight = 250;
export const albumImgHeight = albumImgWrapperHeight - (albumImgPadding * 2);
export const topContentHeight = albumImgWrapperHeight + ScreenUtils.statusBarHeight;

export default StyleSheet.create({
    albumScreen: {
        paddingTop: 0,
    },
    headerWrapper: {
        height: 0.5,
        overflow: "visible",
    },
    topContentWrapper: {
        height: topContentHeight,
        paddingBottom: albumImgPadding,
        justifyContent: "flex-end",
    },
    topContentGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: topContentHeight + 100
    },
    albumImg: {
        height: albumImgHeight,
        resizeMode: "contain"
    },
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