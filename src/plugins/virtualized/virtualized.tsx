import { useContext, useMemo } from "react";
import { ConfigContext } from "../../core";
import type { Plugin } from "../../core/types/Plugin";
import type { Config } from "../../core/types/Config";

import type { VirtualizedState } from "./VirtualizedState.type";

const getGridTemplateColumns = (columns: Config["columns"]) => {
	return {
		gridTemplateColumns: columns.reduce((accum, column) => {
			return (accum += ` ${column.width || "1fr"}`);
		}, ""),
	};
};

export const virtualized =
	(): Plugin<{ virtual: VirtualizedState }> => (baseRenderer) => {
		return {
			...baseRenderer,
			Header: (props) => {
				const config = useContext(ConfigContext);
				const gridStyle = useMemo(
					() => getGridTemplateColumns(config.columns),
					[config.columns]
				);
				return baseRenderer.Header({
					...props,
					style: { ...gridStyle },
				});
			},
			Body: (props) => {
				const config = useContext(ConfigContext);
				const gridStyle = useMemo(
					() => getGridTemplateColumns(config.columns),
					[config.columns]
				);
				return baseRenderer.Body({
					...props,
					style: { height: "1000px", ...gridStyle },
				});
			},
			renderRows: (renderer) => (state, config) => {
				return [...baseRenderer.renderRows(renderer)(state, config)];
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
