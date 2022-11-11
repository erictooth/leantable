import { Row } from "../../../core";
import { useStoreState } from "../../StoreContext";
import { rowIsCheckedSelector } from "../../../plugins/row-selection";

export const useRowIsChecked = (row: Row<unknown>) =>
	useStoreState(rowIsCheckedSelector(row)) || false;
