import React, { Component } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View, ViewBase, ViewStyle } from 'react-native';
import LoadingSpinnerContainer from '../../UI/Components/LoadingSpinnerContainer/LoadingSpinnerContainer';
import styles from "./ScreenWrapper.style";

type ScreenWrapperProps = {
    children: React.ReactNode[] | React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    stickyHeaderIndices?: number[];
    loading?: boolean;
    scrollViewRef?: React.LegacyRef<ScrollView>;
}

export default function ScreenWrapper(props: ScreenWrapperProps) {
    return (
        <View>
            <LoadingSpinnerContainer loading={props.loading}/>
            <ScrollView 
                stickyHeaderIndices={props.stickyHeaderIndices} 
                contentContainerStyle={[styles.pageWrapper, props.style]} 
                bounces={false} 
                overScrollMode={"never"} 
                onScroll={props.onScroll} 
                scrollEventThrottle={90}
                ref={props.scrollViewRef}
            >
                {props.children}
            </ScrollView>
        </View>
    )
}