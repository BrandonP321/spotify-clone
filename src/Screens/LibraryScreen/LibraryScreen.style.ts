import { StyleSheet } from "react-native";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { ScreenUtils } from "../../utils/ScreenUtils";

export default StyleSheet.create({
    header: {
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderBottomWidth: 2,
        paddingTop: ScreenUtils.statusBarHeight,
        backgroundColor: uiBase.colors.appBg(1),
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    headerContent: {
        backgroundColor: uiBase.colors.appBg(1),
        // TODO: add ios box shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,
        paddingHorizontal: uiBase.padding.appHorizontalPadding,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        overflow: "visible"
    },
    headerTitle: {
        fontSize: 25,
    },
    headerImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15
    },
    tabs: {
        flexDirection: "row",
        paddingLeft: uiBase.padding.appHorizontalPadding,
        marginTop: 5,
        marginBottom: 10,
        flexWrap: "wrap"
    },
    tab: {
        marginRight: 10,
        marginTop: 10,
        backgroundColor: uiBase.colors.lime(1),
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
    },
    tabText: {
        lineHeight: 16

    },
})