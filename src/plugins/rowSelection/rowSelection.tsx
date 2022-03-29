import { splitProps, useContext } from "solid-js";
import { DispatchContext } from "../../core/context/DispatchContext";
import { StateContext } from "../../core/context/StateContext";
import { selectedRowsReducer } from "./selectedRowsReducer";
import type { Plugin } from "../../core/types/Plugin";
import type {
  SelectedRowsActions,
  SelectedRowsState,
} from "./selectedRows.type";

export * from "./selectedRows.type";

const checkboxColumnId = "_internal-rowSelection__checkbox";

export const rowSelection =
  (): Plugin<{ selectedRows: SelectedRowsState }, SelectedRowsActions> =>
  (baseRenderer) => {
    return {
      ...baseRenderer,
      HeaderCell: (props) => {
        if (props.id !== checkboxColumnId) {
          return baseRenderer.HeaderCell(props);
        }

        return <baseRenderer.HeaderCell></baseRenderer.HeaderCell>;
      },
      Cell: (props) => {
        if (props.columnId !== checkboxColumnId) {
          return baseRenderer.Cell(props);
        }
        return null;
      },
      Row: (props) => {
        const state = useContext<{ selectedRows: SelectedRowsState }>(
          StateContext as any
        );
        const dispatch = useContext(DispatchContext);
        const [local, others] = splitProps(props, ["children"]);
        return baseRenderer.Row({
          ...others,
          children: [
            <baseRenderer.Cell columnId={checkboxColumnId}>
              <input
                type="checkbox"
                checked={state.selectedRows.has(props.id)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    dispatch({
                      type: "SELECT_ROWS",
                      ids: [props.id],
                    });
                  } else {
                    dispatch({
                      type: "DESELECT_ROWS",
                      ids: [props.id],
                    });
                  }
                }}
              />
            </baseRenderer.Cell>,
            local.children,
          ],
        });
      },
      reducer: (state, action) => ({
        ...baseRenderer.reducer(state, action),
        selectedRows: selectedRowsReducer(state.selectedRows, action),
      }),
      modifyConfig: (modifiedConfig) => {
        const modifiers = baseRenderer.modifyConfig(modifiedConfig);
        return {
          ...modifiers,
          columns: (columns, state) => {
            return [
              { id: checkboxColumnId, width: "min-content" },
              ...modifiers.columns(columns, state),
            ];
          },
        };
      },
    };
  };
