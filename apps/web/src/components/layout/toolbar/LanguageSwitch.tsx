import { Box, MenuItem, Select } from "@mui/material";
import { useLang } from "../../../contexts/lang/useLang";

export const LanguageSwitch = () => {
    const { lang, setLang, languages } = useLang();
    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Select
                size='small'
                labelId="language-select-label"
                id="language-select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
            >
                {
                    languages.map(code => (
                        <MenuItem key={code} value={code}>
                            {code.toUpperCase()}
                        </MenuItem>
                    ))
                }
            </Select>
        </Box>
    )
}