import { hiddenColumnsReducer } from "./hiddenColumnsReducer";
import type { Plugin } from "../../core/types/Plugin";
import type {
	HiddenColumnActions,
	HiddenColumnsState,
} from "./hiddenColumns.type";

export const columnHiding =
	(): Plugin<{ hiddenColumns: HiddenColumnsState }, HiddenColumnActions> =>
	(baseRenderer) => {
		return {
			...baseRenderer,
			reducer: (state, action) => ({
				...baseRenderer.reducer(state, action),
				hiddenColumns: hiddenColumnsReducer(state.hiddenColumns, action),
			}),
			modifyConfig: (modifiedConfig) => {
				const modifiers = baseRenderer.modifyConfig(modifiedConfig);
				return {
					...modifiers,
					columns: (columns, state) => {
						return modifiers
							.columns(columns, state)
							.filter((column) => !state.hiddenColumns.has(column.id));
					},
				};
			},
		};
	};
