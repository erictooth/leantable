import { type Row } from "./Row";
import { type ComponentProps as DefaultComponentProps } from "./ComponentProps";
import { type Column } from "./Column";

export type Config<
	State,
	Actions,
	Data,
	ComponentProps extends DefaultComponentProps
> = {
	columns: Column<unknown>[];
	getTableProps: (props: ComponentProps["Table"]) => ComponentProps["Table"];
	getBodyProps: (props: ComponentProps["Body"]) => ComponentProps["Body"];
	getRowProps: (props: ComponentProps["Row"]) => ComponentProps["Row"];
	getRow: (index: number) => Row<Data>;
	reducers: {
		[Property in keyof State]: (
			state: State[Property],
			action: Actions
		) => State[Property];
	};
};
