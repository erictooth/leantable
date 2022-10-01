import type { Column, Columns } from "./Column";
import type { Row, Rows } from "./Row";
import type { HTMLProps } from "react";
import type { Config } from "./Config";

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
		props: HTMLProps<HTMLTableCellElement> & { column: Column }
	) => JSX.Element;
	Row: (props: HTMLProps<HTMLTableRowElement> & { row: Row }) => JSX.Element;
	Cell: (
		props: HTMLProps<HTMLTableCellElement> & { column: Column; row: Row }
	) => JSX.Element;
	Footer: (props: HTMLProps<HTMLTableSectionElement>) => JSX.Element;
	reducer: <StateArg, ActionsArg>(
		state: State & StateArg,
		action: Actions & ActionsArg
	) => State;
	modifyConfig: <StateArg>(
		modifiers: ConfigModifiers<State & StateArg>
	) => ConfigModifiers<State & StateArg>;
	renderColumns: (
		renderer: TableRenderer
	) => (columns: Columns) => JSX.Element | JSX.Element[];
	renderRows: (
		renderer: TableRenderer
	) => (state: State, config: Config) => JSX.Element[];
	render: (
		renderer: TableRenderer,
		state: State,
		dispatch: any
	) => (config: Config) => JSX.Element;
};
