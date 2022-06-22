import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

const modalHorizontalPadding = 25;
export const modalInnerWidth = ScreenUtils.vw - (modalHorizontalPadding * 2)

const modalHeaderHeight = 90;
const modalHeaderPaddingTop = ScreenUtils.statusBarHeight;
const modalChevronWidth = 20;
const modalChevronWrapperWidth = modalChevronWidth + 10;
const modalHeaderTextWrapperWidth = ScreenUtils.vw - (modalHorizontalPadding * 2) - (modalChevronWrapperWidth * 2);

const controlsStepIconWidth = 40;
const controlsPlayIconWidth = 30;
const controlsPlayWrapperWidth = controlsPlayIconWidth + 35;

export default StyleSheet.create({
    modal: {
        position: "absolute",
        top: ScreenUtils.vh,
        left: 0,
        right: 0,
        height: ScreenUtils.vh,
        backgroundColor: "red",
        zIndex: 11,
        paddingHorizontal: modalHorizontalPadding,
        paddingTop: modalHeaderPaddingTop + 100,
    },
    overlayWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        justifyContent: "flex-end"
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    overlayChildren: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // justifyContent: "flex-end",
        paddingHorizontal: modalHorizontalPadding,
        paddingBottom: 30
    },
    gradientBg: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    albumImg: {
        width: modalInnerWidth,
        height: modalInnerWidth,
    },
    header: {
        height: modalHeaderHeight,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingTop: modalHeaderPaddingTop,
        paddingHorizontal: modalHorizontalPadding,
        flexDirection: "row",
        alignItems: 'center',
    },
    backArrowWrapper: {
        width: modalChevronWrapperWidth,
        height: modalChevronWrapperWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    backArrow: {
        width: modalChevronWidth,
        height: modalChevronWidth
    },
    headerTextWrapper: {
        position: "absolute",
        top: ScreenUtils.statusBarHeight,
        bottom: 0,
        left: modalHorizontalPadding + modalChevronWrapperWidth,
        width: modalHeaderTextWrapperWidth,
        justifyContent: "center"
    },
    headerSubtitle: {
        fontSize: 10,
        lineHeight: 12,
        marginBottom: 2,
        textAlign: "center"
    },
    headerTitle: {
        fontSize: 11,
        lineHeight: 13,
        textAlign: "center"
    },
    title: {

    },
    artists: {

    },
    progressTrack: {
        backgroundColor: uiBase.colors.slate(1),
        height: 3
    },
    progressMarker: {
        backgroundColor: uiBase.colors.textPrimary
    },
    selectedTrack: {
        backgroundColor: uiBase.colors.textPrimary

    },
    progressTimes: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    progressTime: {
        color: uiBase.colors.textSecondary
    },
    controlsWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: modalInnerWidth,
    },
    playWrapper: {
        marginHorizontal: 25,
        width: controlsPlayWrapperWidth,
        height: controlsPlayWrapperWidth,
        borderRadius: controlsPlayWrapperWidth / 2,
        backgroundColor: uiBase.colors.textPrimary,
        justifyContent: 'center',
        alignItems: "center"
    },
    playIcon: {
        width: controlsPlayIconWidth,
        height: controlsPlayIconWidth
    },
    songStepWrapper: {
    },
    songStepIcon: {
        width: controlsStepIconWidth,
        height: controlsStepIconWidth
    },
    previewVideo: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
})