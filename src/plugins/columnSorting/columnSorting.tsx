import { useContext } from "solid-js";
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
      Table: (props) => {
        return (
          <baseRenderer.Table
            {...props}
            class={`lean-table--sortable ${props.class || ""}`}
          />
        );
      },
      HeaderCell: (props) => {
        const dispatch = useContext(DispatchContext);
        const handleClick: EventListener = () => {
          dispatch({ type: "SORT_COLUMN_TOGGLE", id: props.id });
        };
        return <baseRenderer.HeaderCell {...props} onClick={handleClick} />;
      },
      reducer: (state, action) => ({
        ...baseRenderer.reducer(state, action),
        sortedColumns: sortedColumnsReducer(state.sortedColumns, action),
      }),
    };
  };
