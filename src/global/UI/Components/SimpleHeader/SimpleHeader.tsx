import React from 'react'
import { Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native'
import styles from "./SimpleHeader.style";
import Animated, { SharedValue, useAnimatedStyle, interpolate } from "react-native-reanimated";
import BackArrow from "../../../../../assets/back-arrow.svg";
import { uiBase } from '../../styles/uiBase.style';
import { useAppNavigation } from '../../../../utils/NavigationHelper';

export type SimpleHeaderProps = {
    title?: string;
    styles?: {
        header?: StyleProp<ViewStyle>;
        backArrow?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
    }
    scrollOffset: SharedValue<number>;
    bgOpacityInterpolationInput: readonly number[];
    titleOpacityInterpolationInput: readonly number[];
}

export default function SimpleHeader(props: SimpleHeaderProps) {
    const { title, styles: customStyles, scrollOffset, bgOpacityInterpolationInput, titleOpacityInterpolationInput } = props;

    const navigation = useAppNavigation();

    const animHeaderBgStyles = useAnimatedStyle(() => ({
        backgroundColor: `hsla(0, 0%, 20%, ${interpolate(scrollOffset.value, bgOpacityInterpolationInput, [0, 1])})`,
    }))

    const animTitleStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollOffset.value, titleOpacityInterpolationInput, [0, 1])
    }))

    const handleBackArrowPress = () => {
        navigation.goBack();
    }

    return (
        <Animated.View style={[styles.header, customStyles?.header, animHeaderBgStyles]}>
            <Pressable style={[styles.backArrowWrapper, customStyles?.backArrow]} onPress={handleBackArrowPress}>
                <BackArrow fill={uiBase.colors.textPrimary} style={styles.backArrow}/>
            </Pressable>
            <Animated.Text style={[styles.title, customStyles?.title, animTitleStyle]} numberOfLines={1} >{title}</Animated.Text>
        </Animated.View>
    )
}