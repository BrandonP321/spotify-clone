import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, Pressable, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper';
import { ScreenProps } from '../../global/Navigation/Screens'
import { AppText } from '../../global/UI/Components/AppText/AppText';
import LoadingContainer from '../../global/UI/Components/LoadingSpinnerContainer/LoadingSpinnerContainer';
import ImageListItem, { AlbumListItem, ArtistListItem, SongListItem } from '../../global/UI/Components/SongListItem/ImageListItem';
import { uiBase } from '../../global/UI/styles/uiBase.style';
import { SpotifyFetcher, SpotifySearchResponse } from '../../utils';
import { ScreenUtils } from '../../utils/ScreenUtils';
import styles, { headerHeight, headerInputUnfocusedHeight, headerInputUnfocusedWidth, headerWidth } from "./SearchScreen.style";

type TSearchTab = keyof SpotifySearchResponse;

const tabs: { title: string; tab: TSearchTab }[] = [
    { title: "Songs", tab: "tracks" },
    { title: "Artists", tab: "artists" },
    { title: "Albums", tab: "albums" },
    { title: "Playlists", tab: "playlists" },
]

type SearchScreenProps = ScreenProps<"Search">;

export default function SearchScreen({ navigation, route }: SearchScreenProps) {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [selectedTab, setSelectedTab] = useState<TSearchTab>("tracks");
    const [data, setData] = useState<SpotifySearchResponse | null>();

    useFocusEffect(useCallback(() => {
        // subscribe to keyboard events
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsSearchBarFocused(false)
        })

        if (!data) {
            setSelectedTab("tracks");
            setTimeout(() => {
                setIsSearchBarFocused(true);
            }, 300)
        }

        return () => {
            setIsSearchBarFocused(false);
            // remove event listener from keyboard
            hideSubscription.remove();
        }
    }, []))

    const performSearch = (query?: string) => {
        if (query) {
            SpotifyFetcher.search(query).then(setData);
            setData(null);
            setIsSearchBarFocused(false);
        }
    }

    return (
        <>
            <LoadingContainer loading={data === null} hideDelay={500} style={{ zIndex: 10, top: ScreenUtils.statusBarHeight + headerHeight }}/>

            <ScreenWrapper style={{ paddingTop: 0 }} stickyHeaderIndices={[0]} onScroll={() => setIsSearchBarFocused(false)}>
                <SearchBar isFocused={isSearchBarFocused} setFocus={setIsSearchBarFocused} search={performSearch} />

                <View style={styles.tabs}>
                    {tabs?.map((t, i) => {
                        const isSelected = selectedTab === t.tab;

                        return (
                            <Pressable key={i} style={[styles.tab, isSelected && { borderColor: uiBase.colors.textPrimary }]} onPress={() => setSelectedTab(t.tab)}>
                                <AppText style={styles.tabText}>{t.title}</AppText>
                            </Pressable>
                        )
                    })}
                </View>

                {/* TRACKS */}
                <View style={selectedTab !== "tracks" && { height: 0, overflow: "hidden" }}>
                    {data?.tracks?.items?.map((t, i) => {
                        return (
                            <SongListItem
                                key={i}
                                allSongsInQueue={data.tracks.items}
                                song={t}
                                songContext={{ type: "none" }}
                                title={t.name}
                                image={t.album?.images?.[0]?.url}
                                subtitle={t.artists?.map(a => a.name)?.join(", ")}

                            />
                        )
                    })}
                </View>

                {/* ARTISTS */}
                <View style={selectedTab !== "artists" && { height: 0, overflow: "hidden" }}>
                    {data?.artists?.items?.map((a, i) => {
                        return (
                            <ArtistListItem
                                key={i}
                                title={a.name}
                                image={a?.images?.[0]?.url}
                                artistId={a?.id}
                            />
                        )
                    })}
                </View>

                {/* ALBUMS */}
                <View style={selectedTab !== "albums" && { height: 0, overflow: "hidden" }}>
                    {data?.albums?.items?.map((a, i) => {
                        return (
                            <AlbumListItem
                                key={i}
                                title={a.name}
                                subtitle={a.artists.map(artist => artist.name).join(", ")}
                                image={a?.images?.[0]?.url}
                                albumId={a?.id}
                                styles={{
                                    img: { width: 45, height: 45 }
                                }}
                            />
                        )
                    })}
                </View>

                {/* PLAYLISTS */}
                <View style={selectedTab !== "playlists" && { height: 0, overflow: "hidden" }}>
                    {data?.playlists?.items?.map((p, i) => {
                        const totalTracks = p.tracks?.total;

                        return (
                            <ImageListItem
                                key={i}
                                title={p.name}
                                subtitle={`${totalTracks} ${totalTracks === 1 ? "song" : "songs"}`}
                                image={p.images?.[0]?.url || "blank"}
                                onPress={() => navigation.navigate("Playlist", { playlistId: p.id })}
                                styles={{
                                    img: { width: 45, height: 45 }
                                }}
                            />
                        )
                    })}
                </View>

            </ScreenWrapper>
        </>
    )
}

type SearchBarProps = {
    isFocused: boolean;
    setFocus: React.Dispatch<React.SetStateAction<boolean>>;
    search: (q: string) => void;
}

const SearchBar = ({ isFocused, setFocus, search }: SearchBarProps) => {
    const inputRef = useRef<TextInput | null>(null);
    const query = useRef("");
    const lastQueryChangeTime = useRef(Date.now());
    /* Amount of time that must pass between keystrokes before performing new query search */
    const queryKeyPressInterval = 500;

    const animationProgress = useSharedValue(0);

    useEffect(() => {
        animationProgress.value = withTiming(isFocused ? 1 : 0, {
            duration: 250
        })

        inputRef.current?.[isFocused ? "focus" : "blur"]();
    }, [isFocused])

    const handleInputChange = (value: string) => {
        query.current = value;
        lastQueryChangeTime.current = Date.now();

        // wait brief period before performing query to ensure user is done typing
        setTimeout(() => {
            // if no more keys have been pressed, make query
            if (Date.now() - lastQueryChangeTime.current >= queryKeyPressInterval) {
                search(value);
            }
        }, queryKeyPressInterval)
    }

    const inputWrapperAnimStyles = useAnimatedStyle(() => ({
        borderRadius: interpolate(animationProgress.value, [0, 1], [5, 0], "clamp"),
        height: interpolate(animationProgress.value, [0, 1], [headerInputUnfocusedHeight, headerHeight], "clamp"),
        width: interpolate(animationProgress.value, [0, 1], [headerInputUnfocusedWidth, headerWidth], "clamp"),
    }))

    const inputAnimStyles = useAnimatedStyle(() => ({
        opacity: interpolate(animationProgress.value, [0.6, 0.8], [0, 1], "clamp"),
        width: interpolate(animationProgress.value, [0, 0.6], [headerInputUnfocusedWidth, headerWidth - 50], "clamp")
    }))

    const placeholderAnimStyles = useAnimatedStyle(() => ({
        opacity: interpolate(animationProgress.value, [0, 0.4], [1, 0], "clamp")
    }))

    return (
        <View style={styles.header}>
            <Animated.View style={[styles.placeholderWrapper, placeholderAnimStyles]} pointerEvents={"none"}>
                <AppText style={styles.placeholderText}>Search</AppText>
            </Animated.View>
            <View style={[styles.wrapper]}>
                <Animated.View style={[styles.inputOuterWrapper, inputWrapperAnimStyles]}>
                    <Animated.View style={[styles.inputInnerWrapper, inputAnimStyles]}>
                        <TextInput
                            ref={inputRef}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            placeholder={"Search Query"}
                            placeholderTextColor={uiBase.colors.textSecondary}
                            style={styles.input}
                            onChangeText={handleInputChange}
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    )
}