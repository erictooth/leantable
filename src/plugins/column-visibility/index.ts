export type HiddenColumnsState = Set<string>;

export type HiddenColumnActions =
  | { type: "HIDE_COLUMNS"; ids: string[] }
  | { type: "UNHIDE_COLUMNS"; ids: string[] };

export const hiddenColumns = (
  state: HiddenColumnsState = new Set(),
  action: HiddenColumnActions
): HiddenColumnsState => {
  switch (action.type) {
    case "HIDE_COLUMNS": {
      return new Set([...state, ...action.ids]);
    }
    case "UNHIDE_COLUMNS": {
      const next = new Set(state);
      action.ids.forEach((id) => next.delete(id));
      return next;
    }
    default:
      return state;
  }
};
