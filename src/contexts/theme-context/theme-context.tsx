import { ThemeProvider, createTheme as materialCreateTheme, THEME_ID } from '@mui/material/styles';


const materialTheme = materialCreateTheme({
    defaultColorScheme: 'dark',
    typography: {
        h1: {
            color: '#333333ff',
        },
        h6: {
            width: '100%',
            textAlign: 'center',
            color: '#333333ff',
        },
        body1: {
            color: '#505050ff',
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
            paper: '#6dc759ff',
            default: '#fbfff4ff',
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

            }
        },
    },

});

export const UIThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={{ [THEME_ID]: materialTheme, mode: 'dark' }}>
            {children}
        </ThemeProvider>
    )
}
