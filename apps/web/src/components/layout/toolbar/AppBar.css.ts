import { style } from "@vanilla-extract/css";
import { mediaQueries } from "../../../contexts/layout-context/media-queries";

export const Toolbar = style({
    height: 'fit-content',
    background: 'transparent',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '100%',
    maxWidth: 1600
})


export const Logo = style({
    width: '30px',

    '@media': {
        [mediaQueries.tablet]: {
            width: '50px'
        },
        [mediaQueries.desktop]: {
            width: '70px'
        }
    }
});

export const MenuMobile = style({
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    background: 'rgba(0,0,0,0.3)',
    height: '100vh',
    padding: 50,
    alignItems: 'center',
    justifyContent: 'space-between',

    '::before': {
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        filter: 'blur(8px)',
        width: '100%',
        height: '100%',
        zIndex: -1
    }
})