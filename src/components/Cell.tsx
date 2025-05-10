import { forwardRef, type HTMLAttributes } from "react";
import type { InternalColumn } from "../types/InternalColumn.ts";

export const Cell = forwardRef<
	HTMLTableCellElement,
	HTMLAttributes<HTMLTableCellElement> & {
		column: InternalColumn;
		dataIndex: number;
		renderCell: InternalColumn["renderCell"];
		rowId: string;
	}
>(function Cell(props, ref) {
	const { column, dataIndex, rowId, renderCell, ...rest } = props;
	return (
		<td {...rest} ref={ref}>
			{renderCell(dataIndex, rowId)}
		</td>
	);
});
