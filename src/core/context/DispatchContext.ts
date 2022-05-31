import { createContext } from "react";
export const DispatchContext = createContext((action: any): any => undefined);
