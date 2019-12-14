import Loadable from "react-loadable";
import { Loading } from "./Loading";

interface routerType {
  path: string;
  component: any;
  exact: boolean;
}

export const router: Array<routerType> = [
  {
    path: "/",
    component: Loadable({ loader: () => import('@/views/FindMusic'), loading: Loading }),
    exact: true
  },
  {
    path: "/fm",
    component: Loadable({ loader: () => import('@/views/PersonalFm'), loading: Loading }),
    exact: false
  },
  {
    path: "/videos",
    component: Loadable({ loader: () => import('@/views/Videos'), loading: Loading }),
    exact: false
  },
  {
    path: "/penpal",
    component: Loadable({ loader: () => import('@/views/Penpal'), loading: Loading }),
    exact: false
  },
  {
    path: "/search",
    component: Loadable({ loader: () => import('@/views/SearchMusic'), loading: Loading }),
    exact: false
  },
  {
    path: "/setting",
    component: Loadable({ loader: () => import('@/views/Settings'), loading: Loading }),
    exact: false
  }
];