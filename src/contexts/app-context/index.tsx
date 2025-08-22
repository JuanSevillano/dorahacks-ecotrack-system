
import { PageComponent, PageSimpleComponent } from './Page';
import { createContext, useEffect } from 'react';
import { useLocation } from '../router/router';
import { getUseContext } from '..';
import { Box } from '@mui/material';
import { ToastProvider } from '../toast-context';

export const ProjectTypes = {
    app: 'app',
    web: 'web',
} as const;

export type Project = keyof typeof ProjectTypes;
export type UseIsPageMounted = () => boolean;
export type usePageDidEnter = typeof useEffect;


type InfiniteScrollerComponentProps = {
    onInfinite: () => Promise<unknown>;
};

export type InfiniteScrollerComponent = React.ComponentType<
    InfiniteScrollerComponentProps & {
        children: React.ReactNode;
    }
>;
export const InfiniteScroller: React.ComponentType<InfiniteScrollerComponentProps> = props => {
    const { infiniteScrollerComponent: Component } = useAppContext();
    return (
        <Component {...props}>
            <Box paddingY={32}>
                <FullPageLoading />
            </Box>
        </Component>
    );
};

export type RefresherComponent = React.ComponentType<{
    onRefresh: () => Promise<void>;
}>;
export const Refresher: RefresherComponent = props => {
    const { refresherComponent: Component } = useAppContext();
    return <Component {...props} />;
};

export type BottomSheetComponent = React.ComponentType<{
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}>;

export const BottomSheet: BottomSheetComponent = props => {
    const { bottomSheetComponent: Component } = useAppContext();
    return <Component {...props} />;
};

export type NavigateComponent = React.ComponentType<{
    to: string;
    replace?: boolean;
}>;

export const Navigate: NavigateComponent = props => {
    const { navigateComponent: Component } = useAppContext();
    return <Component {...props} />;
};

export const FullPageLoading = () => (
    <Box paddingX={16} paddingY={24}>
        CARGANDO...
    </Box>
);


export type Context = Readonly<{
    project: Project;
    useIsPageMounted: UseIsPageMounted;
    pageComponent: PageComponent;
    pageSimpleComponent: PageSimpleComponent;
    infiniteScrollerComponent: InfiniteScrollerComponent;
    refresherComponent: RefresherComponent;
    bottomSheetComponent: BottomSheetComponent;
    navigateComponent: NavigateComponent;
}>;

type Props = Context & {
    children: React.ReactNode;
};

const locationLogger = console;

const LocationLogger = () => {
    const { pathname, search } = useLocation();
    useEffect(() => {
        locationLogger.info([pathname, search].filter(Boolean).join(''));
    }, [pathname, search]);
    return null;
};

const AppContext = createContext<Context | null>(null);
AppContext.displayName = 'AppContext';

export const useAppContext = getUseContext(AppContext);

export const AppContextProvider = ({ children, ...context }: Props) => {
    const { isDark } = { isDark: true }
    useEffect(() => {
        const className = isDark ? 'themeDark' : 'themeLight';
        document.body.classList.add(className);

        return () => {
            document.body.classList.remove(className);
        };
    }, [isDark]);

    // const hasBottomBar = useIsCurrentRouteAMainSectionRoot();
    // This is useful to ensure the ToastProvider is inside the Router
    // and avoit overlaping with the BottomBar

    return (
        <AppContext.Provider value={context}>
            <ToastProvider />
            <LocationLogger />
            {children}
        </AppContext.Provider>

    );
};