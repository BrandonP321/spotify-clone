import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react"
import { Image, ImageStyle, Pressable, StyleProp, Text, View } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ScreenWrapper from "../../global/Components/ScreenWrapper/ScreenWrapper";
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
import { SpotifyAlbum, SpotifyArtist, SpotifyFetcher } from "../../utils";
import { useAppNavigation } from "../../utils/NavigationHelper";
import styles from "./AlbumScreen.style";

type AlbumScreenProps = ScreenProps<"Album">;

const AlbumScreen = (props: AlbumScreenProps) => {
    const { albumId } = props.route.params;

    const navigation = useAppNavigation();

    const scrollOffset = useSharedValue(0);
    
    const [data, setData] = useState<SpotifyAlbum | null>(null);
    const [otherAlbums, setOtherAlbums] = useState<SpotifyAlbum[] | null>(null);
    const [allArtists, setAllArtists] = useState<SpotifyArtist[] | null>(null);
    const [albumTitleHeight, setAlbumTitleHeight] = useState(0);
    const albumTitleEle = React.createRef<Text>();

    useFocusEffect(useCallback(() => {
        SpotifyFetcher.getAlbum(albumId).then(album => {
            setData(album);

            SpotifyFetcher.getSeveralArtists(album.artists?.map(a => a.id)).then(setAllArtists).catch(err => console.log(err.response))

            SpotifyFetcher.getArtistAlbums(album.artists?.[0]?.id).then(({ items: albums }) => {

                // filter out current album from artists albums and update state
                albums && setOtherAlbums(albums?.filter(a => a.id !== album.id)?.slice(0, 6))
            })
        });

        return () => {
            setData(null);
            setOtherAlbums(null);
            setAllArtists(null);
        }
    }, [albumId]));

    useEffect(() => {
        /* After content loads, get height of album title text */
        albumTitleEle.current?.measure((x, y, w, h) => {
            setAlbumTitleHeight(h);
        });
    }, [data])

    const goToArtist = () => {
        const artistId = data?.artists?.[0]?.id;

        artistId && navigation.navigate("Artist", { artistId })
    }

    const releaseDate = `Album - ${data?.release_date?.split("-")?.[0]}`;

    const handlePlayBtnPress = () => {
        alert("Play btn press");
    }

    const PlayBtn = (props: { fixedIcon?: boolean; }) => (
        <PlayIconBtn
            onPress={handlePlayBtnPress}
            style={styles.playBtn}
            scrollOffset={scrollOffset}
            isFixedInstance={props.fixedIcon}
            top={topContentHeight + albumTitleHeight}
        />
    )

    return (
        <>
            <PlayBtn fixedIcon />

            <CoverImgScreenWrapper
                headerTitle={data?.name}
                coverImg={data?.images?.[0]?.url}
                loading={!data ?? !allArtists ?? !otherAlbums}
                scrollOffset={scrollOffset}
            >

                <PlayBtn />

                <View>
                    <AppHeading ref={albumTitleEle} style={styles.title}>{data?.name}</AppHeading>
                    <Pressable style={styles.artistWrapper} onPress={goToArtist}>
                        <Image source={{ uri: allArtists?.[0]?.images?.[0]?.url }} style={styles.artistImg} />
                        <AppText style={styles.artistName}>{data?.artists?.[0]?.name}</AppText>
                    </Pressable>
                    <AppText style={styles.releaseDate}>{releaseDate}</AppText>
                    {data?.tracks?.items?.map((song, i) => {
                        return (
                            <SongListItem
                                key={i}
                                title={song.name}
                                subtitle={song.artists?.map(a => a.name)?.join(", ")}
                                song={song}
                                songContext={{
                                    type: "album",
                                    albumId: data?.id,
                                    albumName: data?.name
                                }}
                                allSongsInQueue={data.tracks.items}
                                styles={{
                                    textWrapper: {
                                        flexGrow: 1
                                    }
                                }}
                            />
                        )
                    })}

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