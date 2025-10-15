import { lazy } from "react";
import { IdParams, Paths } from "./types";

const ProjectDetail = lazy(() => import('../../pages/projects/ProjectDetail'));
const NFTDetail = lazy(() => import('../../pages/projects/NFTDetail'));

export const projectsPaths = {
    index: ({ id }: IdParams) => `projects/${id}`,
}

const routesDefinitions: Record<string, Paths[number]> = {
    projectDetail: { path: 'project/:projectHash', Component: ProjectDetail },
    projectItemDetail: { path: 'project/:projectHash/:tokenId', Component: NFTDetail }
} as const;

export const projectRoutes: Paths = Object.values(routesDefinitions).map(it => ({ ...it }));