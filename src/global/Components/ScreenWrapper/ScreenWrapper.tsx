import React, { Component } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View, ViewBase, ViewStyle } from 'react-native';
import styles from "./ScreenWrapper.style";

type ScreenWrapperProps = {
    children: React.ReactNode[] | React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    stickyHeaderIndices?: number[];
}

export default function ScreenWrapper(props: ScreenWrapperProps) {
    return (
        <View>
            <ScrollView 
                stickyHeaderIndices={props.stickyHeaderIndices} 
                contentContainerStyle={[styles.pageWrapper, props.style]} 
                bounces={false} 
                overScrollMode={"never"} 
                onScroll={props.onScroll} 
                scrollEventThrottle={90}
            >
                {props.children}
            </ScrollView>
        </View>
    )
}