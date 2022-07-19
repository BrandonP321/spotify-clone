import * as Device from "expo-device";

export class DeviceUtils {
    // true if user is using android device
    public static get Android() { return Device.osName === "Android" };
    // true if user is using ios device
    public static get IOS() { return Device.osName && ({ iOS: true, iPadOS: true })[Device.osName] };
}