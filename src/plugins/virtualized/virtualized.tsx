import { useContext } from "react";
import { ConfigContext } from "../../core";
import type { Plugin } from "../../core/types/Plugin";

import type { VirtualizedState } from "./VirtualizedState.type";

export const virtualized =
	(): Plugin<{ virtual: VirtualizedState }> => (baseRenderer) => {
		return {
			...baseRenderer,
			Body: (props) => {
				const config = useContext(ConfigContext) as any;
				return baseRenderer.Body({
					...props,
					style: { height: `${config.totalRows * 40}px` },
				});
			},
			renderRows: (renderer) => (state, config) => {
				return [<p>holy moly</p>];
			},
			reducer: (state, action) => ({
				...baseRenderer.reducer(state, action),
				virtual: ((
					state: VirtualizedState = { windowStart: 0, windowEnd: 0 },
					action: any
				) => state)(state.virtual, action),
			}),
		};
	};
