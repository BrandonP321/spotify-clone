import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ImageBackground, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import SimpleHeader, { SimpleHeaderProps } from '../../global/UI/Components/SimpleHeader/SimpleHeader';
import { SpotifyAlbum, SpotifyArtist, SpotifyFetcher, SpotifyTrack } from '../../utils';
import styles, { artistImgWrapperHeight, playIconPositionTop, scrollOffsetPlayIconFix } from "./ArtistScreen.style";
import { AlbumListItem, SongListItem } from '../../global/UI/Components/SongListItem/ImageListItem';
import { AppText, AppHeading } from '../../global/UI/Components/AppText/AppText';
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import { ArtistActionCard } from '../../global/UI/Components/ActionCard/ActionCard';
import { PlayIconBtn } from '../../global/UI/Components/PlayBtn/PlayIconBtn';
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import AnimatedGradient from '../../global/UI/Components/AnimatedGradient/AnimatedGradient';

type ArtistScreenProps = ScreenProps<"Artist">;

export default function ArtistScreen(props: ArtistScreenProps) {
    const { artistId } = props.route.params;

    const [data, setData] = useState<SpotifyArtist | null>(null);
    const [topTracks, setTopTracks] = useState<SpotifyTrack[] | null>(null);
    const [albums, setAlbums] = useState<SpotifyAlbum[] | null>(null);
    const [relatedArtists, setRelatedArtists] = useState<SpotifyArtist[] | null>(null);

    const scrollViewRef = useRef<ScrollView | null>(null);

    useFocusEffect(useCallback(() => {
        SpotifyFetcher.getArtist(artistId).then(setData);
        SpotifyFetcher.getArtistTopTracks(artistId).then(res => setTopTracks(res?.tracks?.slice(0, 5)));
        SpotifyFetcher.getArtistAlbums(artistId).then(res => setAlbums(res.items));
        SpotifyFetcher.getArtistRelatedArtists(artistId).then(res => setRelatedArtists(res.artists?.slice(0, 10)));

        // ensure all data states are set to null on screen unload
        return resetData;
    }, [artistId]));

    const resetData = () => {
        setData(null);
        setTopTracks(null);
        setAlbums(null);
        setRelatedArtists(null);
    }

    useEffect(() => {
        if (data === null) {
            // whenever data is reset, scroll to top of screen
            scrollViewRef.current?.scrollTo(0)
        }
    }, [data])

    const handlePlayBtnPress = () => {
        alert("play artist music");

    }

    const scrollOffset = useSharedValue(0);

    const PlayBtn = (props: { fixedIcon?: boolean; }) => (
        <PlayIconBtn onPress={handlePlayBtnPress} style={styles.playBtn} scrollOffset={scrollOffset} isFixedInstance={props.fixedIcon} top={playIconPositionTop}/>
    )

    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollOffset.value = e?.contentOffset.y;
    })

    return (
        <>
            <PlayBtn fixedIcon/>

            <ScreenWrapper
                style={styles.artistScreen}
                onScroll={handleScroll}
                stickyHeaderIndices={[0]}
                loading={!!(!data ?? !albums ?? !topTracks ?? !relatedArtists)}
            >
                <View style={styles.headerWrapper}>
                    <SimpleHeader 
                        title={data?.name} 
                        scrollOffset={scrollOffset}
                        bgOpacityInterpolationInput={[artistImgWrapperHeight / 4, artistImgWrapperHeight / 2]}
                        titleOpacityInterpolationInput={[artistImgWrapperHeight / 2 + 25, artistImgWrapperHeight]}
                    />
                </View>

                <View style={styles.fixedImgWrapper}>
                    <ImageBackground source={{ uri: data?.images?.[0]?.url }} style={styles.artistImg} />
                    <View style={styles.artistImgOverlay} />
                </View>

                <PlayBtn />

                <View style={styles.content}>
                    <View style={styles.titleBoxOuterWrapper}>
                        <View style={styles.titleBoxContent}>
                            <AnimatedGradient
                                colors={["hsl(0, 0%, 20%)", "hsl(0, 0%, 15%)"]}
                                opacityInterpolationInput={[0, artistImgWrapperHeight / 2]}
                                scrollOffset={scrollOffset}
                                style={{
                                    container: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                    },
                                    gradient: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                    }
                                }}
                            />
                            <AppText style={styles.artistTitle}>{data?.name}</AppText>
                        </View>
                    </View>
                    <View style={styles.contentWrapper}>
                        <LinearGradient
                            colors={["hsl(0, 0%, 15%)", "hsla(0, 0%, 25%, 0)"]}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 200
                            }}
                        />

                        <AppHeading style={styles.heading}>Popular</AppHeading>
                        {topTracks?.map((track, i) => {
                            return (
                                <SongListItem
                                    key={i}
                                    title={track.name}
                                    subtitle={track?.artists?.map(a => a?.name)?.join(", ")}
                                    image={track.album?.images?.[0]?.url}
                                    song={track}
                                    songContext={{
                                        type: "artist",
                                        artistId: data?.id ?? "",
                                        artistName: data?.name ?? ""
                                    }}
                                    allSongsInQueue={topTracks}
                                    trackNumber={i + 1}
                                />
                            )
                        })}

                        <AppHeading style={[[styles.heading, { marginBottom: 10 }]]}>Related Artists</AppHeading>
                        <HorizontalScrollWrapper>
                            {relatedArtists?.map((a, i) => {
                                return (
                                    <ArtistActionCard key={i} artistData={a} withoutRightMargin={i === relatedArtists.length - 1} />
                                )
                            })}
                        </HorizontalScrollWrapper>

                        <AppHeading style={[styles.heading, { marginTop: 30 }]}>Popular Releases</AppHeading>
                        {albums?.map((a, i) => {
                            return (
                                <AlbumListItem
                                    key={i}
                                    albumId={a.id}
                                    title={a.name}
                                    image={a.images?.[0]?.url}
                                    subtitle={a.release_date?.split("-")?.[0]}
                                />
                            )
                        })}
                    </View>
                </View>
            </ScreenWrapper>
        </>
    )
}