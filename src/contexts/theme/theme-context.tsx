import { ThemeProvider, createTheme as materialCreateTheme, THEME_ID } from '@mui/material/styles';


const materialTheme = materialCreateTheme({
    defaultColorScheme: 'dark',
    typography: {
        h1: {
            color: '#fff',
        },
        h6: {
            width: '100%',
            textAlign: 'center',
            color: 'rgb(255,255,255)',
        },
        body1: {
            color: 'rgb(180,180,180)',
        }
    },
    palette: {
        text: {
            secondary: '#rgb(180,180,180)',
            primary: '#rgb(180,180,180)',
        },
        common: {
            white: '#fff',
            black: '#000',
        },
        background: {
            default: '#111',
            paper: '#333',
        },
        primary: {
            main: '#fff',
            dark: 'rgb(220,220,220)',
            light: 'rgb(240,240,240)',
        },
        secondary: {
            main: 'rgb(150,150,150)',
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
                square: true
            }
        }
    },

});

export const UIThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={{ [THEME_ID]: materialTheme, mode: 'dark' }}>
            {children}
        </ThemeProvider>
    )
}
