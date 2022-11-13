import {
	useColumnSortDirection,
	type Column,
} from "../../../../dist-esm/react";
import { type Photo } from "./photosDataSource";

export const columns: Column<Photo>[] = [
	{
		id: "title",
		class: "leantable-sticky-column leantable-sticky-column--left",
		renderHeaderCell: () => "Title",
		renderCell: (row) => {
			return row.data.title;
		},
	},
	{
		id: "url",
		renderHeaderCell: () => "URL",
		renderCell: (row) => {
			return row.data.url;
		},
	},
	{
		id: "createdAt",
		class: "align-right",
		renderHeaderCell: () => {
			const sortDirection = useColumnSortDirection("createdAt");
			return `Created at ${sortDirection}`;
		},
		renderCell: () => new Date().toDateString(),
		sortable: true,
	},
	{
		id: "actions",
		class:
			"leantable-row-hover-visibility leantable-sticky-column leantable-sticky-column--right",
		renderHeaderCell: () => null,
		renderCell: () => <button>Delete</button>,
	},
];
