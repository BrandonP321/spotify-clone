import React, { useCallback, useEffect, useState } from 'react'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import { ArtistActionCard } from '../../global/UI/Components/ActionCard/ActionCard'
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper'
import { SpotifyArtist, SpotifyFetcher } from '../../utils/SpotifyFetcher'

type HomeScreenProps = ScreenProps<"Home">

type HomePageData = {
  favoriteArtists?: SpotifyArtist[];
}

export default function HomeScreen(props: HomeScreenProps) {
  const [data, setData] = useState<HomePageData | null>(null);

  useEffect(() => {
    SpotifyFetcher.getTopArtists()
      .then(res => {
        updateDataState({ favoriteArtists: res?.items })
      }).catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      })
  }, [props.navigation]);

  const updateDataState = useCallback((newData: { [key in keyof HomePageData]: HomePageData[key] }) => {
    setData({ ...(data ?? {}), ...(newData ?? {}) });
  }, [data])

  return (
    <ScreenWrapper>
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