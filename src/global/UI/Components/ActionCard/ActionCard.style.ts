import { StyleSheet } from "react-native";
import { uiBase } from "../../styles/uiBase.style";

const actionCardWidth = 155;
const actionCardImgHeight = actionCardWidth;

export default StyleSheet.create({
    actionCard: {
        marginRight: uiBase.padding.appHorizontalPadding,
        width: actionCardWidth,
    },
    pressed: {
        opacity: 0.6,
        transform: [
            { scale: 0.98 }
        ],
    },
    withoutRightMargin: {
        marginRight: 0,
    },
    img: {
        width: actionCardWidth,
        height: actionCardImgHeight,
        marginBottom: 10
    },
    title: {
        color: uiBase.colors.textPrimary,
        fontWeight: "700",
        fontSize: 14
    },
    blurb: {
        marginTop: 2,
        color: uiBase.colors.textSecondary,
        fontSize: 13,
    },
    artistCard: {
        borderRadius: actionCardImgHeight / 2,
    },
    artistCardTitle: {
        textAlign: "center"
    }
})