export enum Themes {
    DARK = 'darkTheme',
    LIGHT = 'lightTheme'
}

export const lightTheme = {
    dark: false,
    colors: {
        background: '#e3ffff',
        surface: '#505050',
        primary: '#000552',
        secondary: '#0062ff',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        accent: '#0062ff'
    },
}

export const darkTheme = {
    dark: true,
    colors: {
        background: '#202029',
        surface: '#FFFFFF',
        primary: '#000000',
        secondary: '#505050',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        accent: '#60cecc'
    },
}