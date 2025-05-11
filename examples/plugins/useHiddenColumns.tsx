import { computed, useSignal } from "@preact/signals-react";
import type { Config } from "leantable";

export const useHiddenColumns = () => {
  const hiddenColumns = useSignal(new Set<string>());

  const plugin = (config: Config) => {
    return {
      ...config,
      columns: computed(() =>
        config.columns.value.filter(
          (column) => !hiddenColumns.value.has(column.id)
        )
      ),
    } as const satisfies Config;
  };

  return {
    plugin,
    state: hiddenColumns,
  } as const;
};
