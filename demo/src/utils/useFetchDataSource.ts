import { useCallback, useEffect, useMemo, useState } from "react";
import { type FetchDataSource } from "../DataSource/FetchDataSource";

export const useFetchDataSource = (dataSource: FetchDataSource) => {
	const [dataUpdatedCount, setDataUpdatedCount] = useState(0);
	useEffect(() => {
		dataSource.onDataChanged(() => setDataUpdatedCount((prev) => prev + 1));
	}, [dataSource]);
	return {
		getRow: useCallback(
			(index: number) => dataSource.getRow(index),
			[dataUpdatedCount]
		),
		rowCount: useMemo(() => dataSource.getRowCount(), [dataUpdatedCount]),
	};
};
