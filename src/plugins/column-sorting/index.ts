import { BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { type Column, type Plugin } from "../../core";

export enum SortedColumnDirection {
	"ASC" = "ascending",
	"DESC" = "descending",
	"NONE" = "none",
	"OTHER" = "other",
}

export type SortedColumnsState = Map<string, SortedColumnDirection>;

export type SortedColumnActions =
	| {
			type: "SORT_COLUMN";
			id: string;
			direction: SortedColumnDirection;
	  }
	| { type: "SORT_COLUMN_TOGGLE"; id: string }
	| { type: "SORT_COLUMN_CLEAR"; id: string };

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

export const sortedColumns = (
	state: SortedColumnsState = new Map(),
	action: SortedColumnActions
): SortedColumnsState => {
	switch (action.type) {
		case "SORT_COLUMN": {
			const next = new Map(); // clone previous state for multi-sort

			if (action.direction === SortedColumnDirection.NONE) {
				next.delete(action.id);
			} else {
				next.set(action.id, action.direction);
			}

			return next;
		}
		case "SORT_COLUMN_TOGGLE": {
			const next = new Map();
			const direction = toggleDirection(state.get(action.id));

			if (direction === SortedColumnDirection.NONE) {
				next.delete(action.id);
			} else {
				next.set(action.id, direction);
			}

			return next;
		}
		case "SORT_COLUMN_CLEAR": {
			const next = new Map();
			next.delete(action.id);
			return next;
		}
		default:
			return state;
	}
};

export const columnSortSelector =
	(column: Column<unknown>) =>
	(state: { sortedColumns: BehaviorSubject<SortedColumnsState> }) =>
		state.sortedColumns.pipe(
			map(
				(sortedColumns) =>
					sortedColumns.get(column.id) || SortedColumnDirection.NONE
			),
			distinctUntilChanged()
		);

export const columnSorting =
	(): Plugin<{ sortedColumns: SortedColumnsState }, SortedColumnActions> =>
	(config) => {
		return {
			...config,
			reducers: {
				...config.reducers,
				sortedColumns,
			} as any,
		};
	};
