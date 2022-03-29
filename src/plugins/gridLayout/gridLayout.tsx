import { createMemo, useContext } from "solid-js";
import { ConfigContext } from "../../core/context/ConfigContext";
import type { Config } from "../../core/types/Config";
import type { Plugin } from "../../core/types/Plugin";

const getGridTemplateColumns = (columns: Config["columns"]): string => {
  return (
    columns.reduce((accum, column) => {
      return (accum += ` ${column.width || "1fr"}`);
    }, "grid-template-columns:") + ";"
  );
};

export const gridLayout = (): Plugin => (baseRenderer) => {
  return {
    ...baseRenderer,
    Table: (props) => {
      const config = useContext(ConfigContext);
      const columnTemplate = createMemo(() => {
        return getGridTemplateColumns(config.columns());
      });
      return (
        <baseRenderer.Table
          {...props}
          class={`lean-table--grid-layout ${props.class || ""}`}
          style={`${columnTemplate()} ${props.style || ""}`}
        />
      );
    },
  };
};
