import { deleteItemAsync } from 'expo-secure-store';
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import ScreenWrapper from '../../global/Components/ScreenWrapper/ScreenWrapper'
import { ScreenProps } from '../../global/Navigation/Screens'
import { uiBase } from '../../global/UI/styles/uiBase.style';
import { AuthUtils } from '../../utils';

type AuthLoadingScreenProps = ScreenProps<"AuthLoading">;

export default function AuthLoadingScreen(props: AuthLoadingScreenProps) {
    useEffect(() => {
        // TODO: remove this code when done testing auth flow
        deleteItemAsync("accessToken").then(() => deleteItemAsync("refreshToken").then(() => {
            AuthUtils.validateUserAuth().then(res => {
                // navigate to home page
                props.navigation.navigate("Home", {});
            }).catch(err => {
                console.log("err", err);
            })
        }))
    }, [])

    return (
        <ScreenWrapper>
            <Text style={{ color: uiBase.colors.textPrimary, fontSize: 50 }}>LOADING</Text>
        </ScreenWrapper>
    )
}