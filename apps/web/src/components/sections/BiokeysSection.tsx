// src/components/sections/BiokeysSection.tsx
import { Grid, Typography, Box } from '@mui/material';
import { appData } from '../data/appData';
import SectionContainer from './SectionContainer';

const BiokeysSection = () => {
  return (
    <SectionContainer>
      <Grid container spacing={6} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h2" gutterBottom>{appData.biokeys.title}</Typography>
          <Typography variant="body1" color="text.secondary">{appData.biokeys.description}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={appData.biokeys.image}
            alt="Bioconstructed NFT House"
            sx={{ width: '100%', borderRadius: 3, boxShadow: 5 }}
          />
        </Grid>
      </Grid>
    </SectionContainer>
  );
};
export default BiokeysSection;