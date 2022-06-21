import * as Linking from "expo-linking";
import { APIFetcher, AuthUtils, StorageUtils } from ".";
import { URLUtils } from "./UrlUtils";

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

export type BasicSpotifyResponseProps = {
    href: string | null;
    id: string;
    images: SpotifyImg[];
    name: string;
    uri: string;
}

export type SpotifyArtist = BasicSpotifyResponseProps & {
    external_urls: {
        spotify?: string;
    };
    followers: {
        href: null | string;
        total: number;
    };
    genres: string[];
    type: "artist";
}

export type SpotifyAlbum = BasicSpotifyResponseProps & {
    album_type: string;
    total_tracks: number;
    tracks: SpotifyItemsResponse<SpotifyTrack>;
    release_date: string;
    type: "album";
    album_group: string;
    artists: Omit<SpotifyArtist, "followers">[];
}

export type SpotifyTrack = BasicSpotifyResponseProps & {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: { [key: string]: string };
    is_playable: boolean;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
}

export type SpotifyPlaylist = BasicSpotifyResponseProps & {
    description: string | null;
    owner: { id: string; };
    public: boolean;
    followers: { total: number };
    tracks: {
        items: { track: SpotifyTrack }[];
        /* url to next page of items */
        next: string | null;
        /* url to prev page of items */
        previous: string | null;
    };
}

export type SpotifyUser = Omit<BasicSpotifyResponseProps, "name"> & {
    display_name: string;
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

    public static getArtistTopTracks = async (artistId: string) => {
        return new Promise<{ tracks: SpotifyTrack[] }>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<{ tracks: SpotifyTrack[] }>(`${APIFetcher.SpotifyAPIDomain}/artists/${artistId}/top-tracks?market=us`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getArtistRelatedArtists = async (artistId: string) => {
        return new Promise<{ artists: SpotifyArtist[] }>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<{ artists: SpotifyArtist[] }>(`${APIFetcher.SpotifyAPIDomain}/artists/${artistId}/related-artists`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getArtistAlbums = async (artistId: string) => {
        return new Promise<SpotifyItemsResponse<SpotifyAlbum>>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyItemsResponse<SpotifyAlbum>>(`${APIFetcher.SpotifyAPIDomain}/artists/${artistId}/albums?limit=5`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getAlbum = async (albumId: string) => {
        return new Promise<SpotifyAlbum>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyAlbum>(`${APIFetcher.SpotifyAPIDomain}/albums/${albumId}`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getSeveralArtists = async (artistIds: string[]) => {
        return new Promise<SpotifyArtist[]>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<{ artists: SpotifyArtist[] }>(`${APIFetcher.SpotifyAPIDomain}/artists?ids=${artistIds?.join(",")}`);

                resolve(res.artists);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getUserPlaylists = (params?: { limit?: number }) => {
        const { limit } = params ?? {};

        const url = URLUtils.getUrlWithParams(`${APIFetcher.SpotifyAPIDomain}/me/playlists`, [{ param: "limit", value: limit?.toString() }])
        console.log(url);

        return new Promise<SpotifyPlaylist[]>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyItemsResponse<SpotifyPlaylist>>(url);

                resolve(res.items);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getPlaylistCoverImg = (playlistId: string) => {
        return new Promise<SpotifyImg[]>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyImg[]>(`${APIFetcher.SpotifyAPIDomain}/playlists/${playlistId}`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getPlaylist = (playlistId: string) => {
        return new Promise<SpotifyPlaylist>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyPlaylist>(`${APIFetcher.SpotifyAPIDomain}/playlists/${playlistId}`);

                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }

    public static getUser = (userId: string) => {
        return new Promise<SpotifyUser>(async (resolve, reject) => {
            try {
                const res = await APIFetcher.get<SpotifyUser>(`${APIFetcher.SpotifyAPIDomain}/users/${userId}`);

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