import { Theme } from "@react-navigation/native/lib/typescript/src/types"
import COLOURS from "./colours"

/*
Initially used Color Module, however below issue arises on Android Only
    Module parse failed: Identifier directly after number (257:26)
    You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
    |               for (const [i, element] of rgb.entries()) {
    |                       const chan = element / 255;
    >                       lum[i] = (chan <= 0.039_28) ? chan / 12.92 : ((chan + 0.055) / 1.055) ** 2.4;
    |               }
    |
*/

export const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: "#FE5738",
        background: "#FAFAFA",
        card: "#FFFFFF",
        text: "#000000",
        border: "#808080",
        notification: "#FE5738"
    }
}

export const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: "#FE5738",
        background: "#000000",
        card: "#111111",
        text: "#FFFFFF",
        border: "transparent",
        notification: "#FE5738"
    }
}

const convertToRgba = (hex: string, alpha: number) => {
    var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export const inactiveTintColor = (color: string): string => {
    return convertToRgba(color, 0.68)
}

//Is based on accent
export const activeBackgroundColor = (): string => {
    return convertToRgba(COLOURS.accent, 0.12)
}
