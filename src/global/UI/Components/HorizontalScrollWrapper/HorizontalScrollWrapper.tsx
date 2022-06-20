import React from 'react';
import { ScrollView, StyleProp, Text, View, ViewStyle } from 'react-native';
import { AppHeading } from '../AppText/AppText';
import styles from "./HorizontalScrollWrapper.style";

type HorizontalScrollWrapperProps = {
    heading?: string;
    /* Cards to render within horizontal scroll wrapper */
    children?: React.ReactNode | React.ReactNode[];
    style?: {
        container?: StyleProp<ViewStyle>;
    }
}

export default function HorizontalScrollWrapper(props: HorizontalScrollWrapperProps) {
    const {
        children, heading, style
    } = props;

    return (
        <View style={[styles.wrapper, style?.container]}>
            {heading &&
                <AppHeading style={styles.heading}>{heading}</AppHeading>
            }
            <ScrollView
                style={{ overflow: "visible" }}
                contentContainerStyle={styles.scrollWrapper}
                showsHorizontalScrollIndicator={false} 
                horizontal
                overScrollMode={"never"}
                bounces={false}
            >
                {children}
            </ScrollView>
        </View>
    )
}