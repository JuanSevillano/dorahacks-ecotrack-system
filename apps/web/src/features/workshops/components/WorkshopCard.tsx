
import { Box, Card, CardContent, CardMedia, Chip, Typography, Stack } from '@mui/material';
import { Workshop } from '@ecotrack/types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface WorkshopCardProps {
    workshop: Workshop;
    onClick: (workshop: Workshop) => void;
}

export const WorkshopCard = ({ workshop, onClick }: WorkshopCardProps) => {
    return (
        <Card
            onClick={() => onClick(workshop)}
            sx={{
                cursor: 'pointer',
                borderRadius: 4,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={workshop.image}
                    alt={workshop.title}
                />
                <Chip
                    label={workshop.category}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        height: 24
                    }}
                />
                <Chip
                    label={`+${workshop.rewardsB3TR} B3TR`}
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        height: 28
                    }}
                />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold" lineHeight={1.2}>
                    {workshop.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    mb: 3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.5
                }}>
                    {workshop.description}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <CalendarMonthIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {new Date(workshop.date).toLocaleDateString()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
                            {workshop.costUSDC}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                            USDC
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};
