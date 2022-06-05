import React from 'react'
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import styles from "./SimpleHeader.style";

export type SimpleHeaderProps = {
    title?: string;
    styles?: {
        header?: StyleProp<ViewStyle>;
        backArrow?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
    }
}

export default function SimpleHeader(props: SimpleHeaderProps) {
    const { title, styles: customStyles } = props;

    return (
        <View style={[styles.header, customStyles?.header]}>
            <Pressable style={[styles.backArrowWrapper, customStyles?.backArrow]}>
                <Text style={styles.backArrow}>{"<-"}</Text>
            </Pressable>
            <Text style={[styles.title, customStyles?.title]}>{title}</Text>
        </View>
    )
}