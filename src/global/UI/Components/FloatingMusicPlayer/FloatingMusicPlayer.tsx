import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Pressable, View } from 'react-native'
import styles from "./FloatingMusicPlayer.style";

type Props = {}

export default (props: Props) => {
    return (
        <Pressable style={styles.musicPlayer} onPress={() => alert("HI")} />
    )
}