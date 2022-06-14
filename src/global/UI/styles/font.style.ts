import React from "react";

export const fontSize = {
    heading: 18,
}

export const primaryFamily = {
    light: "Poppins_300Light",
    regular: "Poppins_500Medium",
    semiBold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold"
} as const;

export const fonts = {
    fontSize,
    fontFamilies: {
        primary: primaryFamily
    }
}