import { createContext } from "react";
import { useLocation } from "../router/router";
import { mainRoutes } from "../router/main-routes";

type PageContextType = {
  isRoot: boolean;
  setIsFeaturePage?: (isFeature: boolean) => void;
}

export const PageContext = createContext<PageContextType | null>(null);
PageContext.displayName = 'PageContext';

const useIsRootPath = () => {
  const { pathname } = useLocation();
  return mainRoutes.map(route => route.path).includes(pathname);
}

export const PagePorvider = ({ children }: { children: React.ReactNode }) => {
  const isRoot = useIsRootPath();
  return (
    <PageContext.Provider value={{ isRoot }}>
      {children}
    </PageContext.Provider>
  );
};