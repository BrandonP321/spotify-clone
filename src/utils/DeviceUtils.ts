import * as Device from "expo-device";

export class DeviceUtils {
    public static get Android() { return Device.osName === "Android" };
    public static get IOS() { return Device.osName && ({ iOS: true, iPadOS: true })[Device.osName] };
}