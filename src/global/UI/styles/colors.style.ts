const baseColors = {
    limeGreen: (a?: number) => `rgba(29, 185, 84, ${a ?? 1})`,
    black: (a?: number) => `rgba(18, 18, 18, ${a ?? 1})`,
    darkGray: (a?: number) => `rgba(33, 33, 33, ${a ?? 1})`,
    lightGray: (a?: number) => `rgba(179, 179, 179, ${a ?? 1})`,
    slateGray: (a?: number) => `rgba(83, 83, 83, ${a ?? 1})`,
}

const textColors = {
    textPrimary: "#fff",
    textSecondary: baseColors.lightGray()
}

const appColors = {
    appBg: baseColors.black,
    lime: baseColors.limeGreen,
    dark: baseColors.darkGray,
    slate: baseColors.slateGray
}

export const colors = {
    ...textColors,
    ...appColors
}