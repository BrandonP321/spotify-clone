import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

const styles = StyleSheet.create({
    container: {

    },
    gradient: {

    }
})

type AnimatedGradientProps = Omit<LinearGradientProps, "style"> & {
    scrollOffset: SharedValue<number>;
    opacityInterpolationInput: number[];
    style?: {
        container?: StyleProp<ViewStyle>;
        gradient?: StyleProp<ViewStyle>;
    }
}

export default function AnimatedGradient(props: AnimatedGradientProps) {
    const { scrollOffset, opacityInterpolationInput, style, ...rest} = props;

    const animStyles = useAnimatedStyle(() => ({
        opacity: interpolate(scrollOffset.value, opacityInterpolationInput, [0, 1])
    }))

    return (
        <Animated.View style={[styles.container, style?.container, animStyles]}>
            <LinearGradient {...rest} style={[styles.gradient, style?.gradient]}/>
        </Animated.View>
    )
}