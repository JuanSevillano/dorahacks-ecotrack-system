import ConnectButton from '../../ConnectButton';
import {
    IconButton,
    Switch,
    Toolbar,
    AppBar,
    Typography,
    Box,
    Link
} from '@mui/material';
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material'; // Iconos opcionales
import { ThemeContextType } from '../../../contexts/theme-context/theme-context';
import { useAppTheme } from '../../../contexts/theme-context/hook';
import Logo from '../../../assets/logo.png'
import { appData } from '../../data/appData';
import * as styles from './AppBar.css'
import { useNavigate } from 'react-router-dom';

export function ThemeSwitch({ mode, toggleTheme }: ThemeContextType) {
    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <LightMode sx={{ fontSize: 20, color: mode === 'dark' ? 'grey.400' : 'warning.main' }} />
            <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                name="themeSwitch"
                color="default"
                size="medium"
            />
            <DarkMode sx={{ fontSize: 20, color: mode === 'dark' ? 'primary.main' : 'grey.400' }} />
        </Box>
    )
}

export const AppToolbar = () => {
    const { mode, toggleTheme } = useAppTheme() ?? {};
    const navigate = useNavigate();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: '100%',
                background: 'transparent',
                backdropFilter: 'blur(3px)'
            }}>
            <Toolbar className={styles.Toolbar}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, py: 2 }}>
                    <img className={styles.Logo} src={Logo} alt='Verde cap logo' />
                    <Typography
                        variant='h5'
                        align='left'
                        letterSpacing={0.5}
                        fontStyle='italic'
                        color={mode === 'dark' ? '#fff' : '#000'}
                        fontWeight={700}>VerdeCap</Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                    {appData.navLinks.map((link) => (
                        <Link
                            key={link.title}
                            onClick={() => navigate(link.url)}
                            color="inherit"
                            underline="none"
                            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                            {link.title}
                        </Link>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {mode && toggleTheme && <ThemeSwitch mode={mode} toggleTheme={toggleTheme} />}
                    <ConnectButton />
                    <IconButton sx={{ display: { md: 'none' } }} color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    );
};