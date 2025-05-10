import type { ReactNode } from "react";

export type InternalColumn = {
	id: string;
	renderCell: (rowIndex: number, rowId: string) => ReactNode;
	renderHeaderCell: () => ReactNode;
};
