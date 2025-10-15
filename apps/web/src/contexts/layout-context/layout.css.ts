import { style } from "@vanilla-extract/css";
import { mediaQueries } from "./media-queries";

export const Layout = style({
    paddingTop: 60,

    '@media': {
        [mediaQueries.tablet]: {
            paddingTop: 80
        },
        [mediaQueries.desktop]: {
            paddingTop: 95
        }
    }
})