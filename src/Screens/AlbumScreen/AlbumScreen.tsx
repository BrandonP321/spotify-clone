import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react"
import { Image, ImageStyle, ListRenderItemInfo, Pressable, StyleProp, Text, View } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ScreenWrapper from "../../global/Components/ScreenWrapper/ScreenWrapper";
import { useAppDispatch, useMusicPlayer } from "../../global/features/hooks";
import { getQueueFromSongList, playSong, SongItem } from "../../global/features/slices/MusicPlayerSlice/musicPlayerSlice";
import { ScreenProps } from "../../global/Navigation/Screens"
import { AlbumActionCard } from "../../global/UI/Components/ActionCard/ActionCard";
import { AppHeading, AppText } from "../../global/UI/Components/AppText/AppText";
import CoverImgScreenWrapper from "../../global/UI/Components/CoverImgScreen/CoverImgScreenWrapper";
import { topContentHeight } from "../../global/UI/Components/CoverImgScreen/CoverImgScreenWrapper.style";
import HorizontalScrollWrapper from "../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper";
import { PlayIconBtn } from "../../global/UI/Components/PlayBtn/PlayIconBtn";
import SimpleHeader from "../../global/UI/Components/SimpleHeader/SimpleHeader";
import { ArtistListItem, SongListItem } from "../../global/UI/Components/SongListItem/ImageListItem";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { SpotifyAlbum, SpotifyArtist, SpotifyFetcher, SpotifyTrack } from "../../utils";
import { useAppNavigation } from "../../utils/NavigationHelper";
import styles from "./AlbumScreen.style";

type AlbumScreenProps = ScreenProps<"Album">;

const AlbumScreen = (props: AlbumScreenProps) => {
    const { albumId } = props.route.params;

    const dispatch = useAppDispatch();
    const player = useMusicPlayer();
    const navigation = useAppNavigation();

    const scrollOffset = useSharedValue(0);

    /* Album data */
    const [data, setData] = useState<SpotifyAlbum | null>(null);
    const [modifiedTracks, setModifiedTracks] = useState<SpotifyTrack[] | null>(null);
    const [otherAlbums, setOtherAlbums] = useState<SpotifyAlbum[] | null>(null);
    const [allArtists, setAllArtists] = useState<SpotifyArtist[] | null>(null);
    /* Height of album title <Text> element, used to adjust position of play button */
    const [albumTitleHeight, setAlbumTitleHeight] = useState(0);
    /* Queue of all songs in album for music player */
    const [queue, setQueue] = useState<SongItem[]>([]);

    const albumTitleEle = React.createRef<Text>();

    useFocusEffect(useCallback(() => {
        SpotifyFetcher.getAlbum(albumId).then(album => {
            setData(album);

            SpotifyFetcher.getSeveralArtists(album.artists?.map(a => a.id)).then(setAllArtists)
            SpotifyFetcher.getArtistAlbums(album.artists?.[0]?.id).then(({ items: albums }) => {

                // filter out current album from artist's albums and update state
                albums && setOtherAlbums(albums?.filter(a => a.id !== album.id)?.slice(0, 6))
            })
        });

        return () => {
            setData(null);
            setOtherAlbums(null);
            setAllArtists(null);
            setModifiedTracks(null);
        }
    }, [albumId]));

    useEffect(() => {
        /* After content loads, get height of album title text */
        albumTitleEle.current?.measure((x, y, w, h) => {
            setAlbumTitleHeight(h ?? 0);
        });

        // modify tracks to include the album image of the current album
        data && setModifiedTracks(data?.tracks?.items?.map(item => ({
            ...item,
            album: {
                ...item.album,
                images: data.images
            }
        })))
    }, [data])

    useEffect(() => {
        // once tracks have been modified to include album image, update queue for music player
        modifiedTracks && data && getQueueFromSongList(modifiedTracks, { type: "album", albumId: data.id, albumName: data.name }).then(setQueue)
    }, [modifiedTracks])

    /** Navigate to artist screen for album's artist artist */
    const goToArtist = () => {
        const artistId = data?.artists?.[0]?.id;

        artistId && navigation.navigate("Artist", { artistId })
    }

    const releaseDate = `Album - ${data?.release_date?.split("-")?.[0]}`;

    const handlePlayBtnPress = () => {
        modifiedTracks && data && dispatch(playSong({ queue, indexInQueue: 0}))
    }

    return (
        <>
            <PlayIconBtn
                onPress={handlePlayBtnPress}
                style={styles.playBtn}
                scrollOffset={scrollOffset}
                top={topContentHeight + albumTitleHeight}
                pauseOnClick={player.currentSong?.context?.type === "album" && player.currentSong?.context?.albumId === data?.id}
            />

            <CoverImgScreenWrapper
                headerTitle={data?.name}
                coverImg={data?.images?.[0]?.url}
                loading={!data ?? !allArtists ?? !otherAlbums}
                scrollOffset={scrollOffset}
                data={modifiedTracks ?? []}
                renderItem={({ item: song, index }: ListRenderItemInfo<Exclude<typeof modifiedTracks, null>[number]>) => {
                    return (
                        <SongListItem
                            key={index}
                            title={song.name}
                            subtitle={song.artists?.map(a => a.name)?.join(", ")}
                            song={song}
                            songContext={{
                                type: "album",
                                albumId: data?.id ?? "",
                                albumName: data?.name ?? ""
                            }}
                            allSongsInQueue={modifiedTracks ?? []}
                            styles={{
                                textWrapper: {
                                    flexGrow: 1
                                }
                            }}
                        />
                    )
                }}
                headerComponent={(
                    <>
                        <AppHeading ref={albumTitleEle} style={styles.title}>{data?.name}</AppHeading>
                        <Pressable style={styles.artistWrapper} onPress={goToArtist}>
                            <Image source={{ uri: allArtists?.[0]?.images?.[0]?.url }} style={styles.artistImg} />
                            <AppText style={styles.artistName}>{data?.artists?.[0]?.name}</AppText>
                        </Pressable>
                        <AppText style={styles.releaseDate}>{releaseDate}</AppText>
                    </>
                )}
            >
                <View>
                    {allArtists?.map((artist, i) => {

                        return (
                            <ArtistListItem
                                key={i}
                                artistId={artist?.id}
                                title={artist?.name}
                                image={artist?.images?.[0]?.url}
                                styles={{
                                    img: {

                                    }
                                }}
                            />
                        )
                    })}

                    <AppHeading style={{ paddingHorizontal: uiBase.padding.appHorizontalPadding, marginTop: 20, marginBottom: 10 }}>You may also like</AppHeading>
                    <HorizontalScrollWrapper style={{ container: { marginBottom: 0 } }}>
                        {otherAlbums?.map((album, i) => {
                            return (
                                <AlbumActionCard albumData={album} key={i} withoutRightMargin={i === otherAlbums.length - 1} />
                            )
                        })}
                    </HorizontalScrollWrapper>
                </View>

            </CoverImgScreenWrapper>
        </>
    )
}

export default AlbumScreen