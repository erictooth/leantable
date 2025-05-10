import type { Plugin } from "./Plugin.ts";
import type { Column } from "./Column.ts";

export type Options = {
	columns: Column[];
	getRowId?: (rowIndex: number) => string;
	plugins?: Plugin[];
	rowCount: number;
};
