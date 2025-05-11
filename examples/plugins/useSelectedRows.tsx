import {
  computed,
  Signal,
  useComputed,
  useSignal,
} from "@preact/signals-react";
import type { Config, InternalColumn } from "leantable";

export const useSelectedRows = () => {
  const selectedRows = useSignal(new Set<string>());
  const checkboxCol = {
    id: "__rowSelection",
    renderHeaderCell: () => null,
    renderCell: (_rowIndex, rowId) => (
      <RowSelectionCell rowId={rowId} selectedRows={selectedRows} />
    ),
  } as const satisfies InternalColumn;

  const plugin = (config: Config) => {
    return {
      ...config,
      columns: computed(() => [checkboxCol, ...config.columns.value] as const),
      HeaderCell: (props) => {
        if (props.column.id === "__rowSelection") {
          return <th aria-label="Row selection" scope="col" />;
        }
        return config.HeaderCell(props);
      },
    } as const satisfies Config;
  };

  return {
    plugin,
    state: selectedRows,
  } as const;
};

const RowSelectionCell = (props: {
  rowId: string;
  selectedRows: Signal<Set<string>>;
}) => {
  const selected = useComputed(() => {
    return props.selectedRows.value.has(props.rowId);
  });
  return (
    <input
      name="selected"
      type="checkbox"
      checked={selected.value}
      onChange={() => {
        const next = new Set(props.selectedRows.value);
        if (selected.value) {
          next.delete(props.rowId);
        } else {
          next.add(props.rowId);
        }
        props.selectedRows.value = next;
      }}
    />
  );
};
