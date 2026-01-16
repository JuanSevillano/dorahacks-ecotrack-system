
import { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Container,
    TextField,
    InputAdornment,
    Grid2 as Grid,
    Stack,
    Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Page } from '../../contexts/app-context/Page';
import { WorkshopCard } from '../../features/workshops/components/WorkshopCard';
import { WorkshopDetailModal } from '../../features/workshops/components/WorkshopDetailModal';
import { Workshop } from '@ecotrack/types';
import { useNavigate } from 'react-router-dom';
import { t } from '@ecotrack/lang';
import { MOCK_WORKSHOPS } from '../../components/data/appData';
import { ArrowBack } from '@mui/icons-material';

const WorkshopsPage = () => {
    const [search, setSearch] = useState('');
    const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
    const navigate = useNavigate();

    const filteredWorkshops = useMemo(() => {
        return MOCK_WORKSHOPS.filter(w =>
            w.title.toLowerCase().includes(search.toLowerCase()) ||
            w.description.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const handlePay = (workshop: Workshop) => {
        console.log('Paying for workshop:', workshop.id);
        // Implement payment logic or redirect
    };

    return (
        <Page title="Workshops">
            <Container maxWidth="lg" sx={{ pt: 1, pb: 8 }}>
                <Stack
                    direction="row"
                    spacing={4}
                    justifyContent="center"
                    sx={{ mb: 8, borderBottom: '1px solid', borderColor: 'divider' }}
                >

                    <Button
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBack />}
                        sx={{ color: 'text.secondary', pb: 2, borderRadius: 0 }}
                    >
                        Atrás
                    </Button>
                    <Button
                        onClick={() => navigate('/workshops/create')}
                        startIcon={<AddCircleIcon />}
                        sx={{ color: 'text.secondary', pb: 2, borderRadius: 0 }}
                    >
                        Crear Taller
                    </Button>
                </Stack>

                {/* Hero Section */}
                <Box sx={{ mb: 6 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="h2" fontWeight="bold" gutterBottom>
                                Acciones Verdes: Bioconstrucción
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {t('workshops.hero.description')}
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }} sx={{ mt: { xs: 3, md: 0 } }}>
                            <TextField
                                fullWidth
                                placeholder="Buscar talleres..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color="disabled" />
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 3, bgcolor: 'background.paper' }
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Grid */}
                <Grid container spacing={4}>
                    {filteredWorkshops.map(workshop => (
                        <Grid key={workshop.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <WorkshopCard
                                workshop={workshop}
                                onClick={setSelectedWorkshop}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Detail Modal */}
                <WorkshopDetailModal
                    open={Boolean(selectedWorkshop)}
                    workshop={selectedWorkshop}
                    onClose={() => setSelectedWorkshop(null)}
                    onPay={handlePay}
                />
            </Container>
        </Page>
    );
};

export default WorkshopsPage;