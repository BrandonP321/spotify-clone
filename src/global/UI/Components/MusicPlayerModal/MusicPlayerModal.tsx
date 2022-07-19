import React, { useCallback, useEffect, useRef, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch, useMusicPlayer } from '../../../features/hooks';
import styles, { modalInnerWidth } from "./MusicPlayerModal.style";
import { uiBase } from '../../styles/uiBase.style';
import { Image, Pressable, View, Text, BackHandler } from 'react-native';
import { ScreenUtils } from '../../../../utils/ScreenUtils';
import DownChevron from "../../../../../assets/chevron-down-solid.svg";
import NextSongIcon from "../../../../../assets/forward-step-solid.svg";
import PrevSongIcon from "../../../../../assets/backward-step-solid.svg";
import PlayIcon from "../../../../../assets/play-solid.svg";
import PauseIcon from "../../../../../assets/pause-solid.svg";
import { AppHeading, AppText } from '../AppText/AppText';
import { pauseSong, playNextSong, playPrevSong, resumeSong, SongContext } from '../../../features/slices/MusicPlayerSlice/musicPlayerSlice';
import { useAppNavigation } from '../../../../utils/NavigationHelper';
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { HandlerStateChangeEvent, Swipeable } from 'react-native-gesture-handler';

type MusicPlayerModalProps = {
    show: boolean;
    hide: () => void;
}

/**
 * Music Player modal with controls for interacting with the song that is currently being played
 */
export default function MusicPlayerModal(props: MusicPlayerModalProps) {
    const { show, hide } = props;

    const player = useMusicPlayer();

    const modalTopPosition = useSharedValue(ScreenUtils.vh);

    /* status of overlay covering album image for song */
    const [showModalOverlay, setShowModalOverlay] = useState(true);

    /* When user presses native android back btn, close modal if open */
    const onBackPress = useCallback(() => {
        hide();

        return true
    }, [])

    useEffect(() => {
        // hide or show modal with animation depending on the status of the modal
        modalTopPosition.value = withTiming(show ? 0 : ScreenUtils.vh, {
            duration: 300,
        })

        if (show) {
            // when modal is visible, add custom behavior to android back btn to close modal
            BackHandler.addEventListener("hardwareBackPress", onBackPress);
        } else {
            // else remove listener
            BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }
    }, [show])

    const animStyles = useAnimatedStyle(() => ({
        top: modalTopPosition.value,
    }))

    const {
        albumImg, artist, id, title, context
    } = player.currentSong ?? {};

    return (
        <Animated.View style={[styles.modal, animStyles]}>
            <PlayerModalOverlay showOverlay={showModalOverlay} toggleOverlay={() => setShowModalOverlay(!showModalOverlay)} hideModal={hide} songContext={player.currentSong?.context}>
                <AppHeading style={styles.title}>{title}</AppHeading>
                <AppText style={styles.artists}>{artist}</AppText>

                <SongControls/>
                
            </PlayerModalOverlay>

            <LinearGradient colors={[uiBase.colors.slate(1), uiBase.colors.dark(1)]} style={styles.gradientBg}/>

            <Image source={{ uri: albumImg }} style={[styles.albumImg]}/>
        </Animated.View>
    )
}

type PlayerModalOverlayProps = {
    children?: React.ReactChild[];
    showOverlay: boolean;
    toggleOverlay: () => void;
    hideModal: () => void;
    songContext?: SongContext;
}

/**
 * Semi-transparent overlay covering album image for song
 */
const PlayerModalOverlay = (props: PlayerModalOverlayProps) => {
    const { children, toggleOverlay, showOverlay, hideModal, songContext } = props;

    const dispatch = useAppDispatch();

    const overlayOpacity = useSharedValue(1);
    const swipOffset = useSharedValue(0);

    useEffect(() => {
        overlayOpacity.value = withTiming(showOverlay ? 1 : 0, {
            duration: 300
        })
    }, [showOverlay])

    const animStyles = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value
    }))
    
    // play next or previous song based on direction user swipes
    const handleSwipe = (e: HandlerStateChangeEvent<Record<string, unknown>>) => {
        const deltaY = e.nativeEvent.translationY as number;
        const deltaX = e.nativeEvent.translationX as number;
        
        // only perform actions if user swiped horizontally
        if (Math.abs(deltaY) <= 50) {
            if (deltaX >= 75) {
                dispatch(playPrevSong())
            } else if (deltaX <= -75) {
                dispatch(playNextSong())
            }
        }
    }

    return (
        <Swipeable 
            childrenContainerStyle={styles.swipeableOverlay} 
            containerStyle={styles.swipeableOverlay} 
            onEnded={handleSwipe}
        >
            <Animated.View style={[styles.overlayWrapper, animStyles]}>
                <PlayerModalHeader hideModal={hideModal} songContext={songContext}/>
                <Pressable style={styles.overlay} onPress={toggleOverlay}/>
                <View pointerEvents={showOverlay ? "auto" : "none"} style={styles.overlayChildren}>
                    {children}
                </View>
            </Animated.View>
        </Swipeable>
    )
}

type SongControlsProps = {

}

