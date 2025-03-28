import { useDispatch, useStoreState } from "../../StoreContext";
import { Plugin } from "../../types/Plugin";
import {
	columnSortSelector,
	columnSorting as baseColumnSorting,
	SortedColumnsState,
	SortedColumnActions,
	type ColumnSortingOptions,
} from "../../../plugins/column-sorting";

export const useColumnSortDirection = (columnId: string) => {
	return useStoreState(columnSortSelector(columnId));
};

export const columnSorting =
	(
		options: ColumnSortingOptions = {}
	): Plugin<{ sortedColumns: SortedColumnsState }, SortedColumnActions> =>
	(config) => {
		return {
			...config,
			...baseColumnSorting(options)(config),
			modifyColumns: (columns: any) =>
				columns.map((column: any) => {
					if (!column.sortable) {
						return column;
					}
					return {
						...column,
						getHeaderCellProps: (props: any) => {
							const sortDirection = useColumnSortDirection(column.id);
							const dispatch = useDispatch();
							return {
								...(column.getHeaderCellProps?.({
									...props,
								}) || props),
								onClick: () =>
									dispatch({ type: "SORT_COLUMN_TOGGLE", id: props.column.id }),
								"aria-sort": sortDirection,
								tabindex: 0,
								onKeyDown: (e: KeyboardEvent) => {
									if (e.key === "Enter") {
									  dispatch({
										type: "SORT_COLUMN_TOGGLE",
										id: props.column.id,
									  });
									}
								  },
							};
						},
					};
				}),
		};
	};
