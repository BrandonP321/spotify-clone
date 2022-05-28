import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

const { vw } = ScreenUtils;

export default StyleSheet.create({
  musicPlayer: {
    height: uiBase.heights.floatingMusicPlayerHeight,
    position: "absolute",
    width: vw - uiBase.padding.appHorizontalPadding,
    bottom: uiBase.heights.tabBarHeight,
    left: uiBase.padding.appHorizontalPadding / 2,
    backgroundColor: "gray",
    borderRadius: 5,
    zIndex: 10
  }
})