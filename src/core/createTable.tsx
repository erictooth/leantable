import { createStore } from "solid-js/store";
import { baseRenderer } from "./baseRenderer";
import type { Plugin } from "./types/Plugin";
import type { TableRenderer } from "./types/TableRenderer";

export const createTable = <P extends readonly Plugin[]>({
	plugins,
}: {
	plugins: P;
}) => {
	const renderer: TableRenderer = plugins.reduce(
		(v: TableRenderer, f) => f(v),
		baseRenderer
	);

	const [state, setState] = createStore(
		renderer.reducer({}, { type: "INITIALIZE" }) as any
	);

	const dispatch = (action: unknown) => {
		setState(renderer.reducer(state, action));
	};

	return {
		render: renderer.render(renderer, state, dispatch),
		dispatch,
		state,
	} as const;
};
