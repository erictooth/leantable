import { pinnedColumnsReducer } from "./pinnedColumnsReducer";
import type { Plugin } from "../../core/types/Plugin";
import type {
  PinnedColumnsActions,
  PinnedColumnsState,
} from "./pinnedColumns.type";
import type { Column } from "../../core/types/Column";

export * from "./pinnedColumns.type";

export const columnPinning =
  (): Plugin<{ pinnedColumns: PinnedColumnsState }, PinnedColumnsActions> =>
  (baseRenderer) => {
    return {
      ...baseRenderer,
      reducer: (state, action) => ({
        ...baseRenderer.reducer(state, action),
        pinnedColumns: pinnedColumnsReducer(state.pinnedColumns, action),
      }),
      modifyConfig: (modifiedConfig) => {
        const modifiers = baseRenderer.modifyConfig(modifiedConfig);
        return {
          ...modifiers,
          columns: (columns, state) => {
            const [pinnedColumns, rest] = modifiers
              .columns(columns, state)
              .reduce(
                (accum, column) => {
                  if (state.pinnedColumns.has(column.id)) {
                    accum[0].push(column);
                  } else {
                    accum[1].push(column);
                  }
                  return accum;
                },
                [[] as Column[], [] as Column[]]
              );

            return [...pinnedColumns, ...rest];
          },
        };
      },
    };
  };
