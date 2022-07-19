import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppDispatch, useMusicPlayer } from '../../../features/hooks';
import { uiBase } from '../../styles/uiBase.style';
import { AppHeading, AppText } from '../AppText/AppText';
import styles from "./FloatingMusicPlayer.style";
import PlayIcon from "../../../../../assets/play-solid.svg";
import PauseIcon from "../../../../../assets/pause-solid.svg";
import { pauseSong, playNextSong, playPrevSong, resumeSong } from '../../../features/slices/MusicPlayerSlice/musicPlayerSlice';
import MusicPlayerModal from '../MusicPlayerModal/MusicPlayerModal';
import { HandlerStateChangeEvent } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

type Props = {}

/**
 * Floating bar at the bottom of the screen with the song being played
 */
export default (props: Props) => {
    const dispatch = useAppDispatch();

    const player = useMusicPlayer();
    const animBottomPosition = useSharedValue(uiBase.heights.floatingMusicPlayerHeight * -1);
    const [showPlayerModal, setShowPlayerModal] = useState(false);

    useEffect(() => {
        /* Animated player in from bottom of screen when song has been chosen to play */
        animBottomPosition.value = withTiming(player.currentSong ? uiBase.heights.tabBarHeight : uiBase.heights.floatingMusicPlayerHeight * -1, {
            duration: 250,
        })
    }, [player.currentSong, player.currentSong?.id]);

    /** Toggles display status of music player modal */
    const togglePlayerModal = useCallback(() => {
        setShowPlayerModal(!showPlayerModal);
    }, [showPlayerModal])

    /* Toggles play/pause state of song */
    const togglePlayState = useCallback(() => {
        dispatch(player.isPaused ? resumeSong() : pauseSong());
    }, [player.isPaused])

    const animStyles = useAnimatedStyle(() => ({
        bottom: animBottomPosition.value
    }))

    const {
        albumImg, artist, title, id: songId
    } = player.currentSong ?? {};

    // icon to be displayed based on whether song is paused or not
    const PlayStateIcon = player.isPaused ? PlayIcon : PauseIcon;

    // play next or previous song based on direction user swipes
    const handleSwipe = (e: HandlerStateChangeEvent<Record<string, unknown>>) => {
        const deltaY = e.nativeEvent.translationY as number;
        const deltaX = e.nativeEvent.translationX as number;
        
        // only perform actions if user swiped horizontally
        if (Math.abs(deltaY) <= 50) {
            if (deltaX >= 20) {
                dispatch(playPrevSong())
            } else if (deltaX <= -20) {
                dispatch(playNextSong())
            }
        }
    }

    return (
        <>
            <MusicPlayerModal show={showPlayerModal} hide={() => setShowPlayerModal(false)}/>

            <Animated.View style={[styles.playerWrapper, animStyles]}>
                <Swipeable onEnded={handleSwipe}>
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
                </Swipeable>
            </Animated.View>
        </>
    )
}