import { Box, Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import HeroImage from '../../assets/home/image.jpeg'
import ArrowFowardRounded from '@mui/icons-material/ArrowForwardRounded';
import SectionContainer from "./SectionContainer";
import { useLang } from "../../contexts/lang/useLang";
import { useViewport } from "../../contexts/layout-context/media-queries";
import { projectsPaths } from "../../contexts/router/project-routes";

export const HeroSection = () => {
    const navigate = useNavigate();
    const { t } = useLang();
    const { isMobile } = useViewport();

    return (
        <SectionContainer>
            <Grid2
                container
                spacing={isMobile ? 1 : 2}
                justifyContent={{ xs: 'stretch', md: 'space-between' }}
                alignItems={{ xs: 'center', md: 'center' }}
                wrap='wrap'
            >
                <Grid2 size={{ xs: 12, md: 7 }}>
                    <Typography
                        lineHeight={1}
                        variant={isMobile ? "h3" : "h1"}
                        component="h1"
                        sx={{
                            mb: 2,
                            color: 'text.primary',
                            zIndex: 2,
                            fontWeight: 800
                        }}>
                        {t('home.hero.title')}
                    </Typography>
                    <Typography
                        variant='body1'
                        lineHeight={1.4}
                        sx={{
                            mb: 4,
                            color: 'text.secondary',
                            maxWidth: '600px',
                            fontSize: isMobile ? '1.1rem' : '1.25rem'
                        }}>
                        {t('home.hero.description')}
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 5 }} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: { xs: 2, md: 0 }
                }}>
                    <Box
                        borderRadius={4}
                        component='img'
                        src={HeroImage}
                        alt='VerdeCap main image'
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', md: '450px' },
                            height: 'auto',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                            zIndex: 1
                        }} />
                </Grid2>
                <Grid2 size={{ xs: 12 }} sx={{ mt: { xs: 4, md: 2 } }}>
                    <Button
                        fullWidth={isMobile}
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => navigate(projectsPaths.index({ id: 'biokeys' }))}
                        sx={{
                            py: 1.5,
                            px: 4,
                            fontSize: '1.1rem',
                            borderRadius: 2
                        }}
                        endIcon={<ArrowFowardRounded />}>
                        {t('home.hero.cta')}
                    </Button>
                </Grid2>
            </Grid2>
        </SectionContainer>
    );
};