import { createContext } from "react";

export interface ContextProps {
    idPix: number;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

