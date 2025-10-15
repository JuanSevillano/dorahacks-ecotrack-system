import FavoriteIcon from '@mui/icons-material/Favorite';

import ListIcon from '@mui/icons-material/ListAltRounded';
import HomeIcon from '@mui/icons-material/HomeMaxRounded';

import { Home } from "../../pages/home/HomeScreen";
import { Tokens } from "../../pages/Tokens";
import { Paths } from './types';
import { NFTDetails } from '../../pages/NFTs';
import { VerdeCapProtocolPage } from '../../pages/protocol/ProtocolScreen';
/**
 * Main routes goes directly into main-navigation (BottomNavigationBar)
 */

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
    }
    ,
    {
        path: '/nfts',
        Component: NFTDetails,
        icon: FavoriteIcon
    }
] as const;
