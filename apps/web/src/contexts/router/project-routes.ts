import { lazy } from "react";
import { Paths } from "./types";

const ProjectDetail = lazy(() => import('../../pages/projects/ProjectDetail'));
const NFTDetail = lazy(() => import('../../pages/projects/NFTDetail'));

const routesDefinitions: Record<string, Paths[number]> = {
    projectDetail: { path: 'project/:projectHash', Component: ProjectDetail },
    projectItemDetail: { path: 'project/:projectHash/:nftHash', Component: NFTDetail }
} as const;

export const projectRoutes: Paths = Object.values(routesDefinitions).map(it => ({ ...it }));