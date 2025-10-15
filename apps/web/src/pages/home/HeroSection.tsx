import { Box, Button, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { appData } from "../../components/data/appData";

import HeroImage from '../../assets/home/image.jpeg'
import ArrowFowardRounded from '@mui/icons-material/ArrowForwardRounded';
import SectionContainer from "../../components/sections/SectionContainer";


export const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <SectionContainer>
            <Grid2
                container
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                wrap='wrap'>
                <Grid2 size={{ xs: 6, md: 4 }}>
                    <Typography variant="h1" component="h1" sx={{ mb: 2, color: 'text.primary' }}>{appData.hero.title}</Typography>
                    <Typography variant="h6" component="p" sx={{ mb: 4, color: 'text.primary', maxWidth: '700px', mx: 'auto' }}>
                        {appData.hero.subtitle}
                    </Typography>
                    <Button onClick={() => navigate('./project/biokeys')} variant="contained" color="primary" size="large" endIcon={<ArrowFowardRounded />}>
                        {appData.hero.cta}
                    </Button>
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }}>
                    <Box borderRadius={1} component='img' src={HeroImage} alt='VerdeCap main image' sx={{ width: '100%' }} />
                </Grid2>
            </Grid2>
        </SectionContainer>
    );
};