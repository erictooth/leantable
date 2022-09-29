import { createContext } from "react";
import type { Config } from "../types/Config";
export const ConfigContext = createContext<{
	columns: Config["columns"];
	rows: Config["rows"];
}>({
	rows: [],
	columns: [],
});
