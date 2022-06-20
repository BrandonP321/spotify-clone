import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { RootStackParamList, ScreenProps } from '../../global/Navigation/Screens'
import { ArtistActionCard } from '../../global/UI/Components/ActionCard/ActionCard'
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { AuthUtils } from '../../utils'
import { SpotifyArtist, SpotifyFetcher } from '../../utils/SpotifyFetcher'

type HomeScreenProps = ScreenProps<"Home">

type HomePageData = {
  favoriteArtists?: SpotifyArtist[];
}

export default function HomeScreen(props: HomeScreenProps) {
  const [data, setData] = useState<HomePageData | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    AuthUtils.validateUserAuth().then(res => {

      SpotifyFetcher.getTopArtists()
        .then(res => {
          updateDataState({ favoriteArtists: res?.items })
        }).catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        })
    }).catch(err => {
        console.log("err", err);
    })

  }, []);

  const updateDataState = useCallback((newData: { [key in keyof HomePageData]: HomePageData[key] }) => {
    setData({ ...(data ?? {}), ...(newData ?? {}) });
  }, [data])

  return (
    <ScreenWrapper loading={!data}>
      <HorizontalScrollWrapper heading={"Good evening"}>
        {data?.favoriteArtists?.map((artist, i) => {
          return (
            <ArtistActionCard key={i} artistData={artist} withoutRightMargin={i === (data?.favoriteArtists?.length ?? 0) - 1}/>
          )
        })}
      </HorizontalScrollWrapper>
    </ScreenWrapper>
  )
}