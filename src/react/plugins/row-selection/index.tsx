import { type Column } from "../../types/Column";
import {
	rowSelection as baseRowSelection,
	type SelectedRowsState,
	type SelectedRowsActions,
} from "../../../plugins/row-selection";
import { useDispatch } from "../../StoreContext";
import { useRowIsChecked } from "./useRowIsChecked";
import { Plugin } from "../../types/Plugin";

export const rowSelection =
	(): Plugin<{ selectedRows: SelectedRowsState }, SelectedRowsActions> =>
	(config) => {
		return {
			...baseRowSelection()(config),
			getRowProps: (props) => ({
				...props,
				"aria-selected": useRowIsChecked(props.row),
			}),
		};
	};

const defaultRenderRowCheckbox = (props: {
	checked: boolean;
	onChange: () => void;
}) => <input type="checkbox" {...props} />;

const RowSelectionHeaderCell = (props: any) => {
	return props.renderHeaderRowCheckbox({});
};

const RowSelectionCell = (props: any) => {
	const checked = useRowIsChecked(props.row);
	const dispatch = useDispatch();
	return props.renderRowCheckbox({
		checked,
		onChange: () => {
			dispatch({ type: "TOGGLE_ROW", id: props.row.id });
		},
	});
};

export const rowSelectionColumn = ({
	renderHeaderRowCheckbox,
	renderRowCheckbox = defaultRenderRowCheckbox,
}: {
	renderHeaderRowCheckbox?: (props: Record<string, never>) => JSX.Element;
	renderRowCheckbox?: typeof defaultRenderRowCheckbox;
} = {}): Column<unknown> => ({
	id: "__internal-checkbox",
	renderHeaderCell: () =>
		renderHeaderRowCheckbox ? (
			<RowSelectionHeaderCell
				renderHeaderRowCheckbox={renderHeaderRowCheckbox}
			/>
		) : null,
	renderCell: (row) => (
		<RowSelectionCell row={row} renderRowCheckbox={renderRowCheckbox} />
	),
	width: "max-content",
});
