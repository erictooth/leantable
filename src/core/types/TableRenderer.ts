import type { Columns } from "./Column";
import type { Rows } from "./Row";

export type ConfigModifiers<State> = {
	columns: (columns: Columns, state: State) => Columns;
	rows: (rows: Rows, state: State) => Rows;
};

export type TableRenderer<State = unknown, Actions = unknown> = {
	Table: (props: any) => JSX.Element;
	Header: (props: any) => JSX.Element;
	Body: (props: any) => JSX.Element;
	HeaderRow: (props: any) => JSX.Element;
	HeaderCell: (props: any) => JSX.Element;
	Row: (props: any) => JSX.Element;
	Cell: (props: any) => JSX.Element;
	Footer: (props: any) => JSX.Element;
	reducer: <StateArg, ActionsArg>(
		state: State & StateArg,
		action: Actions & ActionsArg
	) => State;
	modifyConfig: <StateArg>(
		modifiers: ConfigModifiers<State & StateArg>
	) => ConfigModifiers<State & StateArg>;
};
