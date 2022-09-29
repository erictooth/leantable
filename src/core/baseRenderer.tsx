import clsx from "clsx";
import { ConfigContext } from "./context/ConfigContext";
import { DispatchContext } from "./context/DispatchContext";
import { StateContext } from "./context/StateContext";
import type { TableRenderer } from "./types/TableRenderer";

export const baseRenderer: TableRenderer = {
	Table: (props) => (
		<table {...props} className={clsx("leantable__table", props.className)} />
	),
	Header: (props) => (
		<thead {...props} className={clsx("leantable__header", props.className)} />
	),
	Body: (props) => (
		<tbody {...props} className={clsx("leantable__body", props.className)} />
	),
	HeaderRow: (props) => (
		<tr {...props} className={clsx("leantable__header-row", props.className)} />
	),
	HeaderCell: (props) => {
		const { column, ...rest } = props;
		return (
			<th
				{...rest}
				className={clsx("leantable__header-cell", props.className)}
			/>
		);
	},
	Row: (props) => {
		const { className, row, ...rest } = props;
		return <tr {...rest} className={clsx("leantable__body-row", className)} />;
	},
	Cell: (props) => {
		const { className, column, row, ...rest } = props;
		return (
			<td {...rest} className={clsx("leantable__body-cell", className)}>
				{row.cells[column.id]}
			</td>
		);
	},
	Footer: (props) => (
		<tfoot {...props} className={clsx("leantable__footer", props.className)} />
	),
	reducer: (state) => state,
	modifyConfig: (configModifiers) => configModifiers,
	renderColumns: (renderer) => (columns) => {
		return (
			<renderer.HeaderRow>
				{columns.map((column) => (
					<renderer.HeaderCell column={column} key={column.id}>
						{column.cell}
					</renderer.HeaderCell>
				))}
			</renderer.HeaderRow>
		);
	},
	renderRows: (renderer) => (config) => {
		return config.rows.map((row) => (
			<renderer.Row {...row.props} key={row.id} row={row}>
				{config.columns.map((column) => (
					<renderer.Cell column={column} key={column.id} row={row} />
				))}
			</renderer.Row>
		));
	},
	render: (renderer, state, dispatch) => {
		const configModifier = renderer.modifyConfig({
			columns: (columns) => columns,
			rows: (rows) => rows,
		});

		return (config) => {
			const modifiedConfig = {
				...config,
				columns: configModifier.columns(config.columns, state),
				rows: configModifier.rows(config.rows, state),
			};

			return (
				<DispatchContext.Provider value={dispatch}>
					<StateContext.Provider value={state as any}>
						<ConfigContext.Provider value={modifiedConfig}>
							<renderer.Table>
								<renderer.Header>
									{renderer.renderColumns(renderer)(modifiedConfig.columns)}
								</renderer.Header>
								<renderer.Body>
									{renderer.renderRows(renderer)(modifiedConfig)}
								</renderer.Body>
							</renderer.Table>
						</ConfigContext.Provider>
					</StateContext.Provider>
				</DispatchContext.Provider>
			);
		};
	},
};
