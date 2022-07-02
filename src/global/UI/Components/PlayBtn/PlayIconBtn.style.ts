import { StyleSheet } from "react-native";
import { uiBase } from "../../styles/uiBase.style";

const playIconWidth = 20;
const playIconHeight = playIconWidth;
const playIconWrapperPadding = 30;
export const playIconWrapperHeight = playIconWrapperPadding + playIconHeight;

export const playIconFixedTop = uiBase.heights.headerHeight - (playIconWrapperHeight / 2);

export default StyleSheet.create({
    animationWrapper: {
        position: "absolute",
        right: uiBase.padding.appHorizontalPadding,
        zIndex: 1100
    },
    playIconPressable: {
        justifyContent: "center",
        alignItems: "center",
        height: playIconWrapperHeight,
        width: playIconWrapperHeight,
        borderRadius: (playIconWrapperHeight) / 2,
        backgroundColor: uiBase.colors.lime(1),
    },
    playIcon: {
        height: playIconHeight,
        width: playIconWidth,
    },
})