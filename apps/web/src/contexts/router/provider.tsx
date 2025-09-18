import { BrowserRouter as WebRouter, Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "./routes";
import { Suspense } from "react";
import FullpageLoading from "../../components/FullpageLoading";
// import { Capacitor } from '@capacitor/core'
// const isNative = Capacitor.isNativePlatform();

type Props = { children: React.ReactNode };

export const RouterProvider = ({ children }: Props) => (
    <WebRouterComponent >{children}</WebRouterComponent>
);

const renderRoute = (routeProps: (typeof appRoutes)[number]) => <Route key={routeProps.path} {...routeProps} />;

export const AppRoutes = () => (
    <Suspense fallback={<FullpageLoading />}>
        <Routes>
            {appRoutes.map(renderRoute)}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    </Suspense>
)

const WebRouterComponent = ({ children }: Props) => (
    <WebRouter>
        {children}
    </WebRouter>
);

// TODO: implement mobile native navigation
// const MobileRouter = () => (
//     <IonReactRouter>
//         <IonTabs>
//             <IonRouterOutlet>
//                 {appRoutes.map(renderRoute)}
//             </IonRouterOutlet>
//             <IonTabBar slot="bottom">
//                 <IonTabButton tab="home" href="/home">
//                     <IonIcon icon={homeOutline} />
//                 </IonTabButton>
//                 <IonTabButton tab="tokens" href="/tokens">
//                     <IonIcon icon={walletOutline} />
//                 </IonTabButton>
//                 <IonTabButton tab="nfts" href="/nfts">
//                     <IonIcon icon={walletOutline} />
//                 </IonTabButton>
//             </IonTabBar>
//         </IonTabs>
//     </IonReactRouter>
// );
