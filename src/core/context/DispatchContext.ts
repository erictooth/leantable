import { createContext } from "solid-js";
export const DispatchContext = createContext((action: any): any => undefined);
