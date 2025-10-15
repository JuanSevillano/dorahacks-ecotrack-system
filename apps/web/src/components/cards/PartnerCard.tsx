import { Card, CardContent, Typography, Box } from '@mui/material';

interface PartnerCardProps {
    name: string;
    description: string;
    logo: string;
}

const PartnerCard = ({ name, description, logo }: PartnerCardProps) => {
    return (
        <Card sx={{
            textAlign: 'center',
            p: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'rgba(23, 207, 84, 0.2)',
            height: '100%',
            transition: 'all 0.3s',
            '&:hover': {
                borderColor: 'primary.main',
                transform: 'translateY(-5px)',
            }
        }}>
            <CardContent>
                <Box
                    component="img"
                    src={logo}
                    alt={`${name} logo`}
                    sx={{ height: 80, mb: 3, objectFit: 'contain' }}
                />
                <Typography variant="h6" component="h3" fontWeight="bold">{name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{description}</Typography>
            </CardContent>
        </Card>
    );
};
export default PartnerCard;