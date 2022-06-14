import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

const { vw } = ScreenUtils;

const artistImgHeight = vw;
export const artistImgWrapperHeight = 290;
const titleFontSize = 45;

const playIconWidth = 20;
const playIconHeight = playIconWidth;
const playIconWrapperPadding = 30;
const playIconWrapperHeight = playIconWrapperPadding + playIconHeight;

export const playIconPositionTop = artistImgWrapperHeight + 30;
export const scrollOffsetPlayIconFix = playIconPositionTop - uiBase.heights.headerHeight + (playIconWrapperHeight / 2);

const topAbsolutePosition: StyleProp<ViewStyle> = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
}

const playIconStyles = StyleSheet.create({
    playIconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: playIconWrapperHeight,
        width: playIconWrapperHeight,
        borderRadius: (playIconWrapperHeight) / 2,
        backgroundColor: uiBase.colors.lime(1),
        position: "absolute",
        right: uiBase.padding.appHorizontalPadding,
        top: playIconPositionTop,
        zIndex: 1100
    },
    // icon wrapper's position when fixed to the header
    fixedIconWrapper: {
        top: uiBase.heights.headerHeight - (playIconWrapperHeight / 2),
    },
    playIcon: {
        height: playIconHeight,
        width: playIconWidth,
    },
})

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
    ...playIconStyles,
    content: {
        zIndex: 9
    },
    headerWrapper: {
        height: 0.5,
        overflow: "visible",
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