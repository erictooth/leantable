import type { Columns } from "./Column";
import type { Rows } from "./Row";

export type Config<C = unknown, R = unknown> = {
	columns: Columns<C>;
	rows: Rows<R>;
};
