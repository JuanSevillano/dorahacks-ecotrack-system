import { style } from '@vanilla-extract/css'

export const pageContainer = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100vh',
    maxWidth: '1200px',
    marginBottom: '80px',
});
