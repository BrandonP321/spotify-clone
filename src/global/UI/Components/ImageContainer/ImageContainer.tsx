import React from 'react'
import { Image, ImageStyle, StyleProp, View, ViewStyle } from 'react-native'
import styles from "./ImageContainer.style";

type ImageContainerProps = {
    image?: string;
    wrapperStyle: StyleProp<ViewStyle>;
    imageStyle: StyleProp<ImageStyle>;
}

export default function ImageContainer(props: ImageContainerProps) {
    const { image, imageStyle, wrapperStyle } = props;

    return (
        <View style={[styles.imgContainer, wrapperStyle]}>
            <Image source={{ uri: image }} style={[styles.img, imageStyle]} />
        </View>
    )
}