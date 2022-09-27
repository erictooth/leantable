import clsx from "clsx";
import { forwardRef, type HTMLProps } from "react";
import type { TableRenderer } from "./types/TableRenderer";

export const baseRenderer: TableRenderer = {
	Table: forwardRef<HTMLTableElement, HTMLProps<HTMLTableElement>>(
		(props, ref) => (
			<table
				{...props}
				className={clsx("leantable__table", props.className)}
				ref={ref}
			/>
		)
	) as any,
	Header: forwardRef<
		HTMLTableSectionElement,
		HTMLProps<HTMLTableSectionElement>
	>((props, ref) => (
		<thead
			{...props}
			className={clsx("leantable__header", props.className)}
			ref={ref}
		/>
	)) as any,
	Body: forwardRef<HTMLTableSectionElement, HTMLProps<HTMLTableSectionElement>>(
		(props, ref) => (
			<tbody
				{...props}
				className={clsx("leantable__body", props.className)}
				ref={ref}
			/>
		)
	) as any,
	HeaderRow: forwardRef<HTMLTableRowElement, HTMLProps<HTMLTableRowElement>>(
		(props, ref) => (
			<tr
				{...props}
				className={clsx("leantable__header-row", props.className)}
				ref={ref}
			/>
		)
	) as any,
	HeaderCell: forwardRef<
		HTMLTableCellElement,
		HTMLProps<HTMLTableCellElement> & { columnId: string; rowId: string }
	>((props, ref) => (
		<th
			{...props}
			className={clsx("leantable__header-cell", props.className)}
			ref={ref}
		/>
	)) as any,
	Row: forwardRef<HTMLTableRowElement, HTMLProps<HTMLTableRowElement>>(
		(props, ref) => (
			<tr
				{...props}
				className={clsx("leantable__body-row", props.className)}
				ref={ref}
			/>
		)
	) as any,
	Cell: forwardRef<
		HTMLTableCellElement,
		HTMLProps<HTMLTableCellElement> & { columnId: string; rowId: string }
	>((props, ref) => {
		const { className, columnId, rowId, ...rest } = props;
		return (
			<td
				{...rest}
				className={clsx("leantable__body-cell", className)}
				ref={ref}
			/>
		);
	}) as any,
	Footer: forwardRef<
		HTMLTableSectionElement,
		HTMLProps<HTMLTableSectionElement>
	>((props, ref) => (
		<tfoot
			{...props}
			className={clsx("leantable__footer", props.className)}
			ref={ref}
		/>
	)) as any,
	reducer: (state) => state,
	modifyConfig: (configModifiers) => configModifiers,
};
