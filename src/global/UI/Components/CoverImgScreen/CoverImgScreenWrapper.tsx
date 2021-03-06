import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { ImageStyle, StyleProp, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ScreenWrapper, { ScreenWrapperProps } from '../../../Components/ScreenWrapper/ScreenWrapper'
import { uiBase } from '../../styles/uiBase.style';
import SimpleHeader from '../SimpleHeader/SimpleHeader';
import styles, { coverImgHeight, topContentHeight } from "./CoverImgScreenWrapper.style";

type CoverImgScreenWrapperProps = Omit<ScreenWrapperProps, "onScroll" | "stickyHeaderIndices" | "children" | "headerComponent"> & {
  children?: React.ReactElement;
  headerComponent?: JSX.Element;
  coverImg?: string;
  headerTitle?: string;
  /* Offset value needs to be passed in as a prop so it is easily accessible to other child components */
  scrollOffset: SharedValue<number>;
}

const gradientColor = (l: number, a?: number) => `hsla(0, 0%, ${l * 100}%, ${a ?? 1})`;

/**
 * Extension of <ScreenWrapper> with predefined styles and an animated cover image
 */
export default function CoverImgScreenWrapper(props: CoverImgScreenWrapperProps) {
  const { children, coverImg, headerTitle, scrollOffset, headerComponent, ...rest } = props;

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e?.contentOffset.y;
  })

  return (
    <>
      <View style={styles.headerWrapper}>
        <SimpleHeader
          title={headerTitle}
          bgOpacityInterpolationInput={[topContentHeight / 4 * 2.5, topContentHeight / 4 * 3.5]}
          scrollOffset={scrollOffset}
          titleOpacityInterpolationInput={[topContentHeight, topContentHeight + 50]}
        />
      </View>

      <ScreenWrapper {...rest} onScroll={handleScroll} style={styles.coverImgScreen} headerComponent={() => (
        <>
          <LinearGradient colors={[gradientColor(0.25, 1), uiBase.colors.appBg(0)]} style={styles.topContentGradient} />
          <View style={styles.topContentWrapper}>
            <AnimatedCoverImg
              img={coverImg}
              scrollOffset={scrollOffset}
              heightInterpolationInput={[0, topContentHeight / 3]}
              opacityInterpolationInput={[topContentHeight / 3, topContentHeight / 4 * 2.5]}
              yTransformInterpolationInput={[topContentHeight / 3, topContentHeight / 4 * 2.5]}
            />
          </View>
          {headerComponent}
        </>
      )}>
      {children}
    </ScreenWrapper>
    </>
  )
}

type AnimatedCoverImgProps = {
  img?: string;
  style?: StyleProp<ImageStyle>;
  scrollOffset: SharedValue<number>;
  heightInterpolationInput: number[];
  opacityInterpolationInput: number[];
  yTransformInterpolationInput: number[];
}

/**
 * Cover image that shrinks and fades out as user scrolls down
 */
const AnimatedCoverImg = (props: AnimatedCoverImgProps) => {
  const { img, style, scrollOffset, heightInterpolationInput, opacityInterpolationInput, yTransformInterpolationInput } = props;

  const animStyles = useAnimatedStyle(() => ({
    height: interpolate(scrollOffset.value, heightInterpolationInput, [coverImgHeight, coverImgHeight - heightInterpolationInput[1]], "clamp"),
    opacity: interpolate(scrollOffset.value, opacityInterpolationInput, [1, 0], "clamp"),
    transform: [
      { translateY: interpolate(scrollOffset.value, yTransformInterpolationInput, [0, 40], "clamp") },
    ]
  }))

  return (
    <Animated.Image source={{ uri: img }} style={[styles.coverImg, style, animStyles]} />
  )
}