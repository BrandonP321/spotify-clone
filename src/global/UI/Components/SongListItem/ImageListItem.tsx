import React from 'react';
import { Pressable, View, Image, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { useAppNavigation } from '../../../../utils/NavigationHelper';
import { AppText } from '../AppText/AppText';
import styles from "./ImageListItem.style";
import EllipsisIcon from "../../../../../assets/ellipsis-vertical.svg";
import { uiBase } from '../../styles/uiBase.style';

type ImageListItemProps = {
    image?: string;
    title: string;
    subtitle?: string;
    onPress: () => void;
    onMoreBtnPress?: () => void;
    trackNumber?: number;
    styles?: {
        wrapper?: StyleProp<ViewStyle>;
        trackNumber?: StyleProp<TextStyle>;
        img?: StyleProp<ImageStyle>;
        textWrapper?: StyleProp<ViewStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
    }
}

export default function ImageListItem(props: ImageListItemProps) {
    const { image, onPress, subtitle, title, onMoreBtnPress, trackNumber, styles: s } = props;

    return (
        <Pressable 
            onPress={onPress}
            onLongPress={onMoreBtnPress}
            delayLongPress={300}
            style={[
                styles.listItem, 
                !trackNumber && { paddingLeft: uiBase.padding.appHorizontalPadding },
                !image && { marginBottom: 5 },
                s?.wrapper, 
            ]}
        >
            <View style={[styles.trackNumberWrapper, !trackNumber && { display: "none" }]}>
                <AppText style={[styles.trackNumber, s?.trackNumber]}>{trackNumber}</AppText>
            </View>
            <Image source={{ uri: image }} style={[styles.img, s?.img, !image && { display: "none" }]}/>
            <View style={[styles.textWrapper, s?.textWrapper]}>
                <AppText style={[styles.title, s?.title]} numberOfLines={1}>{title}</AppText>
                <AppText style={[styles.subtitle, s?.subtitle, !subtitle && { display: "none" }]} numberOfLines={1}>{subtitle}</AppText>
            </View>
            <Pressable onPress={onMoreBtnPress} style={[styles.moreBtnWrapper, !onMoreBtnPress && { display: "none" }]}>
                <EllipsisIcon style={styles.moreBtnIcon} fill={uiBase.colors.textSecondary}/>
            </Pressable>
        </Pressable>
    )
}

type SongListItemProps = Omit<ImageListItemProps, "onPress" | "onMoreBtnPress"> & {
    songId: string;
}

export const SongListItem = function(props: SongListItemProps) {
    const { songId, ...rest } = props;

    const handlePress = () => {
        alert("play song id: " + songId);
    }

    const handleMoreBtnPress = () => {
        alert("handle more for song id: " + songId);
    }

    return (
        <ImageListItem {...rest} onPress={handlePress} onMoreBtnPress={handleMoreBtnPress}/>
    )
}

type AlbumListItemProps = Omit<ImageListItemProps, "onPress" | "onMoreBtnPress"> & {
    albumId: string;
}

export const AlbumListItem = function(props: AlbumListItemProps) {
    const { albumId, styles: s, ...rest } = props;

    const navigation = useAppNavigation();

    const handlePress = () => {
        navigation.navigate("Album", { albumId })
    }

    const albumStyles: ImageListItemProps["styles"] = {
        ...s,
        img: {
            width: 75,
            height: 75,
        }
    }

    return (
        <ImageListItem {...rest} styles={albumStyles} onPress={handlePress}/>
    )
}

type ArtistListItemProps = Omit<ImageListItemProps, "onPress" | "onMoreBtnPress" | "subtitle"> & {
    artistId: string;
}

export const ArtistListItem = function(props: ArtistListItemProps) {
    const { artistId, styles: s, ...rest } = props;

    const navigation = useAppNavigation();

    const handlePress = () => {
        navigation.navigate("Artist", { artistId })
    }

    const albumStyles: ImageListItemProps["styles"] = {
        ...s,
        img: {
            width: 50,
            height: 50,
            borderRadius: 25
        }
    }

    return (
        <ImageListItem {...rest} styles={albumStyles} onPress={handlePress}/>
    )
}
