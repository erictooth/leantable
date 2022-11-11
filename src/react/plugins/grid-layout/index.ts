import clsx from "clsx";
import { getGridTemplateColumns } from "../../../plugins/layout-grid";
import { type Plugin } from "../../types/Plugin";

export const gridLayout = (): Plugin => (config) => {
	return {
		...config,
		getTableProps: (props) => {
			return {
				...props,
				style: {
					...(props.style || {}),
					...getGridTemplateColumns(props.columns),
				},
				className: clsx(props.className, "leantable--grid-layout"),
			};
		},
	};
};
