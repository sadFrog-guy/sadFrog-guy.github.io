import User from "../store/storeUser";
import Trainings from "../store/storeTrainings";
import Referal from "../store/storeReferal";
import {createContext} from "react";
import Theme from "../store/storeTheme";


export const storeContext = {
    User,
    Trainings,
    Referal,
    Theme
}

export const Context = createContext(storeContext)