import * as React from "react";
import clsx from "clsx";
import { ConfigContext } from "../../core/context/ConfigContext";
import type { Config } from "../../core/types/Config";
import type { Plugin } from "../../core/types/Plugin";

const getGridTemplateColumns = (columns: Config["columns"]) => {
	return {
		gridTemplateColumns: columns.reduce((accum, column) => {
			return (accum += ` ${column.width || "1fr"}`);
		}, ""),
	};
};

export const gridLayout = (): Plugin => (baseRenderer) => {
	return {
		...baseRenderer,
		Table: (props: any) => {
			const config = React.useContext(ConfigContext);
			const gridStyle = React.useMemo(
				() => getGridTemplateColumns(config.columns()),
				[config.columns()]
			);
			return (
				<baseRenderer.Table
					{...props}
					className={clsx(props.className, "leantable--grid-layout")}
					style={{ ...gridStyle, ...(props.style || {}) }}
				/>
			);
		},
	};
};
