import { useComputed, useSignal } from "@preact/signals-react";
import type { Config } from "leantable";

export const useStickyColumns = <T extends string>(
  initialState = new Set<T>()
) => {
  const stickyColumns = useSignal(initialState);

  return {
    plugin: (config: Config) => {
      return {
        ...config,
        HeaderCell: (props) => {
          const isSticky = useComputed(() =>
            stickyColumns.value.has(props.column.id as T)
          );

          if (isSticky.value) {
            return (
              <config.HeaderCell
                {...props}
                style={{
                  ...props.style,
                  position: "sticky",
                  left: 0,
                  zIndex: 500,
                }}
              />
            );
          }

          return config.HeaderCell(props);
        },
        Cell: (props) => {
          const isSticky = useComputed(() =>
            stickyColumns.value.has(props.column.id as T)
          );

          if (isSticky.value) {
            return (
              <config.Cell
                {...props}
                style={{
                  ...props.style,
                  position: "sticky",
                  left: 0,
                  zIndex: 500,
                }}
              />
            );
          }

          return config.Cell(props);
        },
      } as const satisfies Config;
    },
    state: stickyColumns,
  };
};
