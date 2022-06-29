import AsyncStorage from "@react-native-async-storage/async-storage";
import {setItemAsync as setSecureItem, getItemAsync as getSecureItem} from "expo-secure-store";
import { AllStorageKeys, AsyncStorageTypes, SecureAsyncStorageTypes, ValidSecureStorageKey, ValidAsyncStorageKey } from "./StorageValues";

export class StorageUtils {
    private static storeItem(key: ValidSecureStorageKey, value: SecureAsyncStorageTypes[typeof key], secure: boolean): Promise<boolean>
    private static storeItem(key: ValidAsyncStorageKey, value: AsyncStorageTypes[typeof key]): Promise<boolean>
    private static storeItem(key: ValidSecureStorageKey | ValidAsyncStorageKey, value: any, secure?: boolean) {
        return new Promise<boolean>(async (resolve, reject: (reason: boolean) => void) => {
            try {
                const stringifyItem = AllStorageKeys[key].parse

                // stringify the value if it isn't already a string
                const valueToStore = stringifyItem ? JSON.stringify(value) : value;

                // store item based on which storage method was specified
                secure
                    ? await setSecureItem(key, valueToStore)
                    : await AsyncStorage.setItem(key, valueToStore)
                
                resolve(true);
            } catch(err) {
                reject(false)
            }
        })
    }

    private static async getItem(key: ValidAsyncStorageKey): Promise<AsyncStorageTypes[typeof key] | null>;
    private static async getItem(key: ValidSecureStorageKey, secure: boolean): Promise<SecureAsyncStorageTypes[typeof key] | null>;
    private static async getItem(key: ValidSecureStorageKey | ValidAsyncStorageKey, secure?: boolean) {
        try {
            const parseItem = AllStorageKeys[key].parse;
            const item = secure
                ? await getSecureItem(key)
                : await AsyncStorage.getItem(key)
    
            const parsedItem = parseItem && item ? JSON.parse(item) : item;
            return parsedItem;
        } catch(err) {
            return undefined;
        }
    }

    /* sets an item in async storage after encrypting it's value */
    public static setSecureItemAsync(key: ValidSecureStorageKey, value: SecureAsyncStorageTypes[typeof key]) {
        return this.storeItem(key, value, true);
    }

    /* gets encrypted item from storage and returns it's decrypted value */
    public static getSecureItemAsync(key: ValidSecureStorageKey) {
        return this.getItem(key, true);
    }

    /* gets un-encrypted value from storage */
    public static getItemAsync(key: ValidAsyncStorageKey) {
        return this.getItem(key);
    }

    /* sets un-encrypted value in storage */
    public static setItemAsync(key: ValidAsyncStorageKey, value: AsyncStorageTypes[typeof key]) {
        return this.storeItem(key, value);
    }

    /* stores both the access and refresh token */
    public static async setBothTokens(accessToken: string, refreshToken: string) {
        const setAccessToken = await this.setSecureItemAsync("accessToken", accessToken);
        const setRefreshToken = await this.setSecureItemAsync("refreshToken", refreshToken);

        return setAccessToken && setRefreshToken;
    }
}