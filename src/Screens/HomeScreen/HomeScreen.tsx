import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { useAppDispatch, useUserAuth } from '../../global/features/hooks'
import { RootStackParamList, ScreenProps } from '../../global/Navigation/Screens'
import { ArtistActionCard, PlaylistActionCard } from '../../global/UI/Components/ActionCard/ActionCard'
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { AuthUtils } from '../../utils';
import { SpotifyArtist, SpotifyFetcher, SpotifyPlaylist } from '../../utils/SpotifyFetcher';
import * as SplashScreen from "expo-splash-screen";

type HomeScreenProps = ScreenProps<"Home">

export default function HomeScreen(props: HomeScreenProps) {
  const [favoriteArtists, setFavoriteArtists] = useState<SpotifyArtist[] | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<SpotifyPlaylist[] | null>(null);

  useEffect(() => {
    // validate user auth on app load before doing anything
    AuthUtils.validateUserAuth().then(res => {

      SpotifyFetcher.getTopArtists().then(res => setFavoriteArtists(res.items));
      SpotifyFetcher.getUserPlaylists({ limit: 10 }).then(setUserPlaylists);
    }).catch(err => {
      console.log("err", err);
    })
  }, []);

  useEffect(() => {
    if (!!userPlaylists && !!favoriteArtists) {
      // wait briefly so content has a chance to render before hiding splash
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 200)
    }
  }, [userPlaylists, favoriteArtists])

  return (
    <ScreenWrapper>
      <HorizontalScrollWrapper heading={"Good evening"}>
        {favoriteArtists?.map((artist, i) => {
          return (
            <ArtistActionCard key={i} artistData={artist} withoutRightMargin={i === (favoriteArtists?.length ?? 0) - 1} />
          )
        })}
      </HorizontalScrollWrapper>

      <HorizontalScrollWrapper heading={"Your playlists"}>
        {userPlaylists?.map((playlist, i) => {
          return (
            <PlaylistActionCard key={i} playlistData={playlist} withoutRightMargin={i === (userPlaylists.length - 1)} />
          )
        })}
      </HorizontalScrollWrapper>
    </ScreenWrapper>
  )
}