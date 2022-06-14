import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppHeading } from '../AppText/AppText';
import styles from "./HorizontalScrollWrapper.style";

type HorizontalScrollWrapperProps = {
    heading?: string;
    /* Cards to render within horizontal scroll wrapper */
    children?: React.ReactNode | React.ReactNode[];
}

export default function HorizontalScrollWrapper(props: HorizontalScrollWrapperProps) {
    const {
        children, heading
    } = props;

    return (
        <View style={styles.wrapper}>
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