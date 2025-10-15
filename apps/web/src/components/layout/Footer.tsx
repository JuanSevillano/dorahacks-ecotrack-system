// src/components/layout/Footer.tsx
import { Box, Typography, Link, Stack } from '@mui/material';
import { appData } from '../data/appData';
import SectionContainer from '../sections/SectionContainer';

const Footer = () => {
    return (
        <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'primary.main', py: 6 }}>
            <SectionContainer>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={4}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold">{appData.projectName}</Typography>
                        <Typography variant="body2" color="text.secondary">{appData.footer.copy}</Typography>
                    </Box>
                    <Stack direction="row" spacing={4}>
                        {appData.footer.links.map(link => (
                            <Link href={link.url} key={link.title} color="text.secondary" underline="hover">{link.title}</Link>
                        ))}
                    </Stack>
                </Stack>
            </SectionContainer>
        </Box>
    );
}

export default Footer;