import { StyleSheet } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

const { vw } = ScreenUtils;

const artistImgHeight = vw;
export const artistImgWrapperHeight = 290;
const titleFontSize = 50;
const titleMarginBottom = 5;

const playIconWidth = 20;
const playIconHeight = playIconWidth;
const playIconWrapperPadding = 30;
const playIconWrapperHeight = playIconWrapperPadding + playIconHeight;

export default StyleSheet.create({
    artistScreen: {
        paddingTop: 0
    },
    fixedImgWrapper: {
        height: artistImgWrapperHeight,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        overflow: "hidden"
    },
    artistImg: {
        width: vw,
        height: artistImgHeight,
    },
    artistImgOverlay: {
        backgroundColor: uiBase.colors.appBg(0.5),
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: artistImgWrapperHeight
    },
    imgGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    titleBoxWrapper: {
        height: artistImgWrapperHeight,
        justifyContent: "flex-end",
        paddingBottom: 0,
        paddingHorizontal: uiBase.padding.appHorizontalPadding
    },
    artistTitle: {
        marginBottom: 0,
        fontSize: titleFontSize,
        color: uiBase.colors.textPrimary,
        fontWeight: "900",
        lineHeight: titleFontSize
    },
    contentWrapper: {
        backgroundColor: uiBase.colors.appBg(1)
    },
    contentTopGradient: {
        height: 100,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
    },
    playIconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: playIconWrapperHeight,
        width: playIconWrapperHeight,
        borderRadius: (playIconWrapperHeight) / 2,
        backgroundColor: uiBase.colors.lime(1),
        position: "absolute",
        right: uiBase.padding.appHorizontalPadding,
        top: artistImgWrapperHeight + 30,
        zIndex: 1100
    },
    // icon wrapper's position when fixed to the header
    fixedIconWrapper: {
        top: uiBase.heights.headerHeight - (playIconWrapperHeight / 2),
    },
    playIcon: {
        height: playIconHeight,
        width: playIconWidth,
    }
})