import { type Column } from "../../core";
export const getGridTemplateColumns = (columns: Column<unknown, unknown>[]) => {
	return {
		gridTemplateColumns: columns.reduce((accum, column) => {
			return (accum += ` ${column.width || "max-content"}`);
		}, ""),
	};
};
