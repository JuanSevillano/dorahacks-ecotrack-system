import { useMemo } from "react";
import { ThemeMode } from "./theme-context";
import { createTheme, responsiveFontSizes } from "@mui/material";
// Colores primarios del diseño
const primaryColor = '#17cf54';
const darkBackground = '#112116';
const lightBackground = '#f6f8f6';

export const useMainTheme = (mode?: ThemeMode) => {
    const mainTheme = useMemo(() => {
        const theme = createTheme({
            palette: {
                primary: {
                    main: primaryColor,
                },
                background: {
                    default: mode === 'dark' ? darkBackground : lightBackground,
                    paper: mode === 'dark' ? darkBackground : lightBackground,
                },
                text: {
                    primary: mode === 'dark' ? '#e2e8f0' : '#1a202c',
                    secondary: mode === 'dark' ? '#94a3b8' : '#4a5568',
                },
                mode: mode,
            },
            typography: {
                fontFamily: '"Manrope", "Helvetica", "Arial", sans-serif',
                h1: {
                    fontWeight: 800,
                },
                h2: {
                    fontWeight: 700,
                },
                h3: {
                    fontWeight: 700,
                },
                button: {
                    fontWeight: 700,
                    textTransform: 'none',
                },
            },
            shape: {
                borderRadius: 12,
            },
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            boxShadow: 'none',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                boxShadow: 'none',
                                transform: 'scale(1.05)',
                            },
                        },
                        containedPrimary: {
                            color: mode === 'dark' ? darkBackground : lightBackground,
                            fontWeight: 'bold',
                        },
                    },
                },
            },
        });
        return responsiveFontSizes(theme);
    }, [mode]);
    return mainTheme;
}