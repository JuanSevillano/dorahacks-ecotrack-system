import { Typography, Grid } from '@mui/material';
import SectionContainer from './SectionContainer';
import FeatureCard from '../cards/FeaturedCard';
import { appData } from '../data/appData';

const ParticipationSection = () => {
    return (
        <SectionContainer sx={{ bgcolor: 'rgba(23, 207, 84, 0.05)' }}>
            <Typography variant="h2" align="center" gutterBottom>{appData.participation.title}</Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
                {appData.participation.description}
            </Typography>
            <Grid container spacing={4}>
                {appData.participation.features.map((feature) => (
                    <Grid item xs={12} md={4} key={feature.title}>
                        <FeatureCard title={feature.title} description={feature.description} />
                    </Grid>
                ))}
            </Grid>
        </SectionContainer>
    );
};
export default ParticipationSection;