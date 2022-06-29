import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { SpotifyFetcher, StorageUtils } from ".";
import { JWTUTils } from "./JWTUtils";

export class APIFetcher {
    // TODO: use different values based on environment
    // public static APIDomain = "http://10.0.0.253:8000";
    public static APIDomain = "https://brandonp-spotify-server.herokuapp.com";
    // public static APIDomain = "http://192.168.1.250:8000";
    public static SpotifyAPIDomain = "https://api.spotify.com/v1"

    public static get = async <T extends {}>(url: string, config?: AxiosRequestConfig) => {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const response = await axios.get<T>(url, await this.extendDefaultConfig(config))
    
                return resolve(response?.data);
            } catch (err: any) {
                const status = err?.response?.data?.error?.status;
    
                // 401 status means access token is expired
                if (status === 401) {
                    // make request to refresh token
                    try {
                        const newToken = await SpotifyFetcher.getRefreshedToken();
                        if (!newToken) {
                            return reject(err);
                        }
    
                        // assuming token refresh was successful, store new Tokens;
                        const { accessToken } = newToken;
                        await JWTUTils.storeAccessToken(accessToken);

                        // make axios request again now that token is refreshed
                        return axios.get<T>(url, config);
                    } catch (err) {
                        return reject(err);
                    }
                }
    
                return reject(err as AxiosError<any, any>)
            }
        })
    }

    public static post = <T extends {}>(url: string, body: { [key: string]: string }, config?: AxiosRequestConfig) => {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const response = await axios.post<T>(url, body, await this.extendDefaultConfig(config))
    
                resolve(response?.data);
            } catch (err: any) {

                // 401 status means access token is expired
                if (err.status === 401) {
                    // make request to refresh token
                    try {
                        const newTokens = await SpotifyFetcher.getRefreshedToken();

                        // assuming token refresh was successful, store new Tokens;

                    } catch (err) {
                        return reject(err);
                    }
                }

                reject(err as AxiosError<any, any>)
            }
        })
    }

    private static extendDefaultConfig: (configArg?: AxiosRequestConfig) => Promise<AxiosRequestConfig> = async (configArg) => {
        const config = configArg ?? {};

        const aToken = await StorageUtils.getSecureItemAsync("accessToken")

        return {
            ...config,
            headers: {
                // TODO: use token from redux store instead of async storage
                Authorization: `Bearer ${aToken}`,
                ...(config.headers ?? {})
            }
        }
    }
}