import { forwardRef, type HTMLAttributes } from "react";
import { useConfigContext } from "../configContext.ts";
import clsx from "clsx";
import type { RenderedRow } from "../types/RenderedRow.ts";

export const Row = forwardRef<
	HTMLTableRowElement,
	HTMLAttributes<HTMLTableRowElement> & {
		renderedRow: RenderedRow;
	}
>(function Row(props, ref) {
	const config = useConfigContext();
	const { renderedRow, ...rest } = props;
	const isOdd = props.renderedRow[0] % 2 === 1;
	return (
		<tr
			{...rest}
			ref={ref as any}
			className={clsx(props.className, {
				"lt-row--odd": isOdd,
				"lt-row--even": !isOdd,
			})}
		>
			{config.columns.value.map((column) => {
				return (
					<config.Cell
						key={column.id}
						column={column}
						rowId={renderedRow[1]}
						dataIndex={renderedRow[0]}
						renderCell={column.renderCell}
					/>
				);
			})}
		</tr>
	);
});
