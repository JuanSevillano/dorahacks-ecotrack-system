import { IdParams, Paths } from './types';
import { mainRoutes } from './main-routes';
import { projectRoutes } from './project-routes';

export const appRoutes: Paths = [
    ...mainRoutes,
    ...projectRoutes
];

export const publicRoutes = {
    index: () => '/home',
    protocol: () => '/protocol',
    collections: () => '/collections',
    roadmap: () => '/roadmap',
    comunity: () => '/comunity',
    tokens: {
        index: ({ id }: IdParams) => `/tokens/${id}`
    }
}

// const routes = {
//     ...publicRoutes,
//     main: {
//         index: () => '/',
//     },
//     app: {
//         index: () => ``
//     }
// }