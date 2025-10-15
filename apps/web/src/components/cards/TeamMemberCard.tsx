import { Box, Typography, Avatar } from '@mui/material';

interface TeamMemberCardProps {
    name: string;
    role: string;
    description: string;
    imageUrl: string;
}

const TeamMemberCard = ({ name, role, description, imageUrl }: TeamMemberCardProps) => {
    return (
        <Box textAlign="center">
            <Avatar
                src={imageUrl}
                alt={`Photo of ${name}`}
                sx={{
                    width: 160,
                    height: 160,
                    mx: 'auto',
                    mb: 3,
                    border: '3px solid',
                    borderColor: 'primary.main',
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
                }}
            />
            <Typography variant="h5" component="h3" fontWeight="bold">
                {name}
            </Typography>
            <Typography variant="body1" color="primary.main" gutterBottom>
                {role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Box>
    );
};

export default TeamMemberCard;