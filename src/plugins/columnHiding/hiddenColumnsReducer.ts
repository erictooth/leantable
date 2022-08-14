import type {
	HiddenColumnActions,
	HiddenColumnsState,
} from "./hiddenColumns.type";

export const hiddenColumnsReducer = (
	state: HiddenColumnsState = new Set(),
	action: HiddenColumnActions
): HiddenColumnsState => {
	switch (action.type) {
		case "HIDE_COLUMN": {
			const next = new Set(state);
			next.add(action.id);
			return next;
		}
		case "SHOW_COLUMN": {
			const next = new Set(state);
			next.delete(action.id);
			return next;
		}
		case "HIDE_COLUMN_TOGGLE": {
			const next = new Set(state);
			if (next.has(action.id)) {
				next.delete(action.id);
			} else {
				next.add(action.id);
			}
			return next;
		}
		default:
			return state;
	}
};
