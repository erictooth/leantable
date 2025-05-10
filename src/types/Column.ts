import type { ReactNode } from "react";

export type Column = {
	id: string;
	renderCell: (rowIndex: number, rowId: string) => ReactNode;
	renderHeaderCell: () => ReactNode;
};
