import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

const FullpageLoading: FC = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default FullpageLoading;