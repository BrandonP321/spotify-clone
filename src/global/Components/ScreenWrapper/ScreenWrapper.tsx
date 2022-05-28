import React from 'react'
import { ScrollView } from 'react-native'
import styles from "./ScreenWrapper.style";

type ScreenWrapperProps = {
    children: React.ReactNode[] | React.ReactNode;
}

export default function ScreenWrapper(props: ScreenWrapperProps) {
    return (
        <ScrollView contentContainerStyle={styles.pageWrapper} bounces={false}>
            {props.children}
        </ScrollView>
    )
}