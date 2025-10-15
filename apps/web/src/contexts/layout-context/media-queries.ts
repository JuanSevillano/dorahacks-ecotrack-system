import { useCallback, useEffect, useRef } from "react";

const tabletMinWidth = 768;
const desktopWidth = 992;
const desktopXlWidth = 1440;

export const tablet = `screen and (min-width: ${tabletMinWidth}px)`;
export const desktop = `screen and (min-width: ${desktopWidth}px)`;
export const desktopLarge = `screen and (min-width: ${desktopXlWidth}px)`;

export const mediaQueries = {
    tablet,
    desktop,
    desktopLarge
} as const;

export type Viewport = Readonly<
    Record<'isMobile' | 'isTablet' | 'isDesktop' | 'isDesktopXl' | 'isDesktopOrBigger', boolean>
>;

/**
 * Returns an object with booleans indicating which viewport is currently active.
 * Listens to window resize events and calls the callback with the new viewport state.
 */
export const useViewport = (): Viewport => {
    function getViewport(): Viewport {
        const width = window.innerWidth;
        return {
            isMobile: width < tabletMinWidth,
            isTablet: width >= tabletMinWidth && width < desktopWidth,
            isDesktop: width >= desktopWidth && width < desktopXlWidth,
            isDesktopXl: width >= desktopXlWidth,
            isDesktopOrBigger: width >= desktopWidth,
        } as const;
    }

    const lastViewport = useRef(getViewport());

    const handleResize = useCallback(() => {
        const nextViewport = getViewport();
        if (Object.keys(nextViewport)
            .some(key => nextViewport[key as keyof Viewport] !== lastViewport.current[key as keyof Viewport])) {
            lastViewport.current = nextViewport;
        }
    }, []);


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return lastViewport.current

}
