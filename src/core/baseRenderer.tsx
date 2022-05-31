import clsx from "clsx";
import * as React from "react";
import type { TableRenderer } from "./types/TableRenderer";

export const baseRenderer: TableRenderer = {
  Table: React.forwardRef((props: any, ref) => (
    <table
      {...props}
      className={clsx("leantable__table", props.className)}
      ref={ref}
    />
  )) as any,
  Header: React.forwardRef((props: any, ref) => (
    <thead
      {...props}
      className={clsx("leantable__header", props.className)}
      ref={ref}
    />
  )) as any,
  Body: React.forwardRef((props: any, ref) => (
    <tbody
      {...props}
      className={clsx("leantable__body", props.className)}
      ref={ref}
    />
  )) as any,
  HeaderRow: React.forwardRef((props: any, ref) => (
    <tr
      {...props}
      className={clsx("leantable__header-row", props.className)}
      ref={ref}
    />
  )) as any,
  HeaderCell: React.forwardRef((props: any, ref) => (
    <th
      {...props}
      className={clsx("leantable__header-cell", props.className)}
      ref={ref}
    />
  )) as any,
  Row: React.forwardRef((props: any, ref) => (
    <tr
      {...props}
      className={clsx("leantable__body-row", props.className)}
      ref={ref}
    />
  )) as any,
  Cell: React.forwardRef((props: any, ref) => {
    const { className, columnId, rowId, ...rest } = props;
    return (
      <td
        {...rest}
        className={clsx("leantable__body-cell", className)}
        ref={ref}
      />
    );
  }) as any,
  Footer: React.forwardRef((props: any, ref) => (
    <tfoot
      {...props}
      className={clsx("leantable__footer", props.className)}
      ref={ref}
    />
  )) as any,
  reducer: (state) => state,
  modifyConfig: (configModifiers) => configModifiers,
};
