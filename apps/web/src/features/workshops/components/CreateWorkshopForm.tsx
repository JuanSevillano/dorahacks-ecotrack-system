
import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Grid2 as Grid,
    Button,
    Stack,
    InputAdornment,
    MenuItem
} from '@mui/material';
import { Workshop, WorkshopCategory } from '@ecotrack/types';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SendIcon from '@mui/icons-material/Send';

interface CreateWorkshopFormProps {
    onPreviewChange: (data: Partial<Workshop>) => void;
    onSubmit: (data: Workshop) => void;
}

const CATEGORIES: WorkshopCategory[] = ['BIOCONSTRUCCIÓN', 'TECNOLOGÍAS SOCIALES', 'GESTIÓN DE AGUA'];

export const CreateWorkshopForm = ({ onPreviewChange, onSubmit }: CreateWorkshopFormProps) => {
    const [formData, setFormData] = useState<Partial<Workshop>>({
        title: '',
        description: '',
        detailedDescription: '',
        location: '',
        date: '',
        category: 'BIOCONSTRUCCIÓN',
        costUSDC: 0,
        rewardsB3TR: 0,
        image: ''
    });

    const handleChange = (field: keyof Workshop) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        onPreviewChange(newData);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would validate and cast to full Workshop
        if (formData.title && formData.description) {
            onSubmit(formData as Workshop);
        }
    };

    return (
        <Box component="form" onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <AssignmentIcon color="primary" />
                    <Typography variant="h5" fontWeight="bold">Configuración del Nuevo Taller</Typography>
                </Stack>

                <Box>
                    <Typography variant="overline" color="text.secondary" fontWeight="bold">Información General</Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Título del Taller"
                                placeholder="Ej. Taller de Construcción con Tierra"
                                value={formData.title}
                                onChange={handleChange('title')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Categoría"
                                value={formData.category}
                                onChange={handleChange('category')}
                            >
                                {CATEGORIES.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="URL de Imagen"
                                placeholder="https://..."
                                value={formData.image}
                                onChange={handleChange('image')}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Descripción Corta"
                                placeholder="Breve resumen para el listado..."
                                value={formData.description}
                                onChange={handleChange('description')}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Descripción Detallada"
                                placeholder="Describe los módulos: Adobe, Tapial, Bahareque..."
                                value={formData.detailedDescription}
                                onChange={handleChange('detailedDescription')}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Grid container spacing={6}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="overline" color="text.secondary" fontWeight="bold">Logística</Typography>
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Ubicación"
                                    placeholder="Ej. Centro de Permacultura 'El Barro'"
                                    value={formData.location}
                                    onChange={handleChange('location')}
                                />
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Fecha de Inicio"
                                    slotProps={{ inputLabel: { shrink: true } }}
                                    value={formData.date}
                                    onChange={handleChange('date')}
                                />
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="overline" color="text.secondary" fontWeight="bold">Tokens & Web3</Typography>
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Costo de Inscripción (USDC)"
                                    value={formData.costUSDC}
                                    onChange={handleChange('costUSDC')}
                                    slotProps={{
                                        input: {
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                                        }
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Rewards de Participación (B3TR)"
                                    value={formData.rewardsB3TR}
                                    onChange={handleChange('rewardsB3TR')}
                                    slotProps={{
                                        input: {
                                            startAdornment: <InputAdornment position="start">⭐</InputAdornment>
                                        }
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<SendIcon />}
                    sx={{ py: 2, borderRadius: 3, fontWeight: 'bold' }}
                >
                    Publicar en Protocolo VerdeCap
                </Button>
            </Stack>
        </Box>
    );
};
