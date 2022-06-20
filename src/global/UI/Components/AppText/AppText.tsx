import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { uiBase } from '../../styles/uiBase.style';

export type AppTextProps = TextProps & {
    children?: React.ReactChild | React.ReactChild[];
    style?: TextProps["style"];
}

const styles = StyleSheet.create({
    text: {
        color: uiBase.colors.textPrimary,
        fontFamily: uiBase.fontFamilies.primary.regular,
        fontSize: 14,
    },
    heading: {
        fontFamily: uiBase.fontFamilies.primary.bold,
        fontSize: 18
    }
})

export const AppText = React.forwardRef<Text, AppTextProps>((props, ref) => {
    const { children, style, ...rest } = props;

    return (
        <Text {...rest} ref={ref} style={[styles.text, style]}>{children}</Text>
    )
})

export type AppHeadingProps = AppTextProps & {
}

export const AppHeading = React.forwardRef<Text, AppHeadingProps>((props: AppHeadingProps, ref) => {
    const { style, ...rest } = props;

    return (
        <AppText {...rest} ref={ref} style={[styles.heading, style]}/>
    )
})