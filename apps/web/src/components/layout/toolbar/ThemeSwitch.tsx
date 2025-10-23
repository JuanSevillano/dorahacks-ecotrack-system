import { Box, Switch } from '@mui/material';
import { ThemeContextType } from '../../../contexts/theme-context/theme-context';
import { DarkMode, LightMode } from '@mui/icons-material';

export function ThemeSwitch({ mode, toggleTheme }: ThemeContextType) {
    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
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
