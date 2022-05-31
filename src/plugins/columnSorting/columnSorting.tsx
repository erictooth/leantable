import * as React from "react";
import clsx from "clsx";
import { DispatchContext } from "../../core/context/DispatchContext";
import { sortedColumnsReducer } from "./sortedColumnsReducer";
import type { Plugin } from "../../core/types/Plugin";
import type {
  SortedColumnActions,
  SortedColumnsState,
} from "./sortedColumns.type";

export * from "./sortedColumns.type";

export const columnSorting =
  (): Plugin<{ sortedColumns: SortedColumnsState }, SortedColumnActions> =>
  (baseRenderer) => {
    return {
      ...baseRenderer,
      HeaderCell: (props) => {
        const dispatch = React.useContext(DispatchContext);
        const handleClick: EventListener = React.useCallback(() => {
          dispatch({ type: "SORT_COLUMN_TOGGLE", id: props.id });
        }, [props.id]);
        return (
          <baseRenderer.HeaderCell
            {...props}
            className={clsx(
              props.className,
              "leantable__header-cell--sortable"
            )}
            onClick={handleClick}
          />
        );
      },
      reducer: (state, action) => ({
        ...baseRenderer.reducer(state, action),
        sortedColumns: sortedColumnsReducer(state.sortedColumns, action),
      }),
    };
  };
