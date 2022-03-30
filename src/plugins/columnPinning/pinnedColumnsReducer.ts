import type {
  PinnedColumnsActions,
  PinnedColumnsState,
} from "./pinnedColumns.type";

export const pinnedColumnsReducer = (
  state: PinnedColumnsState = new Set(),
  action: PinnedColumnsActions
): PinnedColumnsState => {
  switch (action.type) {
    case "PIN_COLUMN": {
      const next = new Set(state);
      next.add(action.id);
      return next;
    }
    case "UNPIN_COLUMN": {
      const next = new Set(state);
      next.delete(action.id);
      return next;
    }
    default:
      return state;
  }
};
