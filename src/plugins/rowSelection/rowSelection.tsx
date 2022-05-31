import * as React from "react";
import { DispatchContext } from "../../core/context/DispatchContext";
import { StateContext } from "../../core/context/StateContext";
import { selectedRowsReducer } from "./selectedRowsReducer";
import type { Plugin } from "../../core/types/Plugin";
import type {
  SelectedRowsActions,
  SelectedRowsState,
} from "./selectedRows.type";
import { useSignal } from "../../utils";
import { createMemo } from "solid-js";
import { RowIdentifier } from "../../core";

export * from "./selectedRows.type";

export const rowSelectionCheckboxColumnId = "__internal-rowSelection__checkbox";

const pinnedColumnDefintion = {
  id: rowSelectionCheckboxColumnId,
  width: "min-content",
};

export const rowSelection =
  (): Plugin<{ selectedRows: SelectedRowsState }, SelectedRowsActions> =>
  (baseRenderer: any) => {
    const RowSelectionCheckbox = (props: { id: RowIdentifier }) => {
      const state = React.useContext<{ selectedRows: SelectedRowsState }>(
        StateContext as any
      );
      const dispatch = React.useContext(DispatchContext);
      const isChecked = useSignal(
        createMemo(() => state.selectedRows.has(props.id))
      );
      return (
        <baseRenderer.Cell columnId={rowSelectionCheckboxColumnId}>
          <input
            type="checkbox"
            checked={isChecked}
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
        </baseRenderer.Cell>
      );
    };

    return {
      ...baseRenderer,
      HeaderCell: (props: any) => {
        if (props.id !== rowSelectionCheckboxColumnId) {
          return baseRenderer.HeaderCell(props);
        }

        return <baseRenderer.HeaderCell></baseRenderer.HeaderCell>;
      },
      Cell: (props) => {
        if (props.columnId !== rowSelectionCheckboxColumnId) {
          return baseRenderer.Cell(props);
        }
        return <RowSelectionCheckbox id={props.rowId} />;
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
            return modifiers.columns(
              [pinnedColumnDefintion, ...columns],
              state
            );
          },
        };
      },
    };
  };
