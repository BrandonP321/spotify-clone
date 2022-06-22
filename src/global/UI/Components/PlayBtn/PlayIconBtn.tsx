import React, { useCallback } from 'react'
import { Pressable, StyleProp, ViewStyle } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import PlayIcon from "../../../../../assets/play-solid.svg";
import PauseIcon from "../../../../../assets/pause-solid.svg";
import { uiBase } from '../../styles/uiBase.style';
import styles, { playIconFixedTop } from "./PlayIconBtn.style";
import { useAppDispatch, useMusicPlayer } from '../../../features/hooks';
import { pauseSong, resumeSong } from '../../../features/slices/MusicPlayerSlice/musicPlayerSlice';

type PlayIconBtnProps = {
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    top: number;
    scrollOffset: SharedValue<number>;
    /* True if btn instance is for fixed btn */
    isFixedInstance?: boolean;
    /* If true, pauses current song rather than starting new queue */
    pauseOnClick?: boolean;
}

export const PlayIconBtn = (props: PlayIconBtnProps) => {
    const dispatch = useAppDispatch();
    const player = useMusicPlayer();

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

    const togglePlayState = useCallback(() => {
        dispatch(player.isPaused ? resumeSong() : pauseSong());
    }, [player.isPaused])

    const PlayStateIcon = player.isPaused || !props.pauseOnClick ? PlayIcon : PauseIcon;

    return (
        <Animated.View style={[styles.animationWrapper, animatedStyles]}>
            <Pressable style={[styles.playIconPressable]} onPress={props.pauseOnClick ? togglePlayState : props.onPress}>
                <PlayStateIcon style={[styles.playIcon]} fill={uiBase.colors.appBg(1)} />
            </Pressable>
        </Animated.View>
    )
}