import { Card, CardContent, Typography } from '@mui/material';

interface FeatureCardProps {
    title: string;
    description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
    return (
        <Card sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'primary.main',
            height: '100%',
            transition: 'box-shadow 0.3s, transform 0.3s',
            '&:hover': {
                boxShadow: `0px 10px 20px rgba(23, 207, 84, 0.2)`,
                transform: 'translateY(-5px)',
            }
        }}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" component="h3" color="primary.main" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;