import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

export const trackImgWidth = 45;
const trackImgHeight = trackImgWidth;
export const imgMarginRight = 10;
const moreIconWidth = 6;
const moreIconWrapperWidth = moreIconWidth + (uiBase.padding.appHorizontalPadding * 2);
export const trackNumberWidth = uiBase.padding.appHorizontalPadding * 3;
export const textWrapperWidth = ScreenUtils.vw - (trackNumberWidth + trackImgWidth + imgMarginRight + moreIconWrapperWidth);

export default StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        marginTop: uiBase.padding.appHorizontalPadding
    },
    trackNumberWrapper: {
        width: trackNumberWidth,
        alignItems: "center"
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
        width: textWrapperWidth,
        justifyContent: "center"
    },
    title: {
        color: uiBase.colors.textPrimary,
        fontFamily: uiBase.fontFamilies.primary.regular,
        fontSize: 15,
        flexWrap: "wrap"
    },
    subtitle: {
        marginTop: 0,
        color: uiBase.colors.textSecondary,
        fontSize: 12,
        lineHeight: 13
    },
    moreBtnWrapper: {
        width: moreIconWrapperWidth,
        height: moreIconWrapperWidth,
        borderRadius: moreIconWrapperWidth / 2,
        justifyContent: "center",
        alignItems: "center"
    },
    moreBtnIcon: {
        height: 15,
        width: moreIconWidth
    }
})