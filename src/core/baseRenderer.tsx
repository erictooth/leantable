import * as React from "react";
import type { TableRenderer } from "./types/TableRenderer";

export const baseRenderer: TableRenderer = {
  Table: (props) => (
    <table
      {...props}
      className={`lean-table__table ${props.className || ""}`}
    />
  ),
  Header: (props) => (
    <thead
      {...props}
      className={`lean-table__header ${props.className || ""}`}
    />
  ),
  Body: (props) => (
    <tbody {...props} className={`lean-table__body ${props.className || ""}`} />
  ),
  HeaderRow: (props) => (
    <tr
      {...props}
      className={`lean-table__header-row ${props.className || ""}`}
    />
  ),
  HeaderCell: (props) => (
    <th
      {...props}
      className={`lean-table__header-cell ${props.className || ""}`}
    />
  ),
  Row: (props) => (
    <tr
      {...props}
      className={`lean-table__body-row ${props.className || ""}`}
    />
  ),
  Cell: (props) => {
    const { className, columnId, ...rest } = props;
    return (
      <td {...rest} className={`lean-table__body-cell ${className || ""}`} />
    );
  },
  Footer: (props) => (
    <tfoot
      {...props}
      className={`lean-table__footer ${props.className || ""}`}
    />
  ),
  reducer: (state) => state,
  modifyConfig: (configModifiers) => configModifiers,
};
