import { Modal, Link } from "@mui/material";
import { PageTransitionWrapper } from "../../../contexts/app-context";
import { appData } from "../../data/appData";
import * as styles from './AppBar.css';

export const MenuMobile = ({ open, menuItemHandler }: { open: boolean, menuItemHandler: any }) => (
    <Modal open={open}>
        <PageTransitionWrapper>
            <div className={styles.MenuMobile}>
                {appData.navLinks.map((link) => (
                    <Link
                        key={link.title}
                        onClick={() => menuItemHandler(link)}
                        color="inherit"
                        underline="none"
                        sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                        {link.title}
                    </Link>
                ))}
            </div>
        </PageTransitionWrapper>
    </Modal>
)