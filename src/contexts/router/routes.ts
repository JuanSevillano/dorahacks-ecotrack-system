import FavoriteIcon from '@mui/icons-material/Favorite';

import ListIcon from '@mui/icons-material/ListAltRounded';
import HomeIcon from '@mui/icons-material/HomeMaxRounded';

import { Home } from "../../pages/Home";
import { NFTs } from "../../pages/NFTs";
import { Tokens } from "../../pages/Tokens";


export type Paths = ReadonlyArray<Readonly<{
    path: string;
    Component: React.ComponentType,
    icon?: React.ComponentType;
    libs?: string[];
}>>

// TODO: This should be only used for the app routes, not for the operative context
// it should be attached to components 
export const appRoutes: Paths = [
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
        Component: NFTs,
        icon: FavoriteIcon
    }
]

