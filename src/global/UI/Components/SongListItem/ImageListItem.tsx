import React from 'react';
import { Pressable, View, Text, Image, StyleProp, ViewStyle, TextProps, ImageProps, StyleSheet, ImageStyle, TextStyle } from 'react-native';
import { SpotifyAlbum, SpotifyTrack } from '../../../../utils';
import { AppText } from '../AppText/AppText';
import styles from "./ImageListItem.style";

type ImageListItemProps = {
    image: string;
    title: string;
    subtitle: string;
    onPress: () => void;
    onMoreBtnPress?: () => void;
    trackNumber?: number;
    styles?: {
        wrapper?: StyleProp<ViewStyle>;
        trackNumber?: StyleProp<TextProps>;
        img?: StyleProp<ImageStyle>;
        title?: StyleProp<TextStyle>;
        subtitle?: StyleProp<TextStyle>;
    }
}

export default function ImageListItem(props: ImageListItemProps) {
    const { image, onPress, subtitle, title, onMoreBtnPress, trackNumber, styles: s } = props;

    return (
        <Pressable style={[styles.listItem, s?.wrapper]} onPress={onPress}>
            <View style={[styles.trackNumberWrapper, !trackNumber && { display: "none" }]}>
                <AppText style={[styles.trackNumber, s?.trackNumber]}>{trackNumber}</AppText>
            </View>
            <Image source={{ uri: image }} style={[styles.img, s?.img]}/>
            <View style={styles.textWrapper}>
                <AppText style={[styles.title, s?.title]} numberOfLines={1}>{title}</AppText>
                <AppText style={[styles.subtitle, s?.subtitle]} numberOfLines={1}>{subtitle}</AppText>
            </View>
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

/* Renders <SongListItem>'s from API response */
export const renderSongListItems = (songs: SpotifyTrack[] | null, withTrackNumber?: boolean) => {
    return songs?.map((song, i) => {
        return (
            <SongListItem
                image={song.album?.images?.[0]?.url}
                songId={song.id}
                subtitle={song?.artists?.map(a => a?.name)?.join(", ")}
                title={song?.name}
                key={i}
                trackNumber={withTrackNumber ? i + 1 : undefined}
            />
        )
    })
}

type AlbumListItemProps = Omit<ImageListItemProps, "onPress" | "onMoreBtnPress"> & {
    albumId: string;
}

export const AlbumListItem = function(props: AlbumListItemProps) {
    const { albumId, styles: s, ...rest } = props;

    const handlePress = () => {
        alert("go to album: " + albumId)
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

export const renderAlbumListItems = (albums: SpotifyAlbum[] | null, withReleaseYear?: boolean) => {
    const getReleaseYear = (date: string) => {
        return date?.split("-")?.[0];
    }

    return albums?.map((album, i) => {
        const subtitle = withReleaseYear ? "Released - " + getReleaseYear(album?.release_date) : album?.artists?.map(a => a?.name)?.join(", ");

        return (
            <AlbumListItem
                image={album?.images?.[0]?.url}
                albumId={album.id}
                subtitle={subtitle}
                title={album?.name}
                key={i}
            />
        )
    })
}