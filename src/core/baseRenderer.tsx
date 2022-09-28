import clsx from "clsx";
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
};
