import * as React from "react";
import { pinnedColumnsReducer } from "./pinnedColumnsReducer";
import type { Plugin } from "../../core/types/Plugin";
import type {
  PinnedColumnsActions,
  PinnedColumnsState,
} from "./pinnedColumns.type";
import type { Column, ColumnIdentifier } from "../../core/types/Column";
import clsx from "clsx";
import { StateContext } from "../../core/context/StateContext";
import { useSignal } from "../../utils";
import { createMemo } from "solid-js";

export * from "./pinnedColumns.type";

export type ColumnPinningOptions = {
  initiallyPinned?: ColumnIdentifier[];
};

export const columnPinning =
  (
    columnPinningOptions: ColumnPinningOptions = {}
  ): Plugin<{ pinnedColumns: PinnedColumnsState }, PinnedColumnsActions> =>
  (baseRenderer) => {
    return {
      ...baseRenderer,
      HeaderCell: (props) => {
        const state = React.useContext<{ pinnedColumns: PinnedColumnsState }>(
          StateContext as any
        );
        const isPinned = useSignal(
          createMemo(() => state.pinnedColumns.has(props.id))
        );
        return (
          <baseRenderer.HeaderCell
            {...props}
            className={clsx(
              { "leantable__header-cell--pinned": isPinned },
              props.className
            )}
          />
        );
      },
      Cell: (props) => {
        const state = React.useContext<{ pinnedColumns: PinnedColumnsState }>(
          StateContext as any
        );
        const isPinned = useSignal(
          createMemo(() => state.pinnedColumns.has(props.columnId))
        );
        return (
          <baseRenderer.Cell
            {...props}
            className={clsx(
              { "leantable__body-cell--pinned": isPinned },
              props.className
            )}
          />
        );
      },
      reducer: (state, action) => ({
        ...baseRenderer.reducer(state, action),
        pinnedColumns: pinnedColumnsReducer(
          state.pinnedColumns || new Set(columnPinningOptions.initiallyPinned),
          action
        ),
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
