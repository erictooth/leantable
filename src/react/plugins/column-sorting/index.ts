import { useDispatch, useStoreState } from "../../StoreContext";
import { Plugin } from "../../types/Plugin";
import {
	columnSortSelector,
	columnSorting as baseColumnSorting,
	SortedColumnsState,
	SortedColumnActions,
} from "../../../plugins/column-sorting";

export const columnSorting =
	(): Plugin<{ sortedColumns: SortedColumnsState }, SortedColumnActions> =>
	(config) => {
		return {
			...config,
			...baseColumnSorting()(config),
			modifyColumns: (columns: any) =>
				columns.map((column: any) => {
					if (!column.sortable) {
						return column;
					}
					return {
						...column,
						getHeaderCellProps: (props: any) => {
							const sortValue = useStoreState(columnSortSelector(props.column));
							const dispatch = useDispatch();
							return {
								...(column.getHeaderCellProps?.({
									...props,
								}) || props),
								onClick: () =>
									dispatch({ type: "SORT_COLUMN_TOGGLE", id: props.column.id }),
								"aria-sort": sortValue,
							};
						},
					};
				}),
		};
	};