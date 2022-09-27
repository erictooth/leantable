import type { Columns } from "./Column";
import type { Rows } from "./Row";
import type { HTMLProps } from "react";

export type ConfigModifiers<State> = {
	columns: (columns: Columns, state: State) => Columns;
	rows: (rows: Rows, state: State) => Rows;
};

export type TableRenderer<State = unknown, Actions = unknown> = {
	Table: (props: HTMLProps<HTMLTableElement>) => JSX.Element;
	Header: (props: HTMLProps<HTMLTableSectionElement>) => JSX.Element;
	Body: (props: HTMLProps<HTMLTableSectionElement>) => JSX.Element;
	HeaderRow: (props: HTMLProps<HTMLTableRowElement>) => JSX.Element;
	HeaderCell: (
		props: HTMLProps<HTMLTableCellElement> & { id: string }
	) => JSX.Element;
	Row: (props: HTMLProps<HTMLTableRowElement>) => JSX.Element;
	Cell: (
		props: HTMLProps<HTMLTableCellElement> & { columnId: string; rowId: string }
	) => JSX.Element;
	Footer: (props: HTMLProps<HTMLTableSectionElement>) => JSX.Element;
	reducer: <StateArg, ActionsArg>(
		state: State & StateArg,
		action: Actions & ActionsArg
	) => State;
	modifyConfig: <StateArg>(
		modifiers: ConfigModifiers<State & StateArg>
	) => ConfigModifiers<State & StateArg>;
};
