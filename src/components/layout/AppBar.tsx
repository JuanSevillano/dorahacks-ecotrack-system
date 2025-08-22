import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePageContext as usePage } from '../../contexts/app-context/PageContext';
import ConnectButton from '../ConnectButton';


export const AppToolbar = () => {
    const { isRoot } = usePage();
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
                    {isRoot && ' Web3 Portfolio Send Payment'}
                </Typography>
                <ConnectButton />
            </Toolbar>
        </AppBar>
    );
};