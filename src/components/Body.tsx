import type { ReadonlySignal } from "@preact/signals-react";
import { useConfigContext } from "../configContext.ts";
import { forwardRef, type HTMLAttributes } from "react";
import type { RenderedRow } from "../types/RenderedRow.ts";

export const Body = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement> & {
		renderedRows: ReadonlySignal<RenderedRow[]>;
	}
>(function Body(props, ref) {
	const { renderedRows, ...rest } = props;
	const config = useConfigContext();
	const rows = props.renderedRows.value.map((renderedRow) => (
		<config.Row key={renderedRow[1]} renderedRow={renderedRow} />
	));
	return (
		<tbody {...rest} ref={ref}>
			{rows}
		</tbody>
	);
});
