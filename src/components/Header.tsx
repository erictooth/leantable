import { forwardRef, type HTMLAttributes } from "react";
import { useConfigContext } from "../configContext.ts";

export const Header = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(function Header(props, ref) {
	const config = useConfigContext();
	return (
		<thead {...props} ref={ref}>
			<tr>
				{config.columns.value.map((column) => (
					<config.HeaderCell
						key={column.id}
						column={column}
						renderHeaderCell={column.renderHeaderCell}
					/>
				))}
			</tr>
		</thead>
	);
});
