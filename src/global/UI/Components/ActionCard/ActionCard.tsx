import React, { useState } from 'react'
import { Image, ImageStyle, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import styles from "./ActionCard.style";

type ActionCardProps = {
    title?: string;
    blurb?: string;
    img?: string;
    customStyles?: {
        cardWrapper?: ViewStyle;
        img?: ImageStyle;
        title?: TextStyle;
        blurb?: TextStyle;
    };
    onPress?: () => void;
    withoutRightMargin?: boolean;
}

export default function ActionCard(props: ActionCardProps) {
    const {
        customStyles, blurb, img, title, withoutRightMargin, onPress
    } = props;

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        onPress && onPress();
        setIsPressed(true);
    }

    return (
        <Pressable 
            style={[styles.actionCard, customStyles?.cardWrapper, withoutRightMargin && styles.withoutRightMargin, isPressed && styles.pressed]}
            delayLongPress={250}
            onPress={handlePress}
            onPressOut={() => setIsPressed(false)}
            onLongPress={() => setIsPressed(true)}
        >
            <Image source={{ uri: img }} style={[styles.img, customStyles?.img]}/>
            {title &&
                <Text style={[styles.title, customStyles?.title]} numberOfLines={1}>{title}</Text>
            }
            {blurb &&
                <Text style={[styles.blurb, customStyles?.blurb]} numberOfLines={2}>{blurb}</Text>
            }
        </Pressable>
    )
}

type ArtistActionCardProps = ActionCardProps & {

}

export const ArtistActionCard = (props: ArtistActionCardProps) => {
    const { customStyles, blurb, ...rest } = props;

    return (
        <ActionCard {...rest} customStyles={{ ...customStyles, img: styles.artistCard, title: styles.artistCardTitle }}/>
    )
}