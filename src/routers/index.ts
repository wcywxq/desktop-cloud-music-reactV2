import FindMusic from "@/views/FindMusic"
import PersonalFm from "@/views/PersonalFm"
import Videos from "@/views/Videos"
import Penpal from "@/views/Penpal"
import SearchMusic from "@/views/SearchMusic"

interface RouterArray {
  path: string;
  component: React.FC;
  exact?: boolean;
}

const router: Array<RouterArray> = [
  {
    path: "/",
    component: FindMusic,
    exact: true
  },
  {
    path: "/fm",
    component: PersonalFm
  },
  {
    path: "/videos",
    component: Videos
  },
  {
    path: "/penpal",
    component: Penpal
  },
  {
    path: "/search/:keywords",
    component: SearchMusic
  }
];

export default router
