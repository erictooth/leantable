import type { TableRenderer } from "../core";
import type { Plugin } from "../core/types/Plugin";

export const testPlugin = (): Plugin => (baseRenderer: any) => {
	const Cell: TableRenderer["Cell"] = (props) => {
		return baseRenderer.Cell(props);
	};
	return {
		...baseRenderer,
		Cell,
	};
};
