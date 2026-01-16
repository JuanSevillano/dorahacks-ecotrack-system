import { Link, Typography } from "@mui/material";
import { PageTransitionWrapper } from "../../../contexts/app-context";
import { appData } from "../../data/appData";
import * as styles from './AppBar.css';
import { ThemeSwitch } from "./ThemeSwitch";

export const MenuMobile = ({ open, menuItemHandler }: { open: boolean, menuItemHandler: (link: typeof appData.navLinks[number]) => void }) => (
    open && <PageTransitionWrapper>
        <div className={styles.MenuMobile}>
            <ThemeSwitch />
            {appData.navLinks.map((link) => (
                <Link
                    key={link.title}
                    onClick={() => menuItemHandler(link)}
                    color="inherit"
                    underline="none"
                    sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                    <Typography fontWeight='bold' textAlign='center' color="primary.main" variant='h2'>
                        {link.title}
                    </Typography>
                </Link>
            ))}
        </div>
    </PageTransitionWrapper>
)