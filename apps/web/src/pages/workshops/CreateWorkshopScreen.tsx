
import { useState } from 'react';
import { Container, Grid2 as Grid, Box, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../contexts/app-context/Page';
import { CreateWorkshopForm } from '../../features/workshops/components/CreateWorkshopForm';
import { WorkshopPreview } from '../../features/workshops/components/WorkshopPreview';
import { Workshop } from '@ecotrack/types';

const CreateWorkshopPage = () => {
    const [previewData, setPreviewData] = useState<Partial<Workshop>>({});
    const navigate = useNavigate();

    const handleSubmit = (data: Workshop) => {
        console.log('Submitting workshop:', data);
        // Here we would call the service and then redirect
        navigate('/workshops');
    };

    return (
        <Page title="Crear Taller">
            <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
                <Box sx={{ mb: 4 }}>
                    <IconButton onClick={() => navigate('/workshops')}>
                        <ArrowBackIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper sx={{ p: 4, borderRadius: 4 }}>
                            <CreateWorkshopForm
                                onPreviewChange={setPreviewData}
                                onSubmit={handleSubmit}
                            />
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <WorkshopPreview data={previewData} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default CreateWorkshopPage;
