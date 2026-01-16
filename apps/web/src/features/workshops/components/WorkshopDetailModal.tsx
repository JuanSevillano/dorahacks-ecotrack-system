
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Button,
    Grid2 as Grid,
    useMediaQuery,
    useTheme,
    Stack,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Workshop } from '@ecotrack/types';

interface WorkshopDetailModalProps {
    open: boolean;
    onClose: () => void;
    workshop: Workshop | null;
    onPay: (workshop: Workshop) => void;
}

export const WorkshopDetailModal = ({ open, onClose, workshop, onPay }: WorkshopDetailModalProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    if (!workshop) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={isMobile}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 4,
                    overflow: 'hidden'
                }
            }}
        >
            {!isMobile && (
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        color: 'white',
                        zIndex: 10,
                        bgcolor: 'rgba(0,0,0,0.3)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            )}

            <DialogContent sx={{ p: 0 }}>
                <Grid container>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative', height: { xs: '300px', md: '100%' }, minHeight: { md: '600px' } }}>
                            <Box
                                component="img"
                                src={workshop.image}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                p: 4,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                            }}>
                                <Chip
                                    label={workshop.category}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        mb: 2,
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        fontSize: '0.7rem'
                                    }}
                                />
                                <Typography variant="h3" color="white" fontWeight="bold">
                                    {workshop.title}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ p: { xs: 3, md: 6 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <LocationOnIcon color="primary" />
                                    <Typography variant="body1" fontWeight="medium">
                                        {workshop.location}
                                    </Typography>
                                </Stack>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                                        Inicio
                                    </Typography>
                                    <Typography variant="h6" fontWeight="bold">
                                        {new Date(workshop.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography variant="h5" gutterBottom fontWeight="bold">
                                Descripción del Conocimiento
                            </Typography>
                            <Divider sx={{ mb: 3, borderColor: 'primary.main', width: 40, borderBottomWidth: 3 }} />

                            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, lineHeight: 1.8 }}>
                                {workshop.detailedDescription}
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 6 }}>
                                <Grid size={{ xs: 6 }}>
                                    <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                                        <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                                            Costo Inscripción
                                        </Typography>
                                        <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                                            {workshop.costUSDC} <Typography component="span" variant="body2" color="text.secondary">USDC</Typography>
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 6 }}>
                                    <Box sx={{ p: 3, bgcolor: 'rgba(23, 207, 84, 0.05)', borderRadius: 3, border: '1px solid', borderColor: 'primary.main' }}>
                                        <Typography variant="caption" color="primary" fontWeight="bold" sx={{ textTransform: 'uppercase' }}>
                                            Tus Rewards
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                                            <Typography variant="h4" color="primary" fontWeight="bold">
                                                {workshop.rewardsB3TR}
                                            </Typography>
                                            <Typography variant="body2" color="primary" fontWeight="bold">
                                                B3TR
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 'auto' }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    startIcon={<AccountBalanceWalletIcon />}
                                    onClick={() => onPay(workshop)}
                                    sx={{
                                        py: 2,
                                        fontSize: '1.2rem',
                                        textTransform: 'none',
                                        borderRadius: 3,
                                        boxShadow: '0 8px 16px rgba(23, 207, 84, 0.25)'
                                    }}
                                >
                                    Pagar e Inscribirme
                                </Button>
                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={onClose}
                                    sx={{ mt: 2, color: 'text.secondary' }}
                                >
                                    Cerrar Detalles
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

const Chip = ({ label, sx }: { label: string, sx?: any }) => (
    <Box sx={{
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        ...sx
    }}>
        {label}
    </Box>
)
