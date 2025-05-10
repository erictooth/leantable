import type { ReactNode } from "react";
import type { Plugin } from "./Plugin.ts";

export type Options = {
	columns: {
		id: string;
		renderCell: (rowIndex: number, rowId: string) => ReactNode;
		renderHeaderCell: () => ReactNode;
	}[];
	getRowId?: (rowIndex: number) => string;
	plugins?: Plugin[];
	rowCount: number;
};
