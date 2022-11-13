import User from "../store/storeUser";
import Trainings from "../store/storeTrainings";
import Referal from "../store/storeReferal";
import Calculator from "../store/storeCalculator";
import Security from "../store/storeSecurity";
import {createContext} from "react";


export const storeContext = {
    User,
    Trainings,
    Referal,
    Calculator,
    Security
}

export const Context = createContext(storeContext)