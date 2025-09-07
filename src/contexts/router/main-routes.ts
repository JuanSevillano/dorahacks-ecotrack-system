import FavoriteIcon from '@mui/icons-material/Favorite';

import ListIcon from '@mui/icons-material/ListAltRounded';
import HomeIcon from '@mui/icons-material/HomeMaxRounded';

import { Home } from "../../pages/Home";
import { Tokens } from "../../pages/Tokens";
import NFTDetail from "../../pages/NFTs";
import { Paths } from './types';

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
        path: '/tokens',
        Component: Tokens,
        icon: ListIcon
    }
    ,
    {
        path: '/nfts',
        Component: NFTDetail,
        icon: FavoriteIcon
    }
] as const;