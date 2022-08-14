import {
	SortedColumnDirection,
	type SortedColumnActions,
	type SortedColumnsState,
} from "./sortedColumns.type";

const toggleDirection = (
	direction?: SortedColumnDirection
): SortedColumnDirection => {
	switch (direction) {
		case SortedColumnDirection.ASC:
			return SortedColumnDirection.DESC;

		case SortedColumnDirection.DESC:
			return SortedColumnDirection.NONE;

		default:
			return SortedColumnDirection.ASC;
	}
};

export const sortedColumnsReducer = (
	state: SortedColumnsState = new Map(),
	action: SortedColumnActions
): SortedColumnsState => {
	switch (action.type) {
		case "SORT_COLUMN":
		case "SORT_COLUMN_TOGGLE": {
			const next = new Map(); // clone previous state for multi-sort
			const direction = toggleDirection(state.get(action.id));

			if (direction === SortedColumnDirection.NONE) {
				next.delete(action.id);
			} else {
				next.set(action.id, direction);
			}

			return next;
		}
		case "SORT_COLUMN_CLEAR":
		default:
			return state;
	}
};
