import type { TableRenderer } from "../core";
import type { Plugin } from "../core/types/Plugin";

export const testPlugin = (): Plugin => (baseRenderer) => {
	const Body: TableRenderer["Body"] = (props) => {
		return baseRenderer.Body({
			...props,
		});
	};
	return {
		...baseRenderer,
		Body,
	};
};
