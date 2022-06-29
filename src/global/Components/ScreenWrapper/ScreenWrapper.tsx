import React, { Component, useEffect, useState } from 'react';
import { ListRenderItem, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View, FlatListProps, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import LoadingContainer from '../../UI/Components/LoadingSpinnerContainer/LoadingSpinnerContainer';
import styles from "./ScreenWrapper.style";

export type ScreenWrapperProps = {
    children?: FlatListProps<any>["ListFooterComponent"] | FlatListProps<any>["ListFooterComponent"][];
    style?: StyleProp<ViewStyle>;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    stickyHeaderIndices?: number[];
    loading?: boolean;
    scrollViewRef?: React.LegacyRef<ScrollView>;
    data?: any[];
    renderItem?: (item: ListRenderItemInfo<any>) => any;
    headerComponent?: FlatListProps<any>["ListHeaderComponent"];
}

export default function ScreenWrapper(props: ScreenWrapperProps) {
    const [showLoading, setShowLoading] = useState(props.loading === undefined ? false : true);

    useEffect(() => {
        // if loading has finished, wait .25s to hide spinner so content can render
        if (!props.loading) {
            setTimeout(() => {
                setShowLoading(false);
            }, 250)
        } else {
            setShowLoading(true);
        }
    }, [props.loading])

    return (
        <View>
            <LoadingContainer loading={showLoading}/>
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
    )
}