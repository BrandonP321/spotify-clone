import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

const { vw } = ScreenUtils

const headerVerticalPadding = 0;
const backArrowWidth = 35;
const backArrowHeight = backArrowWidth;

export default StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: uiBase.heights.headerHeight,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: uiBase.padding.appHorizontalPadding,
        paddingBottom: headerVerticalPadding,
        paddingTop: headerVerticalPadding + ScreenUtils.statusBarHeight,
        zIndex: 1000,
    },
    backArrowWrapper: {
        marginRight: 25,
        width: backArrowWidth,
        height: backArrowHeight,
        borderRadius: backArrowWidth / 2,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    backArrow: {
        color: uiBase.colors.textPrimary,
        fontWeight: "700",
        fontSize: 20
    },
    title: {
        fontWeight: "700",
        color: uiBase.colors.textPrimary
    }
})