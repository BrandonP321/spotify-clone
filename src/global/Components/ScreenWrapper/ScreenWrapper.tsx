import React, { Component, useEffect, useState } from 'react';
import { ListRenderItem, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View, FlatListProps, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import LoadingContainer, { screenLoadingAnimationDuration } from '../../UI/Components/LoadingSpinnerContainer/LoadingSpinnerContainer';
import styles from "./ScreenWrapper.style";

export type ScreenWrapperProps = {
    /* Children to render as the footer component of the ScreenWrapper's FlatList */
    children?: FlatListProps<any>["ListFooterComponent"] | FlatListProps<any>["ListFooterComponent"][];
    style?: StyleProp<ViewStyle>;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    stickyHeaderIndices?: number[];
    /* Shows full screen loading spinner if true */
    loading?: boolean;
    scrollViewRef?: React.LegacyRef<ScrollView>;
    /* Data to be loaded by FlatList */
    data?: any[];
    renderItem?: (item: ListRenderItemInfo<any>) => any;
    /* FlatList header component to render above rendered data */
    headerComponent?: FlatListProps<any>["ListHeaderComponent"];
}

export const screenLoadingFadeDelay = 250;
export const screenLoadingAnimationWithDelay = screenLoadingAnimationDuration + screenLoadingFadeDelay;

/**
 * Wrapper for all screen content, using a FlatList to render header, footer, and data components.
 */
export default function ScreenWrapper(props: ScreenWrapperProps) {
    const [showLoading, setShowLoading] = useState(props.loading === undefined ? false : true);

    useEffect(() => {
        // if loading has finished, wait .25s to hide spinner so content can render
        if (!props.loading) {
            setTimeout(() => {
                setShowLoading(false);
            }, screenLoadingFadeDelay)
        } else {
            // else instantly show loading spinner
            setShowLoading(true);
        }
    }, [props.loading])

    return (
        <>
            <LoadingContainer loading={showLoading} />
            <View>
                <Animated.FlatList
                    stickyHeaderIndices={props.stickyHeaderIndices}
                    contentContainerStyle={[styles.pageWrapper, props.style]}
                    bounces={false}
                    overScrollMode={"never"}
                    onScroll={props.onScroll}
                    scrollEventThrottle={16}
                    data={props.data}
                    renderItem={props.renderItem}
                    ListHeaderComponent={props.headerComponent}
                    ListFooterComponent={() => <>{props.children}</>}
                >
                </Animated.FlatList>
            </View>
        </>
    )
}