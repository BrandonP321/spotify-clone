import * as Linking from "expo-linking";
import { APIFetcher, AuthUtils, StorageUtils } from ".";

type SpotifyItemsResponse<T extends {}> = {
    items: T[];
    /* Number of items that could be returned, not the number actually returned */
    total: number;
    offset: number;
    limit: number;
}

type SpotifyImg = {
    width: number;
    height: number;
    url: string;
}

export type SpotifyArtist = {
    external_urls: {
        spotify?: string;
    };
    followers: {
        href: null | string;
        total: number;
    };
    genres: string[];
    href: string | null;
    id: string;
    images: SpotifyImg[];
    name: string;
    type: "artist";
    uri: string;
}

export class SpotifyFetcher {
    private static APIDomain = ""

    public static getTopArtists = async () => {
        return new Promise<SpotifyItemsResponse<SpotifyArtist>>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyItemsResponse<SpotifyArtist>>(`${APIFetcher.SpotifyAPIDomain}/me/top/artists?limit=10`);

                resolve(res);
            } catch (err) {
                reject(err)
            }
        })
    }

    public static getArtist = async (artistId: string) => {
        return new Promise<SpotifyArtist>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyArtist>(`${APIFetcher.SpotifyAPIDomain}/artists/${artistId}`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getTokens = async (authCode: string) => {
        const redirectURI = Linking.createURL("");

        return new Promise<{ access_token: string; refresh_token: string }>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.post<{ access_token: string; refresh_token: string }>(
                    `${APIFetcher.APIDomain}/spotify/auth/tokens`,
                    { authCode, redirectURI }
                )

                resolve(res)
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getRefreshedToken = async () => {
        const refreshToken = await StorageUtils.getSecureItemAsync("refreshToken");

        // if no refresh token found, have user re-auth
        if (!refreshToken) {
            AuthUtils.haveUserAuth();
        } else {

            return new Promise<{ accessToken: string }>(async (resolve, reject) => {
                try {
                    const res = await APIFetcher.post<{ accessToken: string }>(
                        `${APIFetcher.APIDomain}/spotify/token/refresh`,
                        { refreshToken }
                    )

                    resolve(res);
                } catch (err) {
                    reject(err);
                }
            })
        }
    }
}