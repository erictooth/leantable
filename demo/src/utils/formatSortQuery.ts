import { SortedColumnsState } from "../../../dist-esm/plugins/column-sorting";

export const formatSortQuery = (sortedColumns: SortedColumnsState): string => {
	return Array.from(sortedColumns)
		.map(([id, direction]) => {
			return `${direction === "descending" ? "-" : ""}${id}`;
		})
		.join(",");
};
