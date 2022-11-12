import { createTable } from "../src/core";
import {
	Table,
	type Column,
	rowSelection,
	rowSelectionColumn,
	useDispatch,
	infiniteScrolling,
	gridLayout,
	columnSorting,
	useColumnSortDirection,
} from "../src/react";
import { users, type User } from "./userData/userData";

const userTable = createTable([
	rowSelection(),
	columnSorting(),
	gridLayout(),
	infiniteScrolling(() => console.log("scrolled to bottom"), 3),
]);

const all_ids = users.map((user) => user.id);
// userTable.store.state.selectedRows.subscribe(console.log);

const columns: Column<User>[] = [
	// rowSelectionColumn({
	// 	renderHeaderRowCheckbox: () => {
	// 		const dispatch = useDispatch();
	// 		return (
	// 			<input
	// 				type="checkbox"
	// 				onChange={(e) => {
	// 					if (e.target.checked) {
	// 						dispatch({ type: "SELECT_ROWS", ids: all_ids });
	// 					} else {
	// 						dispatch({ type: "DESELECT_ALL_ROWS" });
	// 					}
	// 				}}
	// 			/>
	// 		);
	// 	},
	// }),
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
const getRow = (i: number) => ({ id: users[i].id, data: users[i] });

export const UserTable = () => {
	return (
		<div className="panel">
			<Table
				className="leantable--fixed-header"
				columns={columns}
				rowCount={10 || users.length}
				getRow={getRow}
				{...userTable}
			/>
		</div>
	);
};
