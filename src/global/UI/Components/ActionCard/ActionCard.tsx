import { useNavigation, CommonActions, StackActions } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, ImageStyle, Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from '../../../../utils';
import { NavigationHelper, useAppNavigation } from '../../../../utils/NavigationHelper';
import { useAppDispatch, useMusicPlayer } from '../../../features/hooks';
import { getQueueFromSongList, playSong } from '../../../features/slices/MusicPlayerSlice/musicPlayerSlice';
import { RootStackParamList } from '../../../Navigation/Screens';
import { uiBase } from '../../styles/uiBase.style';
import { AppHeading, AppText } from '../AppText/AppText';
import styles from "./ActionCard.style";

type ActionCardProps = {
    title?: string;
    blurb?: string;
    img?: string;
    customStyles?: {
        cardWrapper?: ViewStyle;
        img?: StyleProp<ImageStyle>;
        title?: StyleProp<TextStyle>;
        blurb?: StyleProp<TextStyle>;
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

type AlbumActionCardProps = Pick<ActionCardProps, "customStyles" | "withoutRightMargin"> & {
    albumData: SpotifyAlbum;
}

export const AlbumActionCard = (props: AlbumActionCardProps) => {
    const { customStyles, albumData, ...rest } = props;

    const navigation = useAppNavigation();

    const handlePress = () => {
        navigation.navigate("Album", { albumId: albumData?.id });
    }

    return (
        <ActionCard
            {...rest}
            onPress={handlePress}
            customStyles={{ ...customStyles, title: styles.albumCardTitle }}
            title={albumData?.name}
            img={albumData?.images?.[0]?.url}
        />
    )
}

type PlaylistActionCardProps = Pick<ActionCardProps, "customStyles" | "withoutRightMargin"> & {
    playlistData: SpotifyPlaylist;
}

export const PlaylistActionCard = (props: PlaylistActionCardProps) => {
    const { customStyles, playlistData, ...rest } = props;

    const navigation = useAppNavigation();

    const handlePress = () => {
        navigation.navigate("Playlist", { playlistId: playlistData?.id });
    }

    return (
        <ActionCard
            {...rest}
            onPress={handlePress}
            customStyles={{ ...customStyles, title: styles.albumCardTitle }}
            title={playlistData?.name}
            img={playlistData?.images?.[0]?.url}
        />
    )
}

type SongActionCardProps = Pick<ActionCardProps, "customStyles" | "withoutRightMargin"> & {
    songData: SpotifyTrack;
    songsForQueue: SpotifyTrack[];
}

export const SongActionCard = (props: SongActionCardProps) => {
    const { customStyles, songData, songsForQueue, ...rest } = props;

    const player = useMusicPlayer();
    const dispatch = useAppDispatch();

    const queue = getQueueFromSongList(songsForQueue, { type: "none" });
    const indexInQueue = queue.findIndex(s => s.id === songData?.id);

    const handlePress = () => {
        dispatch(playSong({ queue, indexInQueue }));
    }

    return (
        <ActionCard
            {...rest}
            onPress={handlePress}
            customStyles={{ 
                ...customStyles, 
                title: [{ color: player.currentSong?.id === songData?.id ? uiBase.colors.lime(1) : uiBase.colors.textPrimary }],
                img: { width: 130, height: 130 },
                cardWrapper: { width: 130 }
            }}
            title={songData?.name}
            img={songData?.album?.images?.[0]?.url}
        />
    )
}