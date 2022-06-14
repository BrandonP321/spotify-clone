import { StyleSheet } from "react-native";
import { uiBase } from "../../styles/uiBase.style";

const trackImgWidth = 45;
const trackImgHeight = trackImgWidth;

export default StyleSheet.create({
    listItem: {
        flexDirection: "row",
        paddingHorizontal: uiBase.padding.appHorizontalPadding * 1.25,
        alignItems: "center",
        marginTop: uiBase.padding.appHorizontalPadding
    },
    trackNumberWrapper: {
        marginRight: uiBase.padding.appHorizontalPadding * 1.25,
    },
    trackNumber: {
        color: uiBase.colors.textPrimary
    },
    img: {
        width: trackImgWidth,
        height: trackImgHeight,
        marginRight: 10
    },
    textWrapper: {

    },
    title: {
        color: uiBase.colors.textPrimary,
        fontFamily: uiBase.fontFamilies.primary.semiBold
    },
    subtitle: {
        marginTop: 0,
        color: uiBase.colors.textSecondary,
        fontSize: 12,
        lineHeight: 13
    },
    moreBtnWrapper: {
        
    },
})