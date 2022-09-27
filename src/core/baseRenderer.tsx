import clsx from "clsx";
import { forwardRef, type HTMLProps } from "react";
import type { TableRenderer } from "./types/TableRenderer";

export const baseRenderer: TableRenderer = {
	Table: (props) => (
		<table {...props} className={clsx("leantable__table", props.className)} />
	),
	Header: forwardRef((props, ref) => (
		<thead
			{...props}
			className={clsx("leantable__header", props.className)}
			ref={ref}
		/>
	)) as TableRenderer["Header"],
	Body: forwardRef((props, ref) => (
		<tbody
			{...props}
			className={clsx("leantable__body", props.className)}
			ref={ref}
		/>
	)) as TableRenderer["Body"],
	HeaderRow: forwardRef<HTMLTableRowElement, HTMLProps<HTMLTableRowElement>>(
		(props, ref) => (
			<tr
				{...props}
				className={clsx("leantable__header-row", props.className)}
				ref={ref}
			/>
		)
	) as TableRenderer["HeaderRow"],
	HeaderCell: forwardRef((props, ref) => (
		<th
			{...props}
			className={clsx("leantable__header-cell", props.className)}
			ref={ref}
		/>
	)) as TableRenderer["HeaderCell"],
	Row: forwardRef((props, ref) => (
		<tr
			{...props}
			className={clsx("leantable__body-row", props.className)}
			ref={ref}
		/>
	)) as TableRenderer["Row"],
	Cell: forwardRef((props, ref) => {
		const { className, columnId, rowId, ...rest } = props;
		return (
			<td
				{...rest}
				className={clsx("leantable__body-cell", className)}
				ref={ref}
			/>
		);
	}) as TableRenderer["Cell"],
	Footer: forwardRef((props, ref) => (
		<tfoot
			{...props}
			className={clsx("leantable__footer", props.className)}
			ref={ref}
		/>
	)) as TableRenderer["Footer"],
	reducer: (state) => state,
	modifyConfig: (configModifiers) => configModifiers,
};
