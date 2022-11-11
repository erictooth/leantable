export type ExpandedRowsState = Set<string>;

export type ExpandedRowsActions =
  | { type: "EXPAND_ROWS"; ids: string[] }
  | { type: "COLLAPSE_ROWS"; ids: string[] };

export const expandedRows = (
  state: ExpandedRowsState = new Set(),
  action: ExpandedRowsActions
): ExpandedRowsState => {
  switch (action.type) {
    case "EXPAND_ROWS": {
      return new Set([...state, ...action.ids]);
    }
    case "COLLAPSE_ROWS": {
      const next = new Set(state);
      action.ids.forEach((id) => next.delete(id));
      return next;
    }
    default:
      return state;
  }
};
