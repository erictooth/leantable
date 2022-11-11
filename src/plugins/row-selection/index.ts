import { Row } from "../../core";
import { BehaviorSubject, distinctUntilChanged, map } from "rxjs";
import { Plugin } from "../../core/types/Plugin";

export type SelectedRowsState = Set<string>;

export type SelectedRowsActions =
	| { type: "SELECT_ROWS"; ids: string[] }
	| { type: "DESELECT_ROWS"; ids: string[] }
	| { type: "TOGGLE_ROW"; id: string }
	| { type: "DESELECT_ALL_ROWS" };

export const selectedRows = (
	state: SelectedRowsState,
	action: SelectedRowsActions
): SelectedRowsState => {
	if (!state) {
		state = new Set();
	}
	switch (action.type) {
		case "TOGGLE_ROW": {
			const next = new Set(state);
			if (next.has(action.id)) {
				next.delete(action.id);
			} else {
				next.add(action.id);
			}
			return next;
		}
		case "SELECT_ROWS": {
			return new Set([...state, ...action.ids]);
		}
		case "DESELECT_ALL_ROWS": {
			return new Set();
		}
		case "DESELECT_ROWS": {
			const next = new Set(state);
			action.ids.forEach((id) => next.delete(id));
			return next;
		}
		default:
			return state;
	}
};

export const rowSelection =
	(): Plugin<{ selectedRows: SelectedRowsState }, SelectedRowsActions> =>
	(config) => {
		return {
			...config,
			reducers: {
				...config.reducers,
				selectedRows,
			} as any,
		};
	};

export const rowIsCheckedSelector =
	(row: Row<unknown>) =>
	(state: { selectedRows: BehaviorSubject<SelectedRowsState> }) =>
		state.selectedRows.pipe(
			map((x) => x.has(row.id)),
			distinctUntilChanged()
		);
