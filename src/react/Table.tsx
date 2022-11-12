//@ts-nocheck
import { memo } from "react";
import {
	Table as BaseTable,
	Row as BaseRow,
	HeaderCell,
	Header,
	Cell,
	HeaderRow,
	Body,
} from "./baseRenderer";
import { type ComponentProps } from "./types/ComponentProps";
import { StoreContext } from "./StoreContext";
export const Table = memo((props: ComponentProps["Table"] & any) => {
	const { columns, rowCount, store, getRow, plugins, ...rest } = props;
	const modifiedColumns = plugins.modifyColumns(columns);
	const renderedRows = [];
	for (let i = 0; i <= rowCount - 1; i++) {
		const row = getRow(i);
		renderedRows.push(
			<BaseRow key={row.id} getRowProps={plugins.getRowProps} row={row}>
				{modifiedColumns.map((column) => {
					return (
						<Cell
							key={column.id}
							column={column}
							row={row}
							getCellProps={column.getCellProps}
						/>
					);
				})}
			</BaseRow>
		);
	}

	return (
		<StoreContext.Provider value={store}>
			<BaseTable
				{...rest}
				columns={modifiedColumns}
				getTableProps={plugins.getTableProps}
			>
				<Header>
					<HeaderRow>
						{modifiedColumns.map((column) => (
							<HeaderCell
								key={column.id}
								column={column}
								getHeaderCellProps={column.getHeaderCellProps}
							/>
						))}
					</HeaderRow>
				</Header>
				<Body getBodyProps={plugins.getBodyProps}>{renderedRows}</Body>
			</BaseTable>
		</StoreContext.Provider>
	);
});

Table.displayName = "Leantable";
