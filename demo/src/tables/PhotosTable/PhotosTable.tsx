import { useMemo, useState } from "react";
import { createTable } from "../../../../dist-esm/core/index.js";
import {
	columnSorting,
	infiniteScrolling,
	rowSelection,
	Table,
} from "../../../../dist-esm/react/index.js";
import { createPhotosDataSource } from "./photosDataSource";
import { useFetchDataSource } from "../../utils/useFetchDataSource";
import { columns } from "./columns";

export const PhotosTable = () => {
	const [visibleRows, setVisibleRows] = useState(50);
	const photosDataSource = useMemo(() => createPhotosDataSource(), []);
	const userTable = useMemo(
		() =>
			createTable([
				rowSelection(),
				columnSorting(),
				infiniteScrolling(() => {
					setVisibleRows((prev) => prev + 50);
				}, 3),
			]),
		[]
	);
	const { rowCount, getRow } = useFetchDataSource(photosDataSource);

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
