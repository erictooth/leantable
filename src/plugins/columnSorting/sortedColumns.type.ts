import type { ColumnIdentifier } from "../../core/types/Column";

export enum SortedColumnDirection {
	"ASC" = "ASC",
	"DESC" = "DESC",
	"NONE" = "NONE",
}

export type SortedColumnsState = Map<ColumnIdentifier, SortedColumnDirection>;

export type SortedColumnActions =
	| {
			type: "SORT_COLUMN";
			id: ColumnIdentifier;
			direction: SortedColumnDirection;
	  }
	| { type: "SORT_COLUMN_TOGGLE"; id: ColumnIdentifier }
	| { type: "SORT_COLUMN_CLEAR"; id: ColumnIdentifier };
