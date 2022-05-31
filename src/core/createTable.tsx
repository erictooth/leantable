import * as React from "react";
import { createStore } from "solid-js/store";
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

  const TableWrapper = (props: { config: Config }) => {
    const { config } = props;
    const columns = React.useMemo(() => {
      const c = configModifier.columns(config.columns, state);
      return () => c;
    }, [config.columns]);
    const rows = React.useMemo(() => {
      const r = configModifier.rows(config.rows, state);
      return () => r;
    }, [config.rows]);

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <ConfigContext.Provider
            value={React.useMemo(() => ({ columns, rows }), [columns, rows])}
          >
            <renderer.Table>
              <renderer.Header>
                <renderer.HeaderRow>
                  {columns().map((column: Column) => (
                    <renderer.HeaderCell id={column.id} key={column.id}>
                      {column.cell}
                    </renderer.HeaderCell>
                  ))}
                </renderer.HeaderRow>
              </renderer.Header>
              <renderer.Body>
                {rows().map((row: Row) => (
                  <renderer.Row id={row.id} key={row.id}>
                    {columns().map((column: Column) => (
                      <renderer.Cell
                        columnId={column.id}
                        key={column.id}
                        rowId={row.id}
                      >
                        {row.cells[column.id]}
                      </renderer.Cell>
                    ))}
                  </renderer.Row>
                ))}
              </renderer.Body>
            </renderer.Table>
          </ConfigContext.Provider>
        </StateContext.Provider>
      </DispatchContext.Provider>
    );
  };

  return {
    render: (config: Config) => {
      return <TableWrapper config={config} />;
    },
    dispatch,
    state,
  } as const;
};
