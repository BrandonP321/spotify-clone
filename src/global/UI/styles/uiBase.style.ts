import { DeviceUtils } from "../../../utils/DeviceUtils";
import { ScreenUtils } from "../../../utils/ScreenUtils";
import { colors } from "./colors.style";

const { vw } = ScreenUtils

const globalEleHeights = {
    tabBarHeight: 70,
    floatingMusicPlayerHeight: 60,
    headerHeight: DeviceUtils.Android ? 100 : 0.2 * vw,
    maxHeaderHeight: 100
}

const defaultPadding = {
    appTopPadding: 65,
    appBottomPadding: globalEleHeights.floatingMusicPlayerHeight + globalEleHeights.tabBarHeight,
    appHorizontalPadding: 15,
}

export const uiBase = {
    colors: colors,
    padding: defaultPadding,
    heights: globalEleHeights
}