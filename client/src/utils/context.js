import User from "../store/storeUser";
import {createContext} from "react";


export const storeContext = {
    User
}

export const Context = createContext(storeContext)