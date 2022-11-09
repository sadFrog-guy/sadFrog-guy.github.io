import User from "../store/storeUser";
import Trainings from "../store/storeTrainings";
import Referal from "../store/storeReferal";
import Calculator from "../store/storeCalculator";
import {createContext} from "react";


export const storeContext = {
    User,
    Trainings,
    Referal,
    Calculator
}

export const Context = createContext(storeContext)