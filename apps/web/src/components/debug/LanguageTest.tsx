import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { useLang } from '../../contexts/lang/useLang';

export const LanguageTest: React.FC = () => {
    const { t, lang, setLang, languages } = useLang();
    const [lastChange, setLastChange] = useState<string>('');

    useEffect(() => {
        setLastChange(new Date().toLocaleTimeString());
    }, [lang]);

    return (
        <Box sx={{ p: 2, border: '2px solid #4caf50', borderRadius: 2, mb: 2, bgcolor: 'rgba(76, 175, 80, 0.1)' }}>
            <Typography variant="h6" color="success.main">Language Test Component</Typography>
            <Typography>Current Language: <strong>{lang}</strong></Typography>
            <Typography>Available Languages: {languages.join(', ')}</Typography>
            <Typography>Last Change: {lastChange}</Typography>

            <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Live Translation Tests:</Typography>
                <Typography>Title: <strong>{t('home.hero.title')}</strong></Typography>
                <Typography>Description: <strong>{t('home.hero.description')}</strong></Typography>
                <Typography>CTA: <strong>{t('home.hero.cta')}</strong></Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Button
                    onClick={() => setLang('en')}
                    variant="contained"
                    color={lang === 'en' ? 'success' : 'primary'}
                    size="small"
                    sx={{ mr: 1 }}
                >
                    Switch to EN
                </Button>
                <Button
                    onClick={() => setLang('es')}
                    variant="contained"
                    color={lang === 'es' ? 'success' : 'primary'}
                    size="small"
                >
                    Switch to ES
                </Button>
            </Box>

            {lang === 'en' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    English is active! You should see "Build title connection" above.
                </Alert>
            )}
            {lang === 'es' && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Spanish is active! You should see "VerdeCap: Digitalizando Acciones Ecológicas" above.
                </Alert>
            )}
        </Box>
    );
};
