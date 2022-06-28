import { StyleSheet } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

export const headerOuterPadding = 7;
export const headerHeight = 55;
export const headerWidth = ScreenUtils.vw;
export const headerInputUnfocusedWidth = headerWidth - (headerOuterPadding * 2)
export const headerInputUnfocusedHeight = headerHeight - (headerOuterPadding * 2);

export default StyleSheet.create({
    header: {
        paddingTop: ScreenUtils.statusBarHeight,
        backgroundColor: uiBase.colors.dark(1)
    },
    wrapper: {
        height: headerHeight,
        backgroundColor: uiBase.colors.dark(1),
        justifyContent: "center",
        alignItems: "center"
    },
    inputOuterWrapper: {
        backgroundColor: uiBase.colors.lightGray(0.4),
        justifyContent: "center",
        alignItems: "center",
    },
    inputInnerWrapper: {
        
    },
    input: {
        fontFamily: uiBase.fontFamilies.primary.semiBold,
        height: headerInputUnfocusedHeight,
        color: uiBase.colors.textPrimary
    },
    tabs: {
        flexDirection: "row",
        paddingLeft: 15,
        marginTop: 5,
        flexWrap: "wrap"
    },
    tab: {
        marginRight: 10,
        marginTop: 10,
        backgroundColor: uiBase.colors.lime(1),
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1
    },
    tabText: {
        lineHeight: 16

    },
    placeholderWrapper: {
        position: "absolute",
        top: ScreenUtils.statusBarHeight,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    placeholderText: {
        fontFamily: uiBase.fontFamilies.primary.semiBold,
    }
})