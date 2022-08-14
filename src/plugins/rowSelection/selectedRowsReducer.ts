import type {
	SelectedRowsActions,
	SelectedRowsState,
} from "./selectedRows.type";

export const selectedRowsReducer = (
	state: SelectedRowsState = new Set(),
	action: SelectedRowsActions
): SelectedRowsState => {
	switch (action.type) {
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
