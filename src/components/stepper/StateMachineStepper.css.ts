import { globalStyle, style } from '@vanilla-extract/css';
import { mediaQueries } from '@myinvestor-app/theme';

export const content = style({
    margin: '0 auto',
    '@media': {
        [mediaQueries.tablet]: {
            maxWidth: 474,
        },
        [mediaQueries.desktop]: {
            maxWidth: 1050,
        },
    },
});

export const confirmation = style({
    display: 'grid',
    width: '100%',
    minHeight: '100%',
});

export const fullWidth = style({
    width: '100%',
});

export const steps = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    width: '100%',
    padding: '0 16px',

    '@media': {
        [mediaQueries.desktop]: {
            flexDirection: 'row',
            columnGap: 72,
        },
    },
});

export const step = style({
    flex: 1,
    '@media': {
        [mediaQueries.desktop]: {
            position: 'relative',
        },
    },
});

export const stepsSeparator = style({
    position: 'absolute',
    left: -48,
    top: 140,
});

export const stepsBottom = style({
    padding: '0 16px',
});

globalStyle(`${stepsBottom}:not(:empty)`, {
    marginTop: 32,
});
