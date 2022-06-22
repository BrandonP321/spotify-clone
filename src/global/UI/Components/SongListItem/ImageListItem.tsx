import React, { useState } from 'react';
import { Pressable, View, Image, StyleProp, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { useAppNavigation } from '../../../../utils/NavigationHelper';
import { AppText } from '../AppText/AppText';
import styles from "./ImageListItem.style";
import EllipsisIcon from "../../../../../assets/ellipsis-vertical.svg";
import { uiBase } from '../../styles/uiBase.style';
import { useAppDispatch, useMusicPlayer } from '../../../features/hooks';
import { getQueueFromSongList, getQueueItemFromSong, MusicPlayerState, playSong, SongContext } from '../../../features/slices/MusicPlayerSlice/musicPlayerSlice';
import { SpotifyTrack } from '../../../../utils';

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

    const [isPressedIn, setIsPressedIn] = useState(false);

    return (
        <Pressable 
            onPress={onPress}
            onPressIn={() => setIsPressedIn(true)}
            onPressOut={() => setIsPressedIn(false)}
            onLongPress={onMoreBtnPress}
            delayLongPress={300}
            style={[
                styles.listItem, 
                !trackNumber && { paddingLeft: uiBase.padding.appHorizontalPadding },
                !image && { marginBottom: 5 },
                isPressedIn && { transform: [{ scale: 0.99 }] },
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
    song: SpotifyTrack;
    allSongsInQueue: SpotifyTrack[];
    songContext: SongContext;
}

export const SongListItem = function(props: SongListItemProps) {
    const { song, allSongsInQueue, styles: style, songContext, ...rest } = props;

    const dispatch = useAppDispatch();
    const player = useMusicPlayer();

    const handlePress = () => {
        const queue = getQueueFromSongList(allSongsInQueue, songContext)

        dispatch(playSong({
            queue,
            indexInQueue: queue.findIndex(s => s.id === song?.id)
        }));
    }

    const handleMoreBtnPress = () => {
        // dispatch
    }

    const isSongPlaying = player.currentSong?.id === song?.id;

    const itemStyles: SongListItemProps["styles"] = {
        ...style,
        title: [style?.title, {
            color: isSongPlaying ? uiBase.colors.lime(1) : uiBase.colors.textPrimary,
        }],
    }

    return (
        <ImageListItem {...rest} styles={itemStyles} onPress={handlePress} onMoreBtnPress={handleMoreBtnPress}/>
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
