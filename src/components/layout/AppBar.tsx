import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ConnectButton from '../ConnectButton';

export const AppToolbar = () => {

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'transparent',
                backdropFilter: 'blur(3px)'
            }}>
            <Toolbar sx={{ height: 80, background: 'transparent', }}>
                <Typography
                    variant="h6"
                    align='center'>
                    Titulo de la toolbar
                </Typography>
                <ConnectButton />
            </Toolbar>
        </AppBar>
    );
};