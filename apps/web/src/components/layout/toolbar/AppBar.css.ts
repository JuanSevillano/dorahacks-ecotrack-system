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
})