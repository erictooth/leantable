import { forwardRef, type HTMLAttributes } from "react";
import type { InternalColumn } from "../types/InternalColumn.ts";

export const HeaderCell = forwardRef<
	HTMLTableCellElement,
	HTMLAttributes<HTMLTableHeaderCellElement> & {
		column: InternalColumn;
		renderHeaderCell: InternalColumn["renderHeaderCell"];
	}
>(function HeaderCell(props, ref) {
	const { column, renderHeaderCell, ...rest } = props;
	return (
		<th {...rest} ref={ref}>
			{renderHeaderCell()}
		</th>
	);
});
