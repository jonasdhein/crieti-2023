import axios from "axios";
import { createContext } from "react";

export interface ContextProps {
    idPix: number;

}

axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({children}) => {
    return(
        <AppContext.Provider
        value={
            {
                idPix: 31
            }
        }>
            {children}
        </AppContext.Provider>
    )
}