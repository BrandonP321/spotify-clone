import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, ImageStyle, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import { SpotifyArtist } from '../../../../utils';
import { NavigationHelper, useAppNavigation } from '../../../../utils/NavigationHelper';
import { RootStackParamList } from '../../../Navigation/Screens';
import { AppHeading, AppText } from '../AppText/AppText';
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
                <AppHeading style={[styles.title, customStyles?.title]} numberOfLines={1}>{title}</AppHeading>
            }
            {blurb &&
                <AppText style={[styles.blurb, customStyles?.blurb]} numberOfLines={2}>{blurb}</AppText>
            }
        </Pressable>
    )
}

type ArtistActionCardProps = Pick<ActionCardProps, "customStyles" | "withoutRightMargin"> & {
    artistData: SpotifyArtist;
}

export const ArtistActionCard = (props: ArtistActionCardProps) => {
    const { customStyles, artistData, ...rest } = props;

    const navigation = useAppNavigation();

    const handlePress = () => {
        navigation.navigate("Artist", { artistId: artistData?.id })
    }

    return (
        <ActionCard 
            {...rest} 
            onPress={handlePress}
            customStyles={{ ...customStyles, img: styles.artistCard, title: styles.artistCardTitle }}
            title={artistData?.name}
            img={artistData?.images?.[0]?.url}
        />
    )
}
