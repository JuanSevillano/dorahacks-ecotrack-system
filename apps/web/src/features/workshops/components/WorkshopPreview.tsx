
import { Box, Typography, Stack, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Workshop } from '@ecotrack/types';

interface WorkshopPreviewProps {
    data: Partial<Workshop>;
}

export const WorkshopPreview = ({ data }: WorkshopPreviewProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 0,
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px dashed',
                borderColor: 'primary.main',
                bgcolor: 'rgba(23, 207, 84, 0.02)',
                position: 'sticky',
                top: 100
            }}
        >
            <Box sx={{ p: 2, bgcolor: 'rgba(23, 207, 84, 0.05)', textAlign: 'center' }}>
                <Typography variant="caption" color="primary" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                    Vista Previa en Tiempo Real
                </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: '16/9',
                        bgcolor: 'divider',
                        borderRadius: 2,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {data.image ? (
                        <Box component="img" src={data.image} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} />
                    ) : (
                        <Typography color="text.disabled">Imagen del Taller</Typography>
                    )}
                </Box>

                <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="h5" fontWeight="bold">
                        {data.title || 'Título del Taller'}
                    </Typography>
                    <Box sx={{ bgcolor: 'secondary.main', px: 1, borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="caption" fontWeight="bold" color="white">
                            +{data.rewardsB3TR || 0} B3TR
                        </Typography>
                    </Box>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {data.description || 'Aquí aparecerá la descripción de los módulos del taller...'}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">
                        {data.location || 'Ubicación por definir'}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarMonthIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                        <Typography variant="caption" color="text.secondary">
                            {data.date || 'Fecha por definir'}
                        </Typography>
                    </Stack>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        {data.costUSDC || 0} <Typography component="span" variant="caption">USDC</Typography>
                    </Typography>
                </Stack>
            </Box>

            <Box sx={{ p: 2, bgcolor: 'rgba(23, 207, 84, 0.05)', mx: 2, mb: 2, borderRadius: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ mt: 0.5 }}>ℹ️</Box>
                <Typography variant="caption" color="success.main">
                    Al publicar este taller, se creará un contrato inteligente para gestionar los pagos y la distribución automática de recompensas B3TR al finalizar.
                </Typography>
            </Box>
        </Paper>
    );
};
