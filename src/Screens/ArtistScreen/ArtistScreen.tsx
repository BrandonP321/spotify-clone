import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ImageBackground, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, ScrollViewComponent, View } from 'react-native'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import SimpleHeader, { SimpleHeaderProps } from '../../global/UI/Components/SimpleHeader/SimpleHeader';
import { SpotifyAlbum, SpotifyArtist, SpotifyFetcher, SpotifyTrack } from '../../utils';
import styles, { artistImgWrapperHeight, scrollOffsetPlayIconFix } from "./ArtistScreen.style";
import PlayIcon from "../../../assets/play-solid.svg";
import { uiBase } from '../../global/UI/styles/uiBase.style';
import { renderAlbumListItems, renderSongListItems } from '../../global/UI/Components/SongListItem/ImageListItem';
import {AppText, AppHeading} from '../../global/UI/Components/AppText/AppText';
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper';
import { ArtistActionCard } from '../../global/UI/Components/ActionCard/ActionCard';

type ArtistScreenProps = ScreenProps<"Artist">;

const gradientColor = (l: number, a?: number) => `hsla(0, 0%, ${l * 100}%, ${a ?? 1})`;
const backArrowColor = (a: number) => `rgba(0, 0, 0, ${a})`;
const headerTitleColor = (a: number) => `rgba(255, 255, 255, ${a})`

export default function ArtistScreen(props: ArtistScreenProps) {
    const { artistId } = props.route.params;

    const [data, setData] = useState<SpotifyArtist | null>(null);
    const [topTracks, setTopTracks] = useState<SpotifyTrack[] | null>(null);
    const [albums, setAlbums] = useState<SpotifyAlbum[] | null>(null);
    const [relatedArtists, setRelatedArtists] = useState<SpotifyArtist[] | null>(null);
    const [gradientColors, setGradientColors] = useState({ imgTop: gradientColor(0.15), imgBottom: gradientColor(0.15, 0), contentTop: gradientColor(0.15, 1) });
    const [headerColors, setHeaderColors] = useState({ headerBg: gradientColor(0.25, 0), backArrowBg: backArrowColor(0.3), title: headerTitleColor(0) })
    const [imgGradientOpacity, setImgGradientOpacity] = useState(0);
    const [isPlayBtnFixed, setIsPlayBtnFixed] = useState(false);

    const scrollViewRef = useRef<ScrollView | null>(null);

    useFocusEffect(useCallback(() => {
        // ensure all data states are set to null on screen load
        setData(null);
        setTopTracks(null);
        setAlbums(null);
        setRelatedArtists(null);

        SpotifyFetcher.getArtist(artistId).then(setData);
        SpotifyFetcher.getArtistTopTracks(artistId).then(res => setTopTracks(res?.tracks?.slice(0, 5)));
        SpotifyFetcher.getArtistAlbums(artistId).then(res => setAlbums(res.items));
        SpotifyFetcher.getArtistRelatedArtists(artistId).then(res => setRelatedArtists(res.artists?.slice(0, 10)));
    }, [artistId]));

    useEffect(() => {
        if (data === null) {
            // whenever data is reset, scroll to top of screen
            scrollViewRef.current?.scrollTo(0)
        }
    }, [data])

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;

        updateGradientColors(scrollOffset);
        updateHeaderColors(scrollOffset);
        updatePlayIconPosition(scrollOffset);
    }, [])

    const updateGradientColors = (scrollOffset: number) => {
        const scrollPercentFromImgMid = scrollOffset / (artistImgWrapperHeight / 2);

        const imgGradientOpacity = scrollPercentFromImgMid;
        const imgBottomGradientColor = gradientColor(0.15, scrollPercentFromImgMid);

        if (scrollPercentFromImgMid <= 1) {
            setGradientColors({ imgTop: gradientColor(0.15), imgBottom: imgBottomGradientColor, contentTop: gradientColor(0.15, 1) });
            setImgGradientOpacity(imgGradientOpacity);
        }
    }

    const updateHeaderColors = (scrollOffset: number) => {
        const scrollPercentFromImgMidToBottom = (1 - (scrollOffset / (artistImgWrapperHeight / 3))) * -1 * 5;

        let headerBg = gradientColor(0.25, scrollPercentFromImgMidToBottom);
        let backArrowBg = backArrowColor(Math.min(0.3, scrollPercentFromImgMidToBottom / -15 + 0.25));
        let titleColor = headerTitleColor(scrollPercentFromImgMidToBottom / 3 - 1);

        setHeaderColors({ headerBg, backArrowBg, title: titleColor })
    }

    const updatePlayIconPosition = (scrollOffset: number) => {
        setIsPlayBtnFixed(scrollOffset >= scrollOffsetPlayIconFix);
    }

    const handlePlayBtnPress = () => {
        alert("play artist music");
    }

    const headerStyles: SimpleHeaderProps["styles"] = {
        backArrow: { backgroundColor: headerColors.backArrowBg },
        header: { backgroundColor: headerColors.headerBg },
        title: { color: headerColors.title }
    }

    const PlayBtn = () => (
        <PlayIconBtn onPress={handlePlayBtnPress} isFixed={isPlayBtnFixed}/>
    )

    return (
        <>
            {isPlayBtnFixed &&
                <PlayBtn/>
            }

            <ScreenWrapper
                style={styles.artistScreen}
                onScroll={handleScroll}
                stickyHeaderIndices={[0]}
                loading={!data ?? !albums ?? !topTracks ?? !relatedArtists}
            >
                <View style={styles.headerWrapper}>
                    <SimpleHeader title={data?.name} styles={headerStyles} />
                </View>

                <View style={styles.fixedImgWrapper}>
                    <ImageBackground source={{ uri: data?.images?.[0]?.url }} style={styles.artistImg} />
                    <View style={styles.artistImgOverlay} />
                </View>

                {!isPlayBtnFixed &&
                    <PlayBtn/>
                }

                <View style={styles.content}>
                    <View style={styles.titleBoxOuterWrapper}>
                        <View style={styles.titleBoxContent}>
                            <LinearGradient colors={[gradientColors.imgTop, gradientColors.imgBottom]} style={[styles.imgGradient, { opacity: imgGradientOpacity }]} />
                            <AppText style={styles.artistTitle}>{data?.name}</AppText>
                        </View>
                    </View>
                    <View style={styles.contentWrapper}>
                        <LinearGradient colors={[gradientColors.contentTop, gradientColor(0.15, 0)]} style={styles.contentTopGradient} />

                        <AppHeading style={styles.heading}>Popular</AppHeading>
                        {renderSongListItems(topTracks)}

                        <AppHeading style={[[styles.heading, { marginBottom: 10 }]]}>Related Artists</AppHeading>
                        <HorizontalScrollWrapper>
                            {relatedArtists?.map((a, i) => {
                                return (
                                    <ArtistActionCard key={i} artistData={a} withoutRightMargin={i === relatedArtists.length - 1}/>
                                )
                            })}
                        </HorizontalScrollWrapper>

                        <AppHeading style={[styles.heading, { marginTop: 30 }]}>Popular Releases</AppHeading>
                        {renderAlbumListItems(albums, true)}
                    </View>
                </View>
            </ScreenWrapper>
        </>
    )
}

const PlayIconBtn = (props: { onPress?: () => void, isFixed?: boolean }) => {
    return (
        <Pressable style={[styles.playIconWrapper, props.isFixed && styles.fixedIconWrapper]} onPress={props.onPress}>
            <PlayIcon style={[styles.playIcon]} fill={uiBase.colors.appBg(1)} />
        </Pressable>
    )
}