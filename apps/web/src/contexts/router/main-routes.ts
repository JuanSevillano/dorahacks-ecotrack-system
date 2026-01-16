import ListIcon from '@mui/icons-material/ListAltRounded';
import HomeIcon from '@mui/icons-material/HomeMaxRounded';
import { Home } from "../../pages/home/HomeScreen";
import { Tokens } from "../../pages/Tokens";
import { Paths } from './types';
import { VerdeCapProtocolPage } from '../../pages/protocol/ProtocolScreen';
import ExploreIcon from '@mui/icons-material/Explore';
import WorkshopsPage from '../../pages/workshops/WorkshopsScreen';

export const mainRoutes: Paths = [
    {
        path: '/',
        Component: Home,
        icon: HomeIcon
    },
    {
        path: '/protocol',
        Component: VerdeCapProtocolPage,
        icon: ListIcon
    },
    {
        path: '/tokens',
        Component: Tokens,
        icon: ListIcon
    },
    {
        path: '/workshops',
        Component: WorkshopsPage,
        icon: ExploreIcon
    }
] as const;
