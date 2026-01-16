import { Box, Switch } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useAppTheme } from '../../../contexts/theme-context';

export function ThemeSwitch() {
    const { mode, toggleTheme } = useAppTheme();
    return (
        <Box sx={{ display: { md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <LightMode sx={{ fontSize: 20, color: mode === 'dark' ? 'grey.400' : 'warning.main' }} />
            <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                name="themeSwitch"
                color="default"
                size="medium"
            />
            <DarkMode sx={{ fontSize: 20, color: mode === 'dark' ? 'primary.main' : 'grey.400' }} />
        </Box>
    )
}
