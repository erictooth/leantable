import type { HTMLProps } from "react";
import type { ColumnIdentifier } from "./Column";

export type RowIdentifier = string;

export type Row = {
	id: RowIdentifier;
	cells: Record<ColumnIdentifier, JSX.Element | string | number>;
	props?: HTMLProps<HTMLTableRowElement>;
};

export type Rows = Row[];
