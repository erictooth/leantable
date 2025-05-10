import { createContext, useContext } from "react";
import type { Config } from "./createConfigFromOpts.tsx";

export const configContext = createContext<Config | null>(null);

export const useConfigContext = () => {
	const v = useContext(configContext);
	if (!v) {
		throw new Error("configContext Provider is required.");
	}
	return v;
};
