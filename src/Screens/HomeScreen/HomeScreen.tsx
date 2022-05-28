import React from 'react'
import { View } from 'react-native'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import ActionCard, { ArtistActionCard } from '../../global/UI/Components/ActionCard/ActionCard'
import HorizontalScrollWrapper from '../../global/UI/Components/HorizontalScrollWrapper/HorizontalScrollWrapper'

const mockData = {
    recents: [
        { img: "https://musicrow.com/wp-content/uploads/2020/02/BORN-HERE-LIVE-HERE-DIE-HERE-COVER-Jim-Wright.jpg", title: "some title", blurb: "Stay focused with electronic and trap beats." },
        { img: "https://musicrow.com/wp-content/uploads/2020/02/BORN-HERE-LIVE-HERE-DIE-HERE-COVER-Jim-Wright.jpg", title: "some title", blurb: "Stay focused with electronic and trap beats." },
        { img: "https://musicrow.com/wp-content/uploads/2020/02/BORN-HERE-LIVE-HERE-DIE-HERE-COVER-Jim-Wright.jpg", title: "some title", blurb: "Stay focused with electronic and trap beats." },
        { img: "https://musicrow.com/wp-content/uploads/2020/02/BORN-HERE-LIVE-HERE-DIE-HERE-COVER-Jim-Wright.jpg", title: "some title", blurb: "Stay focused with electronic and trap beats." },
        { img: "https://musicrow.com/wp-content/uploads/2020/02/BORN-HERE-LIVE-HERE-DIE-HERE-COVER-Jim-Wright.jpg", title: "some title", blurb: "Stay focused with electronic and trap beats." },
        { img: "https://musicrow.com/wp-content/uploads/2020/02/BORN-HERE-LIVE-HERE-DIE-HERE-COVER-Jim-Wright.jpg", title: "some title", blurb: "Stay focused with electronic and trap beats." },
    ]
}

type HomeScreenProps = {}

export default function HomeScreen(props: HomeScreenProps) {

  return (
    <ScreenWrapper>
      <HorizontalScrollWrapper heading={"Good evening"}>
        {mockData.recents.map((recent, i) => {
          return (
            <ArtistActionCard key={i} title={recent.title} blurb={recent.blurb} img={recent.img} withoutRightMargin={i === mockData.recents.length - 1}/>
          )
        })}
      </HorizontalScrollWrapper>
      <HorizontalScrollWrapper heading={"Good evening"}>
        {mockData.recents.map((recent, i) => {
          return (
            <ArtistActionCard key={i} title={recent.title} blurb={recent.blurb} img={recent.img} withoutRightMargin={i === mockData.recents.length - 1}/>
          )
        })}
      </HorizontalScrollWrapper>
      <HorizontalScrollWrapper heading={"Good evening"}>
        {mockData.recents.map((recent, i) => {
          return (
            <ArtistActionCard key={i} title={recent.title} blurb={recent.blurb} img={recent.img} withoutRightMargin={i === mockData.recents.length - 1}/>
          )
        })}
      </HorizontalScrollWrapper>
      <HorizontalScrollWrapper heading={"Good evening"}>
        {mockData.recents.map((recent, i) => {
          return (
            <ArtistActionCard key={i} title={recent.title} blurb={recent.blurb} img={recent.img} withoutRightMargin={i === mockData.recents.length - 1}/>
          )
        })}
      </HorizontalScrollWrapper>
    </ScreenWrapper>
  )
}