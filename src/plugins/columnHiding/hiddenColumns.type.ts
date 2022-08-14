import type { ColumnIdentifier } from "../../core/types/Column";

export type HiddenColumnsState = Set<ColumnIdentifier>;

export type HiddenColumnActions =
	| { type: "HIDE_COLUMN"; id: ColumnIdentifier }
	| { type: "SHOW_COLUMN"; id: ColumnIdentifier }
	| { type: "HIDE_COLUMN_TOGGLE"; id: ColumnIdentifier };
