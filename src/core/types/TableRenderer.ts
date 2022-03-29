import type { Component, JSX } from "solid-js";
import type { ColumnIdentifier, Columns } from "./Column";
import type { RowIdentifier, Rows } from "./Row";

export type ConfigModifiers<State> = {
  columns: (columns: Columns, state: State) => Columns;
  rows: (rows: Rows, state: State) => Rows;
};

export type TableRenderer<State = unknown, Actions = unknown> = {
  Table: Component<JSX.HTMLAttributes<HTMLTableElement>>;
  Header: Component<JSX.HTMLAttributes<HTMLTableSectionElement>>;
  Body: Component<JSX.HTMLAttributes<HTMLTableSectionElement>>;
  HeaderRow: Component<JSX.HTMLAttributes<HTMLTableRowElement>>;
  HeaderCell: Component<JSX.HTMLAttributes<HTMLTableCellElement>>;
  Row: Component<
    JSX.HTMLAttributes<HTMLTableRowElement> & { id: RowIdentifier }
  >;
  Cell: (
    props: JSX.HTMLAttributes<HTMLTableCellElement> & {
      columnId: ColumnIdentifier;
    }
  ) => JSX.Element;
  Footer: Component<JSX.HTMLAttributes<HTMLTableSectionElement>>;
  reducer: <StateArg, ActionsArg>(
    state: State & StateArg,
    action: Actions & ActionsArg
  ) => State;
  modifyConfig: <StateArg>(
    modifiers: ConfigModifiers<State & StateArg>
  ) => ConfigModifiers<State & StateArg>;
};
