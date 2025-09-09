import { lazy } from "react";
import { Paths } from "./types";
import { NFTDetails } from '../../pages/NFTs'

const ProjectDetail = lazy(() => import('../../pages/projects/ProjectDetail'));

const routesDefinitions: Record<string, Paths[number]> = {
    projectDetail: { path: 'project/:projectHash', Component: ProjectDetail },
    projectItemDetail: { path: 'project/:projectHash/:nftHash', Component: NFTDetails }
} as const;

export const projectRoutes: Paths = Object.values(routesDefinitions).map(it => ({ ...it }));