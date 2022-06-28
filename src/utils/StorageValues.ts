/**
 * Storage keys and types for async storage on user's mobile device, this includes keys for encrypted values.
 * 'key' property of objects within AsyncStorageKeys and SecureAsyncStorageKeys MUST be the same as it's key
 */

/* async storage keys and whether or not they need to be parsed before/after storage */
export const AsyncStorageKeys = {
    currentAPIScope: { key: "currentAPIScope", parse: false }
} as const;

/* types of values not encrypted before being stored */
export type AsyncStorageTypes = {
    [AsyncStorageKeys.currentAPIScope.key]: string;
}

/* secure async storage keys and whether or not they need to be parsed before/after storage */
export const SecureAsyncStorageKeys = {
    accessToken: { key: "accessToken", parse: false },
    refreshToken: { key: "refreshToken", parse: false },
    testStore: { key: "testStore", parse: false },
} as const;

/* types of values that are encrypted before being stored */
export type SecureAsyncStorageTypes = {
    [SecureAsyncStorageKeys.accessToken.key]: string
    [SecureAsyncStorageKeys.refreshToken.key]: string;
    [SecureAsyncStorageKeys.testStore.key]: string;
}

export const AllStorageKeys = {
    ...AsyncStorageKeys,
    ...SecureAsyncStorageKeys
} as const

/* Valid keys that contain an encrypted value */
export type ValidSecureStorageKey = keyof SecureAsyncStorageTypes;
/* Valid keys that contain a non-encrypted value */
export type ValidAsyncStorageKey = keyof typeof AsyncStorageKeys;