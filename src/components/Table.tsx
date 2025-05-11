import { useConfigContext } from "../configContext.ts";
import { forwardRef, type HTMLAttributes } from "react";

export const Table = forwardRef<
	HTMLTableElement,
	HTMLAttributes<HTMLTableElement>
>(function Table(props, ref) {
	const config = useConfigContext();
	return (
		<table {...props} ref={ref}>
			<config.Header />
			<config.Body renderedRows={config.renderedRows} />
		</table>
	);
});
