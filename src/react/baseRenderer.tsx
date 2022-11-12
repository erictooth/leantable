import { type HTMLProps } from "react";
import { clsx } from "clsx";
import { type ComponentProps } from "./types/ComponentProps";

export const Table = (props: ComponentProps["Table"]) => {
	const { columns, getTableProps, ...rest } = props.getTableProps(props);
	return (
		<table {...rest} className={clsx("leantable__table", rest.className)} />
	);
};

export const Header = (props: ComponentProps["Header"]) => (
	<thead {...props} className={clsx("leantable__header", props.className)} />
);

export const Body = (props: ComponentProps["Body"]) => {
	const { getBodyProps, ...rest } = props.getBodyProps(props);
	return (
		<tbody {...rest} className={clsx("leantable__body", rest.className)} />
	);
};

export const HeaderRow = (props: HTMLProps<HTMLTableRowElement>) => (
	<tr {...props} className={clsx("leantable__header-row", props.className)} />
);

export const HeaderCell = (props: ComponentProps["HeaderCell"]) => {
	const { column, getHeaderCellProps, ...rest } =
		props.getHeaderCellProps?.(props) || props;
	return (
		<th
			{...rest}
			className={clsx("leantable__header-cell", column.class, rest.className)}
		/>
	);
};

export const Row = (props: ComponentProps["Row"]) => {
	const { getRowProps, row, ...rest } = props.getRowProps(props);
	return (
		<tr {...rest} className={clsx("leantable__body-row", rest.className)} />
	);
};

export const Cell = (props: ComponentProps["Cell"]) => {
	const { column, getCellProps, ...rest } =
		props.getCellProps?.(props) || props;
	return (
		<td
			{...rest}
			className={clsx("leantable__body-cell", column.class, rest.className)}
		>
			<div className="leantable__body-cell__content">{rest.children}</div>
		</td>
	);
};

export const Footer = (props: HTMLProps<HTMLTableSectionElement>) => (
	<tfoot {...props} className={clsx("leantable__footer", props.className)} />
);
