import { createContext, useMemo, useRef } from 'react';

import { useLocation } from '../router/router';

export type MainSection = 'home' | 'tokens' | 'nfts' | 'profile'

type Context = Readonly<{
  // TODO: TYpe porpely what could be a arra of operatives 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  operatives: ReadonlyArray<any>;
  distributive: boolean;
  section?: MainSection;
  isRoot: boolean;
}>;

const PageContext = createContext<Context | null>(null);
PageContext.displayName = 'PageContext';

type Props = Pick<Context, 'operatives' | 'distributive'> & {
  children: React.ReactNode;
};

// TODO: change this string for specific path functions in routes.ts
const pathsForSection: Readonly<Record<MainSection, string>> = {
  home: '/',
  tokens: 'tokens',
  nfts: 'nfts',
  profile: 'profile',
};


export const getMainSectionRoute = (section: MainSection) => pathsForSection[section];

export const useCurrentMainSection = () => {
  const { pathname } = useLocation();
  return Object.entries(pathsForSection).find(([, route]) => pathname.startsWith(route))?.[0];
};

export const useIsCurrentRouteAMainSectionRoot = () => {
  const { pathname } = useLocation();

  return Object.values(pathsForSection).some(route => route === pathname);
};


export const PageContextProvider = ({ children, operatives, distributive }: Props) => {
  // Here it is important to keep a constant value, as the hooks will change over the time given the URL, but the page will remain sticked to its own URL
  // bear in mind that we will have more than one page at the same time being rendered, while transitioning from one to another or stacked on the mobile app
  const section = useRef(useCurrentMainSection() as MainSection).current;
  const isRoot = useRef(useIsCurrentRouteAMainSectionRoot()).current;
  const context = useMemo(
    () => ({ distributive, operatives, section, isRoot }),
    [distributive, isRoot, operatives, section]
  );
  return <PageContext.Provider value={context}>{children}</PageContext.Provider>;
};