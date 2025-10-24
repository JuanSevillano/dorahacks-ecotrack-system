import { Box, Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import HeroImage from '../../assets/home/image.jpeg'
import ArrowFowardRounded from '@mui/icons-material/ArrowForwardRounded';
import SectionContainer from "../../components/sections/SectionContainer";
import { useLang } from "../../contexts/lang/useLang";
import { useViewport } from "../../contexts/layout-context/media-queries";

export const HeroSection = () => {
    const navigate = useNavigate();
    const { t } = useLang();
    const { isMobile } = useViewport();
    console.log('IsMobile', isMobile)

    return (
        <SectionContainer>
            <Grid2
                container
                spacing={isMobile ? 1 : 2}
                justifyContent={{ xs: 'stretch', md: 'space-between' }}
                alignItems={{ xs: 'center', md: 'center' }}
                wrap='wrap'
            >
                <Grid2 size={{ xs: 6, md: 4 }} wrap='wrap'>
                    <Typography
                        lineHeight={0.9}
                        textAlign={isMobile ? 'center' : 'left'}
                        variant={isMobile ? "h2" : "h1"}
                        component={isMobile ? "h2" : "h1"}
                        sx={{ mb: 2, color: 'text.primary' }}>
                        {t('home.hero.title')}
                    </Typography>
                    <Typography
                        variant='h6'
                        lineHeight={1.2}
                        sx={{ mb: 4, color: 'text.secondary', maxWidth: '700px', mx: 'auto' }}>
                        {t('home.hero.description')}
                    </Typography>

                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }} sx={{
                    transform: { xs: 'translateY(30%)' }
                }}>
                    <Box
                        borderRadius={1}
                        component='img'
                        src={HeroImage}
                        alt='VerdeCap main image'
                        sx={{ width: '100%' }} />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <Button
                        fullWidth={isMobile}
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => navigate('./project/biokeys')}
                        endIcon={<ArrowFowardRounded />}>
                        {t('home.hero.cta')}
                    </Button>
                </Grid2>
            </Grid2>
        </SectionContainer>
    );
};