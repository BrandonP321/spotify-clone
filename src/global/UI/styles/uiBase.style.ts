import { colors } from "./colors.style";

const globalEleHeights = {
    tabBarHeight: 70,
    floatingMusicPlayerHeight: 60,
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