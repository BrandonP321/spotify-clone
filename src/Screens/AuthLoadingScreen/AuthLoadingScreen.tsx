import { deleteItemAsync } from 'expo-secure-store';
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import { uiBase } from '../../global/UI/styles/uiBase.style';
import { AuthUtils } from '../../utils';

type AuthLoadingScreenProps = {}

export default function AuthLoadingScreen(props: AuthLoadingScreenProps) {
    useEffect(() => {
            AuthUtils.validateUserAuth().then(res => {

            }).catch(err => {
                console.log("err", err);
            })
    }, [])

    return (
        <ScreenWrapper>
            <Text style={{ color: uiBase.colors.textPrimary, fontSize: 50 }}>LOADING</Text>
        </ScreenWrapper>
    )
}