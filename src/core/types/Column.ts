import { Row } from "./Row";
import { type ComponentProps } from "./ComponentProps";
export type Column<Data, Cell = unknown> = {
	id: string;
	renderHeaderCell: () => Cell;
	renderCell: (row: Row<Data>) => Cell;
	getHeaderCellProps?: (
		props: ComponentProps["HeaderCell"]
	) => ComponentProps["HeaderCell"];
	getCellProps?: (props: ComponentProps["Cell"]) => ComponentProps["Cell"];
	width?: string;
	[x: string]: any;
};
