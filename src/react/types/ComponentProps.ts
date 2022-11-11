import { type HTMLProps } from "react";
import { Column } from "./Column";
import { Row } from "./Row";

export type ColumnsProp<Data = unknown> = { columns: Column<Data>[] };
export type ColumnProp<Data = unknown> = { column: Column<Data> };
export type RowProp<Data = unknown> = { row: Row<Data> };

export type ComponentProps<Data = unknown> = {
	Table: HTMLProps<HTMLTableElement> &
		ColumnsProp & {
			getTableProps: <P>(props: P) => P;
		};
	Header: HTMLProps<HTMLTableSectionElement>;
	HeaderCell: HTMLProps<HTMLTableCellElement> &
		ColumnProp & {
			getHeaderCellProps: <P extends HTMLProps<HTMLTableCellElement>>(
				props: P
			) => P;
		};
	Body: HTMLProps<HTMLTableSectionElement> & {
		getBodyProps: <P>(props: P) => P;
	};
	Row: HTMLProps<HTMLTableRowElement> &
		RowProp<Data> & { getRowProps: <P>(props: P) => P };
	Cell: HTMLProps<HTMLTableCellElement> & {
		getCellProps: <P extends HTMLProps<HTMLTableCellElement>>(props: P) => P;
	};
};
