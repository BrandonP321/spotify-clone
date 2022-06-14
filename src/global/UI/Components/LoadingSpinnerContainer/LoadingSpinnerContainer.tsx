import React from 'react'
import { View } from 'react-native'
import { AppHeading } from '../AppText/AppText';
import styles from "./LoadingSpinnerContainer.style";

type LoadingSpinnerContainerProps = {
    loading?: boolean;
}

export default function LoadingSpinnerContainer(props: LoadingSpinnerContainerProps) {
  return (
    <View style={[styles.container, { justifyContent: "center", alignItems: "center" }, props.loading && { opacity: 1 }]} pointerEvents={props.loading ? "auto" : "none"}>
        <AppHeading style={{ fontSize: 50 }}>LOADING</AppHeading>
    </View>
  )
}