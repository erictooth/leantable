import { Row } from "./Row";
import { type ComponentProps } from "./ComponentProps";
export type Column<Data, Cell = unknown> = {
	/**
	 * Unique identifier for the cells in this column
	 */
	id: string;

	/**
	 * CSS class to apply to header and body cells
	 */
	class?: string;

	renderHeaderCell: () => Cell;
	renderCell: (row: Row<Data>) => Cell;
	getHeaderCellProps?: (
		props: ComponentProps["HeaderCell"]
	) => ComponentProps["HeaderCell"];
	getCellProps?: (props: ComponentProps["Cell"]) => ComponentProps["Cell"];
	width?: string;
	[x: string]: any;
};
