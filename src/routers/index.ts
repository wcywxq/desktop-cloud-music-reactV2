import Loadable from 'react-loadable';
import { Loading } from "./Loading";

interface RouterArray {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

const router: Array<RouterArray> = [
    {
        path: "/",
        component: Loadable({ loader: () => import('@/views/FindMusic'), loading: Loading }),
        exact: true
    },
    {
        path: "/fm",
        component: Loadable({ loader: () => import('@/views/PersonalFm'), loading: Loading })
    },
    {
        path: "/videos",
        component: Loadable({ loader: () => import('@/views/Videos'), loading: Loading })
    },
    {
        path: "/penpal",
        component: Loadable({ loader: () => import('@/views/Penpal'), loading: Loading })
    },
    {
        path: "/search/:keywords/:type",
        component: Loadable({ loader: () => import('@/views/SearchMusic'), loading: Loading })
    }
];

export default router
