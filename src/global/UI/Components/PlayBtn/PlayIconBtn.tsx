import React from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import PlayIcon from "../../../../../assets/play-solid.svg";
import { uiBase } from '../../styles/uiBase.style';
import styles, { playIconFixedTop } from "./PlayIconBtn.style";

type PlayIconBtnProps = {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    top: number;
    scrollOffset: SharedValue<number>;
    /* True if btn instance is for fixed btn */
    isFixedInstance?: boolean;
}

export const PlayIconBtn = (props: PlayIconBtnProps) => {
    const animatedStyles = useAnimatedStyle(() => {
        const isFixed = props.scrollOffset.value > (props.top - playIconFixedTop);

        if (isFixed || props.isFixedInstance) {
            return {
                top: playIconFixedTop,
                opacity: isFixed ? 1 : 0
            }
        } else {
            return {
                top: props.top,
                opacity: props.isFixedInstance ? 0 : 1
            }
        }
    })

    return (
        <Animated.View style={[styles.animationWrapper, animatedStyles]}>
            <Pressable style={[styles.playIconPressable]} onPress={props.onPress}>
                <PlayIcon style={[styles.playIcon]} fill={uiBase.colors.appBg(1)} />
            </Pressable>
        </Animated.View>
    )
}