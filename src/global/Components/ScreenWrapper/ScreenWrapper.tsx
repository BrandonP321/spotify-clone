import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import styles from "./ScreenWrapper.style";

type ScreenWrapperProps = {
    children: React.ReactNode[] | React.ReactNode;
    fixedContent?: JSX.Element;
    style?: StyleProp<ViewStyle>;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function ScreenWrapper(props: ScreenWrapperProps) {
    return (
        <View>
            {/* <View style={styles.fixedContent}> */}
                {props.fixedContent}
            {/* </View> */}
            <ScrollView contentContainerStyle={[styles.pageWrapper, props.style]} bounces={false} overScrollMode={"never"} onScroll={props.onScroll} scrollEventThrottle={60}>
                {props.children}
            </ScrollView>
        </View>
    )
}