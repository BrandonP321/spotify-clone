import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react'
import { Image, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import SimpleHeader, { SimpleHeaderProps } from '../../global/UI/Components/SimpleHeader/SimpleHeader';
import { SpotifyArtist, SpotifyFetcher } from '../../utils';
import styles, { artistImgWrapperHeight, playIconPositionTop } from "./ArtistScreen.style";
import PlayIcon from "../../../assets/play-solid.svg";
import { uiBase } from '../../global/UI/styles/uiBase.style';

type ArtistScreenProps = ScreenProps<"Artist">;

const gradientColor = (l: number, a?: number) => `hsla(0, 0%, ${l * 100}%, ${a ?? 1})`;
const backArrowColor = (a: number) => `rgba(0, 0, 0, ${a})`;
const headerTitleColor = (a: number) => `rgba(255, 255, 255, ${a})`

export default function ArtistScreen(props: ArtistScreenProps) {
    const { artistId } = props.route.params;

    const [data, setData] = useState<SpotifyArtist | null>(null);
    const [gradientColors, setGradientColors] = useState({ imgTop: gradientColor(0.15), imgBottom: gradientColor(0.15, 0), contentTop: gradientColor(0.15, 1) });
    const [headerColors, setHeaderColors] = useState({ headerBg: gradientColor(0.25, 0), backArrowBg: backArrowColor(0.3), title: headerTitleColor(0) })
    const [imgGradientOpacity, setImgGradientOpacity] = useState(0);
    const [playBtnPosition, setPlayBtnPosition] = useState(playIconPositionTop)

    useFocusEffect(useCallback(() => {
        SpotifyFetcher.getArtist(artistId)
            .then(res => {
                setData(res);
            }).catch(err => {
                console.log(err);
            })
    }, [artistId]));

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
        setPlayBtnPosition(playIconPositionTop - scrollOffset);
    }

    const handlePlayBtnPress = () => {
        alert("play artist music");
    }

    const headerStyles: SimpleHeaderProps["styles"] = {
        backArrow: { backgroundColor: headerColors.backArrowBg },
        header: { backgroundColor: headerColors.headerBg },
        title: { color: headerColors.title }
    }

    const playIconStyle: StyleProp<ViewStyle> = {
        top: playBtnPosition,
    }

    return (
        <ScreenWrapper
            style={styles.artistScreen}
            onScroll={handleScroll}
            stickyHeaderIndices={[0]}
        >
            <ArtistScreenStickyContent 
                playIconStyle={playIconStyle} 
                img={data?.images?.[0]?.url} 
                title={data?.name} 
                headerStyles={headerStyles} 
                onPlayBtnClick={handlePlayBtnPress}
            />

            <View style={styles.content}>
                <View style={styles.titleBoxWrapper}>
                    <LinearGradient colors={[gradientColors.imgTop, gradientColors.imgBottom]} style={[styles.imgGradient, { opacity: imgGradientOpacity }]} />
                    <Text style={styles.artistTitle}>{data?.name}</Text>
                </View>
                <View style={styles.contentWrapper}>
                    <LinearGradient colors={[gradientColors.contentTop, gradientColor(0.15, 0)]} style={styles.contentTopGradient} />

                    {Array(10).fill(null).map((a, i) => {
                        return (
                            <View key={i} style={{ height: 100, marginVertical: 200, backgroundColor: "#fff" }} />
                        )
                    })}
                </View>
            </View>
        </ScreenWrapper>
    )
}

type ArtistScreenStickyContentProps = {
    img?: string;
    title?: string;
    headerStyles: SimpleHeaderProps["styles"];
    playIconStyle: StyleProp<ViewStyle>;
    onPlayBtnClick: () => void;
}

const ArtistScreenStickyContent = (props: ArtistScreenStickyContentProps) => {
    return (
        <View style={styles.stickyContent}>
            <View style={styles.fixedImgWrapper}>
                <ImageBackground source={{ uri: props.img }} style={styles.artistImg} />
                <View style={styles.artistImgOverlay} />
            </View>
            <SimpleHeader title={props.title} styles={props.headerStyles} />
            <Pressable style={[styles.playIconWrapper, props.playIconStyle]} onPress={props.onPlayBtnClick}>
                <PlayIcon style={[styles.playIcon]} fill={uiBase.colors.appBg(1)} />
            </Pressable>
        </View>
    )
}