import ConnectButton from '../../ConnectButton';
import {
    IconButton,
    Toolbar,
    AppBar,
    Typography,
    Box,
    Link,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material'; // Iconos opcionales
import { useAppTheme } from '../../../contexts/theme-context/hook';
import Logo from '../../../assets/logo.png'
import { appData } from '../../data/appData';
import * as styles from './AppBar.css'
import { useNavigate } from 'react-router-dom';
import { LanguageSwitch } from './LanguageSwitch';
import { ThemeSwitch } from './ThemeSwitch';
import { isDefined } from '../../../utils';

export const AppToolbar = () => {
    const navigate = useNavigate();
    const { mode, toggleTheme, isTransitioning, transitionDirection } = useAppTheme() ?? {};

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
                    <LanguageSwitch />
                    {mode && toggleTheme && <ThemeSwitch
                        transitionDirection={!isDefined(transitionDirection) ? 'light-to-dark' : transitionDirection}
                        isTransitioning={Boolean(isTransitioning)}
                        mode={mode}
                        toggleTheme={toggleTheme} />
                    }
                    <ConnectButton />
                    <IconButton sx={{ display: { md: 'none' } }} color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar >
    );
};