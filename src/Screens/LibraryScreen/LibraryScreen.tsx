import React, { useEffect, useState } from 'react';
import { Pressable, View, Image } from 'react-native';
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper';
import { ScreenProps } from '../../global/Navigation/Screens';
import { AppHeading, AppText } from '../../global/UI/Components/AppText/AppText';
import ImageListItem, { AlbumListItem } from '../../global/UI/Components/SongListItem/ImageListItem';
import { uiBase } from '../../global/UI/styles/uiBase.style';
import { SpotifyAlbum, SpotifyFetcher, SpotifyPlaylist, SpotifyUser } from '../../utils';
import { ScreenUtils } from '../../utils/ScreenUtils';
import styles from "./LibraryScreen.style";

type TLibraryTab = "playlists" | "albums";

const tabs: { title: string; tab: TLibraryTab }[] = [
    { title: "Playlists", tab: "playlists" },
    { title: "Albums", tab: "albums" }
]

type LibraryScreenProps = ScreenProps<"Library">;

export default function LibraryScreen({ navigation, route }: LibraryScreenProps) {
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[] | null>(null);
    const [albums, setAlbums] = useState<SpotifyAlbum[] | null>(null);
    const [userData, setUserData] = useState<SpotifyUser | null>(null);
    const [selectedTab, setSelectedTab] = useState<TLibraryTab>("playlists");

    useEffect(() => {
        SpotifyFetcher.getCurrentUser().then(setUserData);
        SpotifyFetcher.getUserPlaylists().then(setPlaylists);
        SpotifyFetcher.getSavedAlbums().then(setAlbums);
    }, []);

    return (
        <ScreenWrapper loading={!!playlists || !!albums || !!userData} stickyHeaderIndices={[0]} style={{ paddingTop: ScreenUtils.statusBarHeight }}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: userData?.images?.[0]?.url }} style={styles.headerImg} />
                    <AppHeading style={styles.headerTitle}>Your Library</AppHeading>
                </View>
            </View>

            <View style={styles.tabs}>
                {tabs?.map((t, i) => {
                    const isSelected = selectedTab === t.tab;

                    return (
                        <Pressable
                            key={i}
                            style={[styles.tab, {
                                borderColor: isSelected ? uiBase.colors.lime(1) : uiBase.colors.textSecondary,
                                backgroundColor: isSelected ? uiBase.colors.lime(0.7) : "transparent",
                            }]}
                            onPress={() => setSelectedTab(t.tab)}
                        >
                            <AppText style={styles.tabText}>{t.title}</AppText>
                        </Pressable>
                    )
                })}
            </View>

            {/* PLAYLISTS */}
            <View style={selectedTab !== "playlists" && { height: 0, overflow: "hidden" }}>
                {playlists?.map((p, i) => {
                    const totalTracks = p.tracks?.total;

                    return (
                        <ImageListItem
                            key={i}
                            title={p.name}
                            subtitle={`${totalTracks} ${totalTracks === 1 ? "song" : "songs"}`}
                            image={p.images?.[0]?.url || "blank"}
                            onPress={() => navigation.navigate("Playlist", { playlistId: p.id })}
                            styles={{
                                img: { width: 70, height: 70 }
                            }}
                        />
                    )
                })}
            </View>

            {/* ALBUMS */}
            <View style={selectedTab !== "albums" && { height: 0, overflow: "hidden" }}>
                {albums?.map((a, i) => {

                    return (
                        <AlbumListItem
                            key={i}
                            title={a?.name}
                            subtitle={a?.artists.map(artist => artist.name).join(", ")}
                            image={a?.images?.[0]?.url}
                            albumId={a?.id}
                            styles={{
                                img: { width: 70, height: 70 }
                            }}
                        />
                    )
                })}
            </View>
        </ScreenWrapper>
    )
}