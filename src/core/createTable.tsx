import { createEffect, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { For } from "solid-js/web";
import { baseRenderer } from "./baseRenderer";
import { ConfigContext } from "./context/ConfigContext";
import { DispatchContext } from "./context/DispatchContext";
import { StateContext } from "./context/StateContext";
import type { Column } from "./types/Column";
import type { Config } from "./types/Config";
import type { Plugin } from "./types/Plugin";
import type { Row } from "./types/Row";
import type { TableRenderer } from "./types/TableRenderer";

export const createTable = <S, A>({ plugins }: { plugins: Plugin[] }) => {
  const renderer: TableRenderer<S, A> = plugins.reduce(
    (v: TableRenderer<any, any>, f) => f(v),
    baseRenderer
  );

  const [state, setState] = createStore(
    renderer.reducer({} as any, { type: "INITIALIZE" } as any)
  );

  const dispatch = (action: A) => {
    setState(renderer.reducer(state, action));
  };

  const configModifier = renderer.modifyConfig({
    columns: (columns) => columns,
    rows: (rows) => rows,
  });

  return {
    render: (config: Config) => {
      const columns = createMemo(() => {
        return configModifier.columns(config.columns, state);
      });
      const rows = createMemo(() => {
        return configModifier.rows(config.rows, state);
      });
      return (
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>
            <ConfigContext.Provider value={{ columns, rows }}>
              <renderer.Table>
                <renderer.Header>
                  <renderer.HeaderRow>
                    <For each={columns()}>
                      {({ cell, ...rest }: Column) => (
                        <renderer.HeaderCell {...rest}>
                          {cell}
                        </renderer.HeaderCell>
                      )}
                    </For>
                  </renderer.HeaderRow>
                </renderer.Header>
                <renderer.Body>
                  <For each={rows()}>
                    {(row: Row) => (
                      <renderer.Row id={row.id}>
                        <For each={columns()}>
                          {(column: Column) => (
                            <renderer.Cell columnId={column.id}>
                              {row.cells[column.id]}
                            </renderer.Cell>
                          )}
                        </For>
                      </renderer.Row>
                    )}
                  </For>
                </renderer.Body>
              </renderer.Table>
            </ConfigContext.Provider>
          </StateContext.Provider>
        </DispatchContext.Provider>
      );
    },
    dispatch,
    state,
  } as const;
};
