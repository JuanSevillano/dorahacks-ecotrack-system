// src/components/layout/Header.tsx
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { appData } from '../data/appData';

const Header = () => {
    return (
        <AppBar position="fixed" sx={{
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'rgba(17, 33, 22, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'primary.main',
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div" fontWeight="bold">
                    {appData.projectName}
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                    {appData.navLinks.map((link) => (
                        <Link href={link.url} key={link.title} color="inherit" underline="none" sx={{ '&:hover': { color: 'primary.main' } }}>
                            {link.title}
                        </Link>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button variant="contained" color="primary">
                        Connect Wallet
                    </Button>
                    <IconButton sx={{ display: { md: 'none' } }} color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;