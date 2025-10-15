
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Button, Box, Stack, Typography, Grid } from '@mui/material';
import SectionContainer from '../../components/sections/SectionContainer';
import TeamMemberCard from '../../components/cards/TeamMemberCard';
import { appData } from '../../components/data/appData';
import PartnerCard from '../../components/cards/PartnerCard';
import { Page } from '../../contexts/app-context/Page';
import { CardList } from '../../components/cards/CardList';
import { HeroSection } from './HeroSection';

import HeroImage from '../../assets/home/image.jpeg'
import { useNavigate } from 'react-router-dom';
import { publicRoutes } from '../../contexts/router/routes';



const BiokeysSection = () => (
  <SectionContainer>
    <Grid container spacing={6} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h2" component="h2" lineHeight={0.8} sx={{ background: 'primary' }} gutterBottom>{appData.biokeys.title}</Typography>
        <Typography variant="h6" align="left" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 8 }}>
          {appData.biokeys.description}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box component="img" src={HeroImage} alt="Bioconstructed NFT House"
          sx={{ width: '100%', borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }} />
      </Grid>
    </Grid>
  </SectionContainer>
);



const ParticipationSection = () => (
  <SectionContainer
    title={appData.participation.title}
    sx={{ bgcolor: 'background.paper' }}
    content={appData.participation.description}>
    <CardList items={appData.participation.features} />
  </SectionContainer>
);


const HowItWorksSection = () => (
  <SectionContainer
    title={appData.howItWorks.title}
  >
    <Box sx={{
      maxWidth: '600px', mx: 'auto', mt: 8, position: 'relative',
      '&::before': { // The timeline decorator line
        content: '""',
        position: 'absolute',
        top: '1.25rem',
        bottom: '1.25rem',
        left: '1.25rem',
        width: '2px',
        bgcolor: 'primary.main',
        opacity: 0.3,
      }
    }}>
      <Stack spacing={6}>
        {appData.howItWorks.steps.map((step, index) => (
          <Stack key={index} direction="row" spacing={4} alignItems="flex-start">
            <Box sx={{
              bgcolor: 'primary.main',
              color: 'background.default',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 1
            }}>
              <CheckCircleOutlineIcon />
            </Box>
            <Box>
              <Typography variant="h5" component="h3">{step.title}</Typography>
              <Typography color="text.secondary">{step.description}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  </SectionContainer>
);


const TeamSection = () => (
  <SectionContainer title={appData.team.title} content={appData.team.description}>
    <Grid container spacing={6} justifyContent="center">
      {appData.team.members.map((member) => (
        <Grid item xs={12} sm={6} md={4} key={member.name}>
          <TeamMemberCard {...member} />
        </Grid>
      ))}
    </Grid>
  </SectionContainer>
);



const PartnersSection = () => (
  <SectionContainer
    title={appData.partners.title}
    content={appData.partners.description}>
    <Grid container spacing={4}>
      {appData.partners.logos.map((partner) => (
        <Grid item xs={12} md={4} key={partner.name}>
          <PartnerCard {...partner} />
        </Grid>
      ))}
    </Grid>
  </SectionContainer>
);



const RoadmapSection = () => {
  return (
    <SectionContainer title={appData.roadmap.title} content={appData.roadmap.description} sx={{ bgcolor: 'background.paper' }}>

      <Box sx={{
        maxWidth: '800px', mx: 'auto', position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '1rem',
          bottom: '1rem',
          left: '1rem',
          width: '2px',
          bgcolor: 'primary.main',
          opacity: 0.3,
        }
      }}>
        <Stack spacing={6}>
          {appData.roadmap.milestones.map((item, index) => (
            <Stack key={index} direction="row" spacing={4} alignItems="flex-start">
              <Box sx={{ bgcolor: 'primary.main', color: 'background.default', borderRadius: '50%', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                <RocketLaunchIcon sx={{ fontSize: '1rem' }} />
              </Box>
              <Box>
                <Typography variant="h5" component="h3">{item.quarter}: <Box component="span" fontWeight="400">{item.title}</Box></Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </SectionContainer>
  );
};



const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <SectionContainer sx={{ textAlign: 'center' }}>
      <Typography variant="h2" component="h2" gutterBottom>
        {appData.cta.title}
      </Typography>
      <Button variant="contained" onClick={() => navigate(publicRoutes.protocol())} color="primary" size="large" sx={{ mt: 4 }}>
        {appData.cta.buttonText}
      </Button>
    </SectionContainer>
  );
};

const LandingPage = () => (
  <Page title='home'>
    <HeroSection />
    <BiokeysSection />
    <ParticipationSection />
    <HowItWorksSection />
    <TeamSection />
    <PartnersSection />
    <RoadmapSection />
    <CtaSection />
  </Page>
);


export const Home = () => <LandingPage />;


