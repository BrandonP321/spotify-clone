import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { JWTUTils, SpotifyFetcher, StorageUtils } from ".";

export class AuthUtils {
    private static requiredScope = "user-read-private%20user-read-email%20user-top-read%20playlist-read-private%20user-read-recently-played%20user-library-read";

    public static validateUserAuth = async () => {
        // attempt to grab tokens from storage
        const aToken = await StorageUtils.getSecureItemAsync("accessToken");
        const rToken = await StorageUtils.getSecureItemAsync("refreshToken");
        // current scope required from Spotify web API
        const currentScope = await StorageUtils.getItemAsync("currentAPIScope");

        // if no tokens found or user doesn't have appropriate scope for spotify api, have user re-auth
        if (!aToken || !rToken || currentScope !== this.requiredScope) {
            return this.haveUserAuth();
        } else {
            // else refresh access token on initial app load
            return SpotifyFetcher.getRefreshedToken().then(res => {
                JWTUTils.storeAccessToken(res?.accessToken);
            }).catch(err => {
                // if any error occurred, have user re-auth
                this.haveUserAuth();
            })
        }
    }

    public static haveUserAuth = async () => {
        // open auth window to have user sign in, which returns the spotify auth code
        const authCode = await this.openAuthWindow();

        if (authCode) {
            try {
                // get & store jwt's from spotify
                const tokens = await SpotifyFetcher.getTokens(authCode);

                await JWTUTils.storeBothTokens(tokens.access_token, tokens.refresh_token);
                StorageUtils.setItemAsync("currentAPIScope", this.requiredScope);
            } catch (err) {
                console.log(err);
            }
        }
    }

    /** Opens auth window to Spotify's auth page, returning user's Auth code */
    public static openAuthWindow = async () => {
        // spotify client id
        const clientId = "13786cced89e4dba9de0f15126c86c1f";
        // redirect uri for app home screen
        const redirectURI = Linking.createURL("");  
        
        type BrowserResponse = WebBrowser.WebBrowserAuthSessionResult & { url?: string };

        const { url } = await WebBrowser.openAuthSessionAsync(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${this.requiredScope}&redirect_uri=${redirectURI}`, redirectURI) as BrowserResponse;

        return this.getAuthCodeFromUrl(url);
    }

    public static getAuthCodeFromUrl = (url?: string) => {
        return url ? new URL(url)?.searchParams?.get("code") : undefined
    }
}