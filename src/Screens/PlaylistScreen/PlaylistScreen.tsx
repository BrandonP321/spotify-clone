import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ScreenProps } from '../../global/Navigation/Screens'
import { AppHeading, AppText } from '../../global/UI/Components/AppText/AppText';
import CoverImgScreenWrapper from '../../global/UI/Components/CoverImgScreen/CoverImgScreenWrapper';
import { topContentHeight } from '../../global/UI/Components/CoverImgScreen/CoverImgScreenWrapper.style';
import { PlayIconBtn } from '../../global/UI/Components/PlayBtn/PlayIconBtn';
import { SongListItem } from '../../global/UI/Components/SongListItem/ImageListItem';
import { SpotifyFetcher, SpotifyPlaylist, SpotifyUser } from '../../utils';
import styles from "./PlaylistScreen.style";

type PlaylistScreenProps = ScreenProps<"Playlist">;

export default function PlaylistScreen({ navigation, route }: PlaylistScreenProps) {
    const { playlistId } = route.params;

    const scrollOffset = useSharedValue(0);

    const [data, setData] = useState<SpotifyPlaylist | null>(null);
    const [owner, setOwner] = useState<SpotifyUser | null>(null);
    const [albumTitleHeight, setAlbumTitleHeight] = useState(0);
    const playlistTitleEle = React.createRef<Text>();

    useFocusEffect(useCallback(() => {
        SpotifyFetcher.getPlaylist(playlistId).then(res => {
            setData(res);

            SpotifyFetcher.getUser(res?.owner?.id).then(setOwner);
        });

        return () => {
            setData(null);
        }
    }, [playlistId]));

    useEffect(() => {
        /* After content loads, get height of album title text */
        playlistTitleEle.current?.measure((x, y, w, h) => {
            setAlbumTitleHeight(h);
        });
    }, [data])

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

    const numbFollowers = data?.followers?.total ?? 0;

    return (
        <>
            <PlayBtn fixedIcon />

            <CoverImgScreenWrapper
                scrollOffset={scrollOffset}
                headerTitle={data?.name}
                coverImg={data?.images?.[0]?.url}
                loading={!data ?? !owner}
            >
                <PlayBtn />

                <View>
                    <AppHeading ref={playlistTitleEle} style={styles.title}>{data?.name}</AppHeading>

                    <View style={styles.userWrapper}>
                        <Image source={{ uri: owner?.images?.[0]?.url }} style={styles.userImg} />
                        <AppText style={styles.userName}>{owner?.display_name}</AppText>
                    </View>

                    <AppText style={styles.followers}>{`${numbFollowers} ${numbFollowers === 1 ? "follower" : "followers"}`}</AppText>

                    {data?.tracks?.items?.map(({ track }, i) => {
                        return (
                            <SongListItem
                                key={i}
                                title={track.name}
                                subtitle={track.artists?.map(a => a.name)?.join(", ")}
                                song={track}
                                allSongsInQueue={data.tracks.items?.map(item => item.track)}
                                image={track.album?.images?.[0]?.url}
                                styles={{
                                    textWrapper: {
                                        flexGrow: 1
                                    }
                                }}
                            />
                        )
                    })}
                </View>

            </CoverImgScreenWrapper>
        </>
    )
}