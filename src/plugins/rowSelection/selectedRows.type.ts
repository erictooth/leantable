import type { RowIdentifier } from "../../core/types/Row";

export type SelectedRowsState = Set<RowIdentifier>;
export type SelectedRowsActions =
  | { type: "SELECT_ROWS"; ids: RowIdentifier[] }
  | { type: "DESELECT_ROWS"; ids: RowIdentifier[] }
  | { type: "DESELECT_ALL_ROWS" };
