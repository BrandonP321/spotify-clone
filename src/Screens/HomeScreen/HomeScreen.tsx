import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import { AlbumActionCard, ArtistActionCard, PlaylistActionCard, SongActionCard } from '../../global/UI/Components/ActionCard/ActionCard'
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { AuthUtils } from '../../utils';
import { SpotifyAlbum, SpotifyArtist, SpotifyFetcher, SpotifyPlaylist, SpotifyTrack } from '../../utils/SpotifyFetcher';
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from 'expo-linear-gradient'
import { uiBase } from '../../global/UI/styles/uiBase.style'
import styles from "./HomeScreen.style";

type HomeScreenProps = ScreenProps<"Home">

export default function HomeScreen(props: HomeScreenProps) {
  const [favoriteArtists, setFavoriteArtists] = useState<SpotifyArtist[] | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<SpotifyPlaylist[] | null>(null);
  const [recentTracks, setRecentTracks] = useState<SpotifyTrack[] | null>(null);
  const [savedAlbums, setSavedAlbums] = useState<SpotifyAlbum[] | null>(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<SpotifyPlaylist[] | null>(null);

  useEffect(() => {
    // validate user auth on app load before doing anything
    AuthUtils.validateUserAuth().then(res => {

      SpotifyFetcher.getTopArtists().then(res => setFavoriteArtists(res.items));
      SpotifyFetcher.getUserPlaylists({ limit: 10 }).then(setUserPlaylists);
      SpotifyFetcher.getRecentTracks({ limit: 10 }).then(setRecentTracks);
      SpotifyFetcher.getSavedAlbums({ limit: 10 }).then(setSavedAlbums);
      SpotifyFetcher.getFeaturedPlaylists({ limit: 10 }).then(setFeaturedPlaylists)
    })
  }, []);

  useEffect(() => {
    if (!!userPlaylists && !!favoriteArtists) {
      // wait briefly so content has a chance to render before hiding splash
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 200)
    }
  }, [userPlaylists, favoriteArtists]);

  return (
    <ScreenWrapper style={styles.screenWrapper}>
      <LinearGradient 
        colors={["rgba(244, 11, 70, 0.25)", "rgba(244, 11, 70, 0)"]} 
        locations={[0, 0.5]}
        style={styles.screenTopGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <HorizontalScrollWrapper heading={"Your playlists"} style={{ container: { marginTop: uiBase.padding.appTopPadding } }}>
        {userPlaylists?.map((playlist, i) => {

          return (
            <PlaylistActionCard key={i} playlistData={playlist} withoutRightMargin={i === (userPlaylists.length - 1)} />
          )
        })}
      </HorizontalScrollWrapper>

      <HorizontalScrollWrapper heading={"Recently Played"}>
        {recentTracks?.map((track, i) => {

          return (
            <SongActionCard key={i} songData={track} songsForQueue={recentTracks} withoutRightMargin={i === (recentTracks.length - 1)} />
          )
        })}
      </HorizontalScrollWrapper>

      <HorizontalScrollWrapper heading={"Your Top Artists"}>
        {favoriteArtists?.map((artist, i) => {

          return (
            <ArtistActionCard key={i} artistData={artist} withoutRightMargin={i === (favoriteArtists?.length ?? 0) - 1} />
          )
        })}
      </HorizontalScrollWrapper>

      <HorizontalScrollWrapper heading={"Featured Playlists"}>
        {featuredPlaylists?.map((playlist, i) => {

          return (
            <PlaylistActionCard key={i} playlistData={playlist} withoutRightMargin={i === (featuredPlaylists.length - 1)} />
          )
        })}
      </HorizontalScrollWrapper>

      <HorizontalScrollWrapper heading={"Saved Albums"}>
        {savedAlbums?.map((album, i) => {

          return (
            <AlbumActionCard key={i} albumData={album} withoutRightMargin={i === (savedAlbums.length - 1)} />
          )
        })}
      </HorizontalScrollWrapper>
    </ScreenWrapper>
  )
}