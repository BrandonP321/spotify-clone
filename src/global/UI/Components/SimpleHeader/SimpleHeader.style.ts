import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

const { vw } = ScreenUtils

const headerVerticalPadding = 0;
const backArrowWidth = 35;
const backArrowHeight = backArrowWidth;

export default StyleSheet.create({
    header: {
        height: uiBase.heights.headerHeight,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: uiBase.padding.appHorizontalPadding,
        paddingLeft: uiBase.padding.appHorizontalPadding - 5,
        paddingBottom: headerVerticalPadding,
        paddingTop: headerVerticalPadding + ScreenUtils.statusBarHeight,
    },
    backArrowWrapper: {
        marginRight: 25,
        width: backArrowWidth,
        height: backArrowHeight,
        borderRadius: backArrowWidth / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    backArrow: {
        width: backArrowWidth,
        height: 23,
    },
    title: {
        fontWeight: "700",
        color: uiBase.colors.textPrimary
    }
})