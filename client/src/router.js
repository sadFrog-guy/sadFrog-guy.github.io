import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Training from "./pages/Training/Training";
import Referal from "./pages/Referal";
import TrainingDetail from "./pages/Training/TrainingDetail";
import Calculator from "./pages/Calculator";
import NotAuth from "./pages/NotAuth";
import TrainingFrame from "./pages/Training/TrainingFrame";

export const LINK_TRAININGS = '/trainings';
export const LINK_TRAININGS_ITEM = '/trainings/:id';
export const LINK_CALCULATOR = '/calculator';
export const LINK_REFERAL = '/referal';
export const NOT_AUTH = '/not-auth'

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
        path: LINK_TRAININGS_ITEM,
        element: <TrainingFrame/>,
    },
    {
        path: LINK_CALCULATOR,
        element: <Calculator/>,
    },
    {
        path: LINK_REFERAL,
        element: <Referal/>,
    },
    {
        path: NOT_AUTH,
        element: <NotAuth/>
    }
]



export const router = createBrowserRouter(routes)