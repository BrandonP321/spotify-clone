import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppDispatch, useMusicPlayer, useUserAuth } from '../../../features/hooks';
import { uiBase } from '../../styles/uiBase.style';
import { AppHeading, AppText } from '../AppText/AppText';
import styles from "./FloatingMusicPlayer.style";
import PlayIcon from "../../../../../assets/play-solid.svg";
import PauseIcon from "../../../../../assets/pause-solid.svg";
import { pauseSong, resumeSong } from '../../../features/slices/MusicPlayerSlice/musicPlayerSlice';
import MusicPlayerModal from '../MusicPlayerModal/MusicPlayerModal';

type Props = {}

export default (props: Props) => {
    const dispatch = useAppDispatch();

    const player = useMusicPlayer();
    const animBottomPosition = useSharedValue(uiBase.heights.floatingMusicPlayerHeight * -1);
    const [showPlayerModal, setShowPlayerModal] = useState(false);

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        /* Animated player in from bottom of screen when song has been chosen to play */
        animBottomPosition.value = withTiming(player.currentSong ? uiBase.heights.tabBarHeight : uiBase.heights.floatingMusicPlayerHeight * -1, {
            duration: 250,
        })
    }, [player.currentSong, player.currentSong?.id]);

    const togglePlayerModal = useCallback(() => {
        setShowPlayerModal(!showPlayerModal);
    }, [showPlayerModal])

    const togglePlayState = useCallback(() => {
        dispatch(player.isPaused ? resumeSong() : pauseSong());
    }, [player.isPaused])

    const animStyles = useAnimatedStyle(() => ({
        bottom: animBottomPosition.value
    }))

    const {
        albumImg, artist, title, id: songId
    } = player.currentSong ?? {};

    const PlayStateIcon = player.isPaused ? PlayIcon : PauseIcon;

    return (
        <>
            <MusicPlayerModal show={showPlayerModal} hide={() => setShowPlayerModal(false)}/>

            <Animated.View style={[styles.playerWrapper, animStyles]}>
                <Pressable style={[styles.musicPlayer]} onPress={togglePlayerModal}>
                    <Image source={{ uri: albumImg }} style={styles.image}/>
                    <View style={styles.textWrapper}>
                        <AppHeading style={styles.title} numberOfLines={1}>{title}</AppHeading>
                        <AppText style={styles.artist} numberOfLines={1}>{artist}</AppText>
                    </View>
                    <Pressable style={styles.playIconWrapper} onPress={togglePlayState}>
                        <PlayStateIcon style={styles.playIcon} fill={uiBase.colors.textPrimary}/>
                    </Pressable>
                </Pressable>
            </Animated.View>
        </>
    )
}