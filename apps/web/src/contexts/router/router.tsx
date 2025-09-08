import { createContext, useMemo } from 'react';
import { getUseContext } from '..';

export type MatchesPath = (
    pattern: string | { path: string; caseSensitive?: boolean; end?: boolean },
    path: string
) => boolean;

export interface NavigateOptions {
    replace?: boolean;
}
export interface NavigateFunction {
    (to: string, options?: NavigateOptions): void;
    (delta: number): void;
}

export type UseNavigate = () => NavigateFunction;

export interface Location {
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    readonly state: unknown;
    readonly key?: string;
}

export type UseLocation = () => Location;

export type UseParams = () => Record<string, string | undefined>;

type Context = Readonly<{
    matchesPath: MatchesPath;
    useNavigate: UseNavigate;
    useParams: UseParams;
    useLocation: UseLocation;
}>;

const RouterContext = createContext<Context | null>(null);
RouterContext.displayName = 'RouterContext';

type Props = Context & {
    children: React.ReactNode;
};

export const RouterContextProvider = ({ matchesPath, useNavigate, useParams, useLocation, children }: Props) => (
    <RouterContext.Provider
        value={useMemo(
            () => ({ matchesPath, useNavigate, useParams, useLocation }),
            [matchesPath, useLocation, useNavigate, useParams]
        )}
    >
        {children}
    </RouterContext.Provider>
);

const useRouterContext = getUseContext(RouterContext);

export const useLocation = () => useRouterContext().useLocation();
export const useNavigate = () => useRouterContext().useNavigate();
export const useParams = () => useRouterContext().useParams();

export const useSearchParams = (): Readonly<Record<string, string | undefined>> =>
    Object.fromEntries(new URLSearchParams(useLocation().search));

export const useMatchesPath = () => useRouterContext().matchesPath;

export const useMandatoryParams = <Keys extends string>(
    names?: ReadonlyArray<Keys>
): Record<Keys, string> & Record<string, string | undefined> => {
    const params = useParams() as Record<Keys, string>;
    for (const name of names ?? []) {
        if (!String(params[name])) {
            throw new TypeError(`Required parameter ${String(name)} not found`);
        }
    }

    return params;
};
