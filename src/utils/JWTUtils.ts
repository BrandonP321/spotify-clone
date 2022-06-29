import { setAccessToken } from "../global/features/slices/AuthSlice/AuthSlice";
import { store } from "../global/features/store";
import { StorageUtils } from "./StorageUtils";

export class JWTUTils {
    /* Stores access token in both async storage and redux store */
    public static storeAccessToken = async (token?: string) => {
        if (!token) {
            return false;
        }

        await StorageUtils.setSecureItemAsync("accessToken", token)
        store.dispatch(setAccessToken({ token }))
    }

    /* Stores refresh token in async storage */
    public static storeRefreshToken = async (token?: string) => {
        if (!token) {
            return false;
        }

        await StorageUtils.setSecureItemAsync("refreshToken", token);
    }

    /* Stores both access and refresh token */
    public static storeBothTokens = async (accessToken: string, refreshToken: string) => {
        await this.storeAccessToken(accessToken);
        await this.storeRefreshToken(refreshToken);
    }
}