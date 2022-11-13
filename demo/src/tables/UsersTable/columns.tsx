import { Column, useColumnSortDirection } from "../../../../dist-esm/react";
import { type User } from "./usersDataSource";

export const columns: Column<User>[] = [
	{
		id: "name",
		class: "leantable-sticky-column leantable-sticky-column--left",
		renderHeaderCell: () => "Name",
		renderCell: (row) => row.data.name,
	},
	{
		id: "email",
		renderHeaderCell: () => "Email",
		renderCell: (row) => row.data.email,
	},
	{
		id: "role",
		renderHeaderCell: () => {
			const sortDirection = useColumnSortDirection("role");
			return `Role ${sortDirection}`;
		},
		renderCell: (row) => row.data.role,
		width: "max-content",
		sortable: true,
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
