import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Image, ImageStyle, Pressable, StyleProp, Text, View } from "react-native"
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ScreenWrapper from "../../global/Components/ScreenWrapper/ScreenWrapper";
import { ScreenProps } from "../../global/Navigation/Screens"
import { AlbumActionCard } from "../../global/UI/Components/ActionCard/ActionCard";
import { AppHeading, AppText } from "../../global/UI/Components/AppText/AppText";
import HorizontalScrollWrapper from "../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper";
import { PlayIconBtn } from "../../global/UI/Components/PlayBtn/PlayIconBtn";
import SimpleHeader from "../../global/UI/Components/SimpleHeader/SimpleHeader";
import { ArtistListItem, SongListItem } from "../../global/UI/Components/SongListItem/ImageListItem";
import { uiBase } from "../../global/UI/styles/uiBase.style";
import { SpotifyAlbum, SpotifyArtist, SpotifyFetcher } from "../../utils";
import { useAppNavigation } from "../../utils/NavigationHelper";
import styles, { albumImgHeight, topContentHeight } from "./AlbumScreen.style";

const gradientColor = (l: number, a?: number) => `hsla(0, 0%, ${l * 100}%, ${a ?? 1})`;

type AlbumScreenProps = ScreenProps<"Album">;

const AlbumScreen = (props: AlbumScreenProps) => {
    const { albumId } = props.route.params;

    const navigation = useAppNavigation();

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

    const scrollOffset = useSharedValue(0);
    
    const handleScroll = useAnimatedScrollHandler((e) => {
        scrollOffset.value = e?.contentOffset.y;
    })

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
            <PlayBtn fixedIcon/>

            <ScreenWrapper
                style={styles.albumScreen}
                onScroll={handleScroll}
                stickyHeaderIndices={[0]}
                loading={!data ?? !allArtists ?? !otherAlbums}
            >
                <View style={styles.headerWrapper}>
                    <SimpleHeader
                        title={data?.name}
                        bgOpacityInterpolationInput={[topContentHeight / 4 * 2.5, topContentHeight / 4 * 3.5]}
                        scrollOffset={scrollOffset}
                        titleOpacityInterpolationInput={[topContentHeight, topContentHeight + 50]}
                    />
                </View>

                <LinearGradient colors={[gradientColor(0.25, 1), uiBase.colors.appBg(0)]} style={styles.topContentGradient}/>

                <PlayBtn/>

                <View style={styles.topContentWrapper}>
                    <AnimatedCoverImg 
                        img={data?.images?.[0]?.url} 
                        scrollOffset={scrollOffset}
                        heightInterpolationInput={[0, topContentHeight / 3]}
                        opacityInterpolationInput={[topContentHeight / 3, topContentHeight / 4 * 2.5]}
                        yTransformInterpolationInput={[topContentHeight / 3, topContentHeight / 4 * 2.5]}
                    />
                </View>

                <View>
                    <AppHeading ref={albumTitleEle} style={styles.title}>{data?.name}</AppHeading>
                    <Pressable style={styles.artistWrapper} onPress={goToArtist}>
                        <Image source={{ uri: allArtists?.[0]?.images?.[0]?.url }} style={styles.artistImg}/>
                        <AppText style={styles.artistName}>{data?.artists?.[0]?.name}</AppText>
                    </Pressable>
                    <AppText style={styles.releaseDate}>{releaseDate}</AppText>
                    {data?.tracks?.items?.map((song, i) => {
                        return (
                            <SongListItem
                                key={i}
                                title={song.name}
                                subtitle={song.artists?.map(a => a.name)?.join(", ")}
                                songId={song.id}
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
                                <AlbumActionCard albumData={album} key={i} withoutRightMargin={i === otherAlbums.length - 1}/>
                            )
                        })}
                    </HorizontalScrollWrapper>
                </View>

            </ScreenWrapper>
        </>
    )
}

type AnimatedCoverImgProps = {
    img?: string; 
    style?: StyleProp<ImageStyle>;
    scrollOffset: SharedValue<number>;
    heightInterpolationInput: number[];
    opacityInterpolationInput: number[];
    yTransformInterpolationInput: number[];
}

const AnimatedCoverImg = (props: AnimatedCoverImgProps) => {
    const { img, style, scrollOffset, heightInterpolationInput, opacityInterpolationInput, yTransformInterpolationInput } = props;

    const animStyles = useAnimatedStyle(() => ({
        height: interpolate(scrollOffset.value, heightInterpolationInput, [albumImgHeight, albumImgHeight - heightInterpolationInput[1]], "clamp"),
        opacity: interpolate(scrollOffset.value, opacityInterpolationInput, [1, 0], "clamp"),
        transform: [{ translateY: interpolate(scrollOffset.value, yTransformInterpolationInput, [0, 40], "clamp") }]
    }))

    return (
        <Animated.Image source={{ uri: img }} style={[styles.albumImg, style, animStyles]}/>
    )
}

export default AlbumScreen