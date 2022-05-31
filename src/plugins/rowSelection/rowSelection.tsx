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

const checkboxColumnId = "__internal-rowSelection__checkbox";

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
        <baseRenderer.Cell columnId={checkboxColumnId}>
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
      Row: (props: any) => {
        const { children, ...rest } = props;

        return baseRenderer.Row({
          ...rest,
          children: [
            <RowSelectionCheckbox id={props.id} key={props.id} />,
            children,
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
