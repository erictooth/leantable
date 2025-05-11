import { type HTMLAttributes, memo, useEffect, useMemo } from "react";
import { configContext } from "./configContext.ts";
import { createConfigFromOpts } from "./createConfigFromOpts.tsx";
import type { Options } from "./types/Options.ts";
import { useSignal } from "@preact/signals-react";

export const Table = memo(function Table(
	props: HTMLAttributes<HTMLTableElement> & Options,
) {
	const { columns, getRowId, plugins, rowCount, ...rest } = props;

	const columnsSignal = useSignal(columns);

	useEffect(() => {
		columnsSignal.value = columns;
	}, [columns]);

	const rowCountSignal = useSignal(rowCount);

	useEffect(() => {
		rowCountSignal.value = rowCount;
	}, [rowCount]);

	const config = useMemo(
		() =>
			createConfigFromOpts({
				columns: columnsSignal,
				getRowId,
				plugins,
				rowCount: rowCountSignal,
			}),
		[plugins],
	);

	return (
		<configContext.Provider value={config}>
			<config.Table {...rest} />
		</configContext.Provider>
	);
});
