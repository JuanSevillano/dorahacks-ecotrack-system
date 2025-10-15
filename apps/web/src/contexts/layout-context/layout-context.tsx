import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useMemo, useState } from 'react';
import { Container, CssBaseline, THEME_ID, ThemeProvider, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { mainRoutes } from '../router/main-routes';
import { useAppTheme } from '../theme-context/hook';
import { useMainTheme } from '../theme-context/create-theme';
import { AppToolbar } from '../../components/layout/toolbar/AppBar';

import * as styles from './layout.css';
import Footer from '../../components/layout/Footer';

const MainContainer = styled('div')({
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
});

const useIsRoot = () => {
    const location = useLocation();
    return useMemo(() => mainRoutes.find(it => it.path === location.pathname) ? true : false,
        [location]);
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const appTheme = useAppTheme();
    const theme = useMainTheme(appTheme?.mode)
    const isRoot = useIsRoot()


    return (
        <ThemeProvider theme={{ [THEME_ID]: theme, mode: appTheme?.mode }}>
            <MainContainer>
                <CssBaseline />
                <AppToolbar />
                <Container className={styles.Layout}>
                    {children}
                </Container>
                {isRoot ? <Footer /> : <SimpleBottomNavigation />}
            </MainContainer>
        </ThemeProvider>
    )
}

const BottomNavigationWrapper = styled(Paper)({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
});

export const SimpleBottomNavigation = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        <BottomNavigationWrapper>
            <BottomNavigation
                showLabels
                slot='bottom'
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue);
                }}>
                {
                    mainRoutes.map(({ path, icon: Icon }) => (
                        <BottomNavigationAction key={path} onClick={() => navigate(path)} label={path.split('/')[1]} icon={Icon && <Icon />} />
                    ))
                }
            </BottomNavigation>
        </BottomNavigationWrapper>
    );
}
