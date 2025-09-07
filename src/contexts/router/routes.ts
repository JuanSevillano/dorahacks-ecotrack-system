import { Paths } from './types';
import { mainRoutes } from './main-routes';
import { projectRoutes } from './project-routes';

export const appRoutes: Paths = [
    ...mainRoutes,
    ...projectRoutes
];