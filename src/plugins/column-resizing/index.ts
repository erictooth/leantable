export type ResizedColumnsState = Map<string, number>;

export type ResizedColumnsActions = {
  type: "RESIZE_COLUMN";
  id: string;
  width: number;
};

export const resizedColumns = (
  state: ResizedColumnsState = new Map(),
  action: ResizedColumnsActions
): ResizedColumnsState => {
  switch (action.type) {
    case "RESIZE_COLUMN": {
      const next = new Map(state);
      next.set(action.id, action.width);
      return next;
    }
    default:
      return state;
  }
};
