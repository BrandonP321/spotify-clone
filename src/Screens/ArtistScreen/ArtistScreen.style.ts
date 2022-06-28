import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { playIconWrapperHeight } from "../../global/UI/Components/PlayBtn/PlayIconBtn.style";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

const { vw } = ScreenUtils;

const artistImgHeight = vw;
export const artistImgWrapperHeight = 290;
const titleFontSize = 45;

/* Default btn position on screen */
export const playIconPositionTop = artistImgWrapperHeight + 30;
/* scroll point at which icon needs to be fixed to top of screen */
export const scrollOffsetPlayIconFix = playIconPositionTop - uiBase.heights.headerHeight + (playIconWrapperHeight / 2);

const topAbsolutePosition: StyleProp<ViewStyle> = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
}

export default StyleSheet.create({
    artistScreen: {
        paddingTop: 0
    },
    fixedImgWrapper: {
        height: artistImgWrapperHeight
    },
    artistImg: {
        width: vw,
        height: artistImgHeight,
    },
    artistImgOverlay: {
        ...topAbsolutePosition,
        backgroundColor: uiBase.colors.appBg(0.5),
        height: artistImgWrapperHeight
    },
    imgGradient: {
        ...topAbsolutePosition,
        bottom: 0,
    },
    titleBoxOuterWrapper: {
        height: 0,
        overflow: "visible",
        backgroundColor: "red",
    },
    titleBoxContent: {
        height: artistImgWrapperHeight,
        justifyContent: "flex-end",
        paddingHorizontal: uiBase.padding.appHorizontalPadding,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0
    },
    artistTitle: {
        marginBottom: 0,
        fontSize: titleFontSize,
        fontFamily: uiBase.fontFamilies.primary.bold,
        color: uiBase.colors.textPrimary,
        lineHeight: titleFontSize + 5
    },
    contentWrapper: {
        backgroundColor: uiBase.colors.appBg(1),
        paddingTop: 10
    },
    contentTopGradient: {
        height: 100,
        ...topAbsolutePosition,
    },
    playBtn: {
        
    },
    content: {
        zIndex: 9
    },
    headerWrapper: {
        overflow: "visible",
        zIndex: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    heading: {
        marginTop: 50,
        marginLeft: uiBase.padding.appHorizontalPadding,
    },
    albumListItem: {

    },
    ablumListItemImg: {
        
    }
})