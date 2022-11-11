export type PinnedColumnsState = Set<string>;

export type PinnedColumnsActions =
  | { type: "PIN_COLUMNS"; ids: string[] }
  | { type: "UNPIN_COLUMNS"; ids: string[] };

export const pinnedColumns = (
  state: PinnedColumnsState = new Set(),
  action: PinnedColumnsActions
): PinnedColumnsState => {
  switch (action.type) {
    case "PIN_COLUMNS": {
      return new Set([...state, ...action.ids]);
    }
    case "UNPIN_COLUMNS": {
      const next = new Set(state);
      action.ids.forEach((id) => next.delete(id));
      return next;
    }
    default:
      return state;
  }
};
