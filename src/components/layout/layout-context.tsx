import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { appRoutes } from '../../contexts/router/routes';
import { Container, CssBaseline, styled } from '@mui/material';
import { AppToolbar } from './AppBar';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled('div')({
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
})

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MainContainer>
            <CssBaseline />
            <AppToolbar />
            <Container>
                {children}
            </Container>
            <SimpleBottomNavigation />
        </MainContainer>
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
                    appRoutes.map(({ path, icon: Icon }) => (
                        <BottomNavigationAction key={path} onClick={() => navigate(path)} label={path.split('/')[1]} icon={Icon && <Icon />} />
                    ))
                }
            </BottomNavigation>
        </BottomNavigationWrapper>
    );
}