const SongControls = (props: SongControlsProps) => {
    const dispatch = useAppDispatch();

    const { currentSong, isPaused } = useMusicPlayer();

    const [currentTimePosition, setCurrentTimePositionState] = useState(0);
    const currentTimePositionRef = useRef<number>(0);
    const setCurrentTimePosition = (value: number) => {
        setCurrentTimePositionState(value);
        currentTimePositionRef.current = value;
    }

    const progressInterval = useRef<NodeJS.Timer | null>(null);

    const duration = 250;

    useEffect(() => {
        if (currentSong?.id) {
            setCurrentTimePosition(0);
            startNewProgressInterval();
        }
    }, [currentSong?.id])

    useEffect(() => {
        if (isPaused) {
            endInterval();
        } else {
            resumeInterval();
        }
    }, [isPaused])

    const startNewProgressInterval = () => {
        // clear any existing interval
        endInterval();

        progressInterval.current = setInterval(() => {
            setCurrentTimePosition(currentTimePositionRef.current + 1);

            if (currentTimePositionRef.current === duration) {
                endInterval();
                goToNextSong();
            }
        }, 1000)
    };

    const endInterval = () => {
        progressInterval.current && clearInterval(progressInterval.current);
    }

    const resumeInterval = () => {
        startNewProgressInterval();
    }

    const goToNextSong = () => {
        dispatch(playNextSong());
    }

    const goToPrevSong = () => {
        dispatch(playPrevSong());
    }

    const getTimeStringFromSeconds = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - (minutes * 60);

        return `${minutes}:${seconds <= 9 ? `0${seconds}` : seconds}`;
    }

    const handleSliderChange = (value: number) => {
        setCurrentTimePosition(value);
    }

    const handlePlayBtnPress = () => {
        dispatch(isPaused ? resumeSong() : pauseSong());
    }

    const PlayStateIcon = isPaused ? PlayIcon : PauseIcon;

    return (
        <>
            <MultiSlider 
                sliderLength={modalInnerWidth} 
                trackStyle={styles.progressTrack} 
                markerStyle={styles.progressMarker} 
                containerStyle={{ height: 20, marginTop: 20 }}
                selectedStyle={styles.selectedTrack}
                values={[currentTimePosition]}
                min={0}
                max={duration}
                onValuesChange={(v) => handleSliderChange(v[0])}
                onValuesChangeStart={endInterval}
                onValuesChangeFinish={resumeInterval}
            />
            <View style={styles.progressTimes}>
                <Animated.Text style={styles.progressTime} >{getTimeStringFromSeconds(currentTimePosition)}</Animated.Text>
                <Text style={styles.progressTime}>{getTimeStringFromSeconds(duration)}</Text>
            </View>
            <View style={styles.controlsWrapper}>
                <Pressable onPress={goToPrevSong} style={styles.songStepWrapper}>
                    <PrevSongIcon fill={uiBase.colors.textPrimary} style={styles.songStepIcon}/>
                </Pressable>
                <Pressable onPress={handlePlayBtnPress} style={styles.playWrapper}>
                    <PlayStateIcon fill={uiBase.colors.dark(1)} style={[styles.playIcon, isPaused && { marginLeft: 4 }]}/>
                </Pressable>
                <Pressable onPress={goToNextSong} style={styles.songStepWrapper}>
                    <NextSongIcon fill={uiBase.colors.textPrimary} style={styles.songStepIcon}/>
                </Pressable>
            </View>
        </>
    )
}

type PlayerModalHeaderProps = {
    hideModal: () => void;
    songContext?: SongContext;
}

const PlayerModalHeader = (props: PlayerModalHeaderProps) => {
    const navigation = useAppNavigation();

    const getContextData = (context?: SongContext) => {
        return context?.type === "album" && {
            id: context?.albumId, name: context.albumName, songSource: "ALBUM"
        } || context?.type === "artist" && {
            id: context?.artistId, name: context?.artistName, songSource: "ARTIST"
        } || context?.type === "playlist" && {
            id: context?.playlistId, name: context?.playlistName, songSource: "PLAYLIST"
        } || {}
    }

    const songData = getContextData(props.songContext);

    const handleTitlePress = () => {
        if (songData?.id) {
            props.hideModal();

            props.songContext?.type === "album" && navigation.navigate("Album", { albumId: songData?.id });
            props.songContext?.type === "artist" && navigation.navigate("Artist", { artistId: songData?.id });
            props.songContext?.type === "playlist" && navigation.navigate("Playlist", { playlistId: songData?.id });
        }
    }

    const subtitle = `PLAYING FROM ${songData?.songSource}`

    return (
        <View style={styles.header}>
            <Pressable style={styles.backArrowWrapper} onPress={props.hideModal}>
                <DownChevron fill={uiBase.colors.textPrimary} style={styles.backArrow}/>
            </Pressable>

            <Pressable style={[styles.headerTextWrapper, !songData?.songSource && { display: "none" }]}>
                <AppText style={styles.headerSubtitle} numberOfLines={1} onPress={handleTitlePress}>{subtitle}</AppText>
                <AppHeading style={styles.headerTitle} numberOfLines={1} onPress={handleTitlePress}>{songData?.name}</AppHeading>
            </Pressable>
        </View>
    )
}