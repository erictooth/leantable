import { type Accessor, createContext } from "solid-js";
import type { Config } from "../types/Config";
export const ConfigContext = createContext<{
  columns: Accessor<Config["columns"]>;
  rows: Accessor<Config["rows"]>;
}>({
  rows: () => [],
  columns: () => [],
});
