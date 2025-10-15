// src/components/sections/HeroSection.tsx
import { Box, Typography, Button, Container } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore'; // Icono de ejemplo

// Asegúrate de tener una imagen en la ruta especificada
// import heroBg from '../../assets/hero-background.jpg';

const HeroSection = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                py: 10,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `linear-gradient(rgba(17, 33, 22, 0.8), rgba(17, 33, 22, 0.95)), url(${'heroBg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1,
                },
            }}
        >
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                    VerdeCap: Digitalizando Acciones Ecológicas
                </Typography>
                <Typography variant="h6" component="p" sx={{ mb: 4, color: 'text.primary' }}>
                    Un marketplace para registrar tus acciones de bioconstrucción en nuestro sistema de recompensas 'B3TR'. Participa, aprende y gana con VerdeCap.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ExploreIcon />}
                >
                    Explora Biokeys
                </Button>
            </Container>
        </Box>
    );
};

export default HeroSection;