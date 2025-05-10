import { type HTMLAttributes, memo, useMemo } from "react";
import { configContext } from "./configContext.ts";
import { createConfigFromOpts } from "./createConfigFromOpts.tsx";
import type { Options } from "./types/Options.ts";

export const Table = memo(function Table(
	props: HTMLAttributes<HTMLTableElement> & Options,
) {
	const { columns, getRowId, plugins, rowCount, ...rest } = props;
	const config = useMemo(
		() => createConfigFromOpts({ columns, getRowId, plugins, rowCount }),
		[],
	);
	return (
		<configContext.Provider value={config}>
			<config.Table {...rest} />
		</configContext.Provider>
	);
});
