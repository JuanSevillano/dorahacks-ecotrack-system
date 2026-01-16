import { IdParams, Paths } from './types';
import { mainRoutes } from './main-routes';
import { projectRoutes } from './project-routes';
import { workshopRoutes } from './workshop-routes';

export const appRoutes: Paths = [
    ...mainRoutes,
    ...projectRoutes,
    ...workshopRoutes
];

export const publicRoutes = {
    index: () => '/',
    protocol: () => '/protocol',
    collections: () => '/collections',
    roadmap: () => '/roadmap',
    comunity: () => '/comunity',
    tokens: {
        index: ({ id }: IdParams) => `/tokens/${id}`
    }
}