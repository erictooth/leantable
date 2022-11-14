import { useMemo, useEffect, useState } from "react";
import { createTable } from "../../../../dist-esm/core";
import {
	columnSorting,
	infiniteScrolling,
	rowSelection,
	Table,
	useExternalStoreState,
} from "../../../../dist-esm/react";
import { createUsersDataSource } from "./usersDataSource";
import { useFetchDataSource } from "../../utils/useFetchDataSource";
import { columns } from "./columns";
import { formatSortQuery } from "../../utils/formatSortQuery";

export const UsersTable = () => {
	const [visibleRows, setVisibleRows] = useState(50);
	const usersDataSource = useMemo(() => createUsersDataSource(), []);
	const userTable = useMemo(
		() =>
			createTable([
				rowSelection(),
				columnSorting({ multiSort: false }),
				infiniteScrolling(() => {
					setVisibleRows((prev) => prev + 50);
				}, 3),
			]),
		[]
	);
	const { rowCount, getRow } = useFetchDataSource(usersDataSource);
	const sortedColumns = useExternalStoreState(
		userTable.store,
		(state) => state.sortedColumns
	);
	useEffect(() => {
		usersDataSource.setSort(formatSortQuery(sortedColumns));
	}, [sortedColumns]);
	return (
		<div className="panel">
			<Table
				className="leantable--fixed-header"
				columns={columns}
				rowCount={Math.min(visibleRows, rowCount)}
				getRow={getRow}
				{...userTable}
			/>
		</div>
	);
};
