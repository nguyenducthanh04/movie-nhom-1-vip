import Home from "~/pages/Home";
import Detail from "~/pages/Detail";
import WatchMovie from "~/pages/WatchMovie";
import MovieOdd from "~/pages/MovieOdd";
import Movies from "~/pages/Movies";
import Anime from "~/pages/Anime";
import Search from "~/pages/Search";
import Tvshow from "~/pages/Tvshow";
import SavedMovie from "~/pages/SavedMovie";
import About from "~/pages/About";
import Login from "~/pages/Login/Login";
import Register from "~/pages/Register/register";
import Verify from "~/pages/Verify/Verify";
import ResetVerify from "~/pages/ResetVerify/ResetVerify";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/detail/:ten_dia_chi_phim", component: Detail },
    { path: "/watch-movie/:ten_dia_chi_phim", component: WatchMovie },
    { path: "/phim-le", component: MovieOdd },
    { path: "/phim-bo", component: Movies },
    { path: "/anime", component: Anime },
    { path: "/search", component: Search },
    { path: "/tv-shows", component: Tvshow },
    { path: "/saved-movie", component: SavedMovie },
    { path: "/about", component: About },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/verify", component: Verify },
    { path: "/reset-verify", component: ResetVerify },

];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
