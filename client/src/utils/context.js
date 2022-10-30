import User from "../store/storeUser";
import Trainings from "../store/storeTrainings";
import {createContext} from "react";


export const storeContext = {
    User,
    Trainings
}

export const Context = createContext(storeContext)