import axios from "axios";
import { createContext, useState } from "react";
import { UserProps } from "../types/user.t";
import { findUser } from "../services/pix.service";

export interface ContextProps {
    user: UserProps;
    getUser: () => void;
    //setBalance: (n: number) => void;
}

axios.defaults.baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const AppContext = createContext<ContextProps>({} as ContextProps);

export const AppProvider = ({children}) => {

    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [balance, setBalance] = useState<number>(0);

    const getUser = async () => {
        const idPix = process.env.EXPO_PUBLIC_ID_PIX;

        const meuUsuario = await findUser(Number.parseInt(idPix));
        console.log('MEU USUARIO= ', meuUsuario);
        setUser(meuUsuario);
    }

    return(
        <AppContext.Provider
        value={
            {
                user,
                getUser,
            }
        }>
            {children}
        </AppContext.Provider>
    )
}