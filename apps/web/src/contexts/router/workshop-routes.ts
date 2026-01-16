import { lazy } from "react";
import { IdParams, Paths } from "./types";

const WorkshopsScreen = lazy(() => import('../../pages/workshops/WorkshopsScreen'));
const CreateWorkshopScreen = lazy(() => import('../../pages/workshops/CreateWorkshopScreen'));

export const workshopsPaths = {
    index: ({ id }: IdParams) => `workshops/${id}`,
}

const routesDefinitions: Record<string, Paths[number]> = {
    workshopsScreen: { path: 'workshops', Component: WorkshopsScreen },
    createWorkshopScreen: { path: 'workshops/create', Component: CreateWorkshopScreen }
} as const;

export const workshopRoutes: Paths = Object.values(routesDefinitions).map(it => ({ ...it }));