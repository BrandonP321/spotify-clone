import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";

export const coverImgPadding = 20;
export const coverImgWrapperHeight = 250;
export const coverImgHeight = coverImgWrapperHeight - (coverImgPadding * 2);
export const topContentHeight = coverImgWrapperHeight + ScreenUtils.statusBarHeight;

export default StyleSheet.create({
    coverImgScreen: {
        paddingTop: 0,
    },
    headerWrapper: {
        overflow: "visible",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    topContentWrapper: {
        height: topContentHeight,
        paddingBottom: coverImgPadding,
        justifyContent: "flex-end",
    },
    topContentGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: topContentHeight + 100
    },
    coverImg: {
        height: coverImgHeight,
        resizeMode: "contain"
    },
})