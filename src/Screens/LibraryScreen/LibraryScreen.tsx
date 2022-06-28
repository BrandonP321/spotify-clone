import React, { useEffect, useState } from 'react';
import { Pressable, View, Image, ListRenderItemInfo } from 'react-native';
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

    const handlePlaylistPress = (playlistId: string) => {
        navigation.navigate("Playlist", { playlistId: playlistId })
    }

    return (
        <>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: userData?.images?.[0]?.url }} style={styles.headerImg} />
                    <AppHeading style={styles.headerTitle}>Your Library</AppHeading>
                </View>
            </View>
            <ScreenWrapper
                loading={!playlists || !albums || !userData} stickyHeaderIndices={[0]}
                style={{ paddingTop: ScreenUtils.statusBarHeight + 80 }}
                data={(selectedTab === "albums" ? albums : playlists) ?? []}
                renderItem={({ index, item, separators }: ListRenderItemInfo<SpotifyAlbum | SpotifyPlaylist>) => {

                    const commonData = {
                        title: item?.name,
                        image: item?.images?.[0]?.url,
                        styles: {
                            img: { width: 70, height: 70 }
                        }
                    }

                    return item?.type === "album"
                        ? <AlbumListItem {...commonData} albumId={item?.id} subtitle={item?.artists?.map(a => a.name)?.join(", ")} />
                        : <ImageListItem {...commonData}
                            onPress={() => handlePlaylistPress(item?.id)}
                            subtitle={`${item.tracks?.items?.length} ${item.tracks?.items?.length === 1 ? "song" : "songs"}`}
                        />
                }}
                headerComponent={() => (
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
                )}
            >
            </ScreenWrapper>
        </>
    )
}