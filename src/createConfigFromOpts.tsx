import { memo } from "react";
import { computed, type ReadonlySignal } from "@preact/signals-react";
import { Body } from "./components/Body.tsx";
import { Header } from "./components/Header.tsx";
import { HeaderCell } from "./components/HeaderCell.tsx";
import { Cell } from "./components/Cell.tsx";
import { Row } from "./components/Row.tsx";
import { Table } from "./components/Table.tsx";
import type { Options } from "./types/Options.ts";
import type { InternalColumn } from "./types/InternalColumn.ts";
import type { RenderedRow } from "./types/RenderedRow.ts";

export const createConfigFromOpts = (opts: {
	columns: ReadonlySignal<Options["columns"]>;
	rowCount: ReadonlySignal<Options["rowCount"]>;
	plugins?: Options["plugins"];
	getRowId?: Options["getRowId"];
}) => {
	const columns = computed(() => opts.columns.value as InternalColumn[]);
	const renderedRows = computed(() =>
		Array.from(
			{ length: opts.rowCount.value },
			(_, rowIndex) =>
				[
					rowIndex,
					opts.getRowId?.(rowIndex) ?? String(rowIndex),
				] as const satisfies RenderedRow,
		),
	);

	const baseConfig = {
		columns,
		renderedRows,
		Body,
		Header,
		HeaderCell,
		Cell,
		Row,
		Table,
	} as const;

	const composed = (opts.plugins || []).reduce(
		(accum, curr) => curr(accum),
		baseConfig,
	);

	return {
		...composed,
		Table: memo(composed.Table),
		Header: memo(composed.Header),
		HeaderCell: memo(composed.HeaderCell),
		Body: memo(composed.Body),
		Row: memo(composed.Row),
		Cell: memo(composed.Cell),
	} as const;
};

export type Config = ReturnType<typeof createConfigFromOpts>;
