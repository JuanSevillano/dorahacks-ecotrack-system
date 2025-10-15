// src/components/sections/TeamSection.tsx
import { Typography, Grid } from '@mui/material';
import TeamMemberCard from '../cards/TeamMemberCard';
import { appData } from '../data/appData';
import SectionContainer from './SectionContainer';

const TeamSection = () => {
  return (
    <SectionContainer sx={{ bgcolor: 'rgba(23, 207, 84, 0.05)' }}>
        <Typography variant="h2" align="center" gutterBottom>{appData.team.title}</Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
            {appData.team.description}
        </Typography>
        <Grid container spacing={6} justifyContent="center">
            {appData.team.members.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.name}>
                    <TeamMemberCard {...member} />
                </Grid>
            ))}
        </Grid>
    </SectionContainer>
  );
};
export default TeamSection;