import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Training from "./pages/Training/Training";

export const LINK_TRAININGS = '/trainings';
export const LINK_CALCULATOR = '/calculator';
export const LINK_REFERAL = '/referal';

const routes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: LINK_TRAININGS,
        element: <Training/>,
    },
    {
        path: LINK_CALCULATOR,
        element: <div>calculator</div>,
    },
    {
        path: LINK_REFERAL,
        element: <div>referal</div>,
    }
]



export const router = createBrowserRouter(routes)