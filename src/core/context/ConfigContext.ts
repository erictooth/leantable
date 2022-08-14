import { createContext } from "react";
import { type Accessor } from "solid-js/types/reactive/signal";
import type { Config } from "../types/Config";
export const ConfigContext = createContext<{
	columns: Accessor<Config["columns"]>;
	rows: Accessor<Config["rows"]>;
}>({
	rows: () => [],
	columns: () => [],
});
