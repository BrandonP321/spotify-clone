import { StyleSheet } from "react-native";
import { ScreenUtils } from "../../../../utils/ScreenUtils";
import { uiBase } from "../../styles/uiBase.style";

const { vw } = ScreenUtils;

const playerPadding = 7;
const playerInnerHeight = uiBase.heights.floatingMusicPlayerHeight - (playerPadding * 2);
const playerInnerWidth = vw - uiBase.padding.appHorizontalPadding - (playerPadding * 2);
const playIconWidth = 30;
const playIconWrapperWidth = playIconWidth + 15;
const albumImgWidth = playerInnerHeight;

export default StyleSheet.create({
  playerWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10
  },
  musicPlayer: {
    height: uiBase.heights.floatingMusicPlayerHeight,
    width: vw - uiBase.padding.appHorizontalPadding,
    backgroundColor: uiBase.colors.slate(1),
    borderRadius: 7,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: playerPadding
  },
  image: {
    width: albumImgWidth,
    height: albumImgWidth,
    borderRadius: 5
  },
  textWrapper: {
    justifyContent: "center",
    height: playerInnerHeight,
    paddingTop: 3,
    width: playerInnerWidth - albumImgWidth - playIconWrapperWidth,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 13,
    lineHeight: 14
  },
  artist: {
    fontSize: 12,
    lineHeight: 14,
    marginTop: 2,
    color: uiBase.colors.textSecondary
  },
  playIconWrapper: {
    width: playIconWrapperWidth,
    height: playIconWrapperWidth,
    borderRadius: playIconWrapperWidth / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  playIcon: {
    width: playIconWidth,
    height: playIconWidth,
  }
})