import type { ColumnIdentifier } from "../../core/types/Column";

export type PinnedColumnsState = Set<ColumnIdentifier>;

export type PinnedColumnsActions =
	| { type: "PIN_COLUMN"; id: ColumnIdentifier }
	| { type: "UNPIN_COLUMN"; id: ColumnIdentifier };
