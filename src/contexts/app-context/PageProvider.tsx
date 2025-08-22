import { createContext } from "react";
import { useLocation } from "../router/router";
import { appRoutes } from "../router/routes";

type PageContextType = {
  isRoot: boolean;
  setIsFeaturePage?: (isFeature: boolean) => void;
}

export const PageContext = createContext<PageContextType | null>(null);
PageContext.displayName = 'PageContext';

const useIsRootPath = () => {
  const { pathname } = useLocation();
  return appRoutes.map(route => route.path).includes(pathname); // TODO: improve this check to only root paths
}

export const PagePorvider = ({ children }: { children: React.ReactNode }) => {
  const isRoot = useIsRootPath();
  return (
    <PageContext.Provider value={{ isRoot }}>
      {children}
    </PageContext.Provider>
  );
};