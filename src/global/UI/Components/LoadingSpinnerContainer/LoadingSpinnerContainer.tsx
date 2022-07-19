import React, { useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { AppHeading } from '../AppText/AppText';
import styles from "./LoadingSpinnerContainer.style";
import Spinner from "../../../../../assets/spinner-third-solid.svg";
import { uiBase } from '../../styles/uiBase.style';

type LoadingContainerProps = {
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  /* ms delay before hiding spinner when loading is finished */
  hideDelay?: number;
}

export const screenLoadingAnimationDuration = 150;

/**
 * Full screen loading spinner
 */
export default function LoadingContainer(props: LoadingContainerProps) {
  const animOpacity = useSharedValue(1);
  const spinnerRotation = useSharedValue(0);

  const containerAnimStyles = useAnimatedStyle(() => ({
    opacity: animOpacity.value
  }), [animOpacity.value])

  const spinnerAnimStyles = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${spinnerRotation.value}deg` }]
  }), [spinnerRotation.value])

  useEffect(() => {
    if (props.loading) {
      // start spinner animation
      spinnerRotation.value = withRepeat(withTiming(360, {duration: 750, easing: Easing.linear }), -1)

      // if loading, go straight to full opacity to hide all content about to disappear
      animOpacity.value = 1;
    } else {
      setTimeout(() => {
        // else apply fade out animation to loading container
        animOpacity.value = withTiming(0, {
          duration: screenLoadingAnimationDuration
        })
        // cancel spinner animation after loading container has faded out
        setTimeout(() => {
          cancelAnimation(spinnerRotation)
          spinnerRotation.value = 0;
        }, 200)
      }, props.hideDelay ?? 0)
    }
  }, [props.loading])

  return (
    <Animated.View style={[styles.container, props.style, { justifyContent: "center", alignItems: "center" }, containerAnimStyles]} pointerEvents={props.loading ? "auto" : "none"}>
      <Animated.View style={[spinnerAnimStyles]}>
        <Spinner fill={uiBase.colors.lime(1)} style={[styles.spinner]}/>
      </Animated.View>
    </Animated.View>
  )
}