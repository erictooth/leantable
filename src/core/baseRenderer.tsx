import { splitProps } from "solid-js";
import type { TableRenderer } from "./types/TableRenderer";

export const baseRenderer: TableRenderer = {
  Table: (props) => (
    <table {...props} class={`lean-table__table ${props.class || ""}`} />
  ),
  Header: (props) => (
    <thead {...props} class={`lean-table__header ${props.class || ""}`} />
  ),
  Body: (props) => (
    <tbody {...props} class={`lean-table__body ${props.class || ""}`} />
  ),
  HeaderRow: (props) => (
    <tr {...props} class={`lean-table__header-row ${props.class || ""}`} />
  ),
  HeaderCell: (props) => (
    <th {...props} class={`lean-table__header-cell ${props.class || ""}`} />
  ),
  Row: (props) => (
    <tr {...props} class={`lean-table__body-row ${props.class || ""}`} />
  ),
  Cell: (props) => {
    const [local, others] = splitProps(props, ["class", "columnId"]);
    return (
      <td
        {...others}
        class={`lean-table__body-row-cell ${local.class || ""}`}
      />
    );
  },
  Footer: (props) => (
    <tfoot {...props} class={`lean-table__footer ${props.class || ""}`} />
  ),
  reducer: (state) => state,
  modifyConfig: (configModifiers) => configModifiers,
};
