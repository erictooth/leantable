import type { JSX } from "solid-js";
import type { ColumnIdentifier } from "./Column";

export type RowIdentifier = string;

export type Row<T = unknown> = {
  id: RowIdentifier;
  cells: Record<ColumnIdentifier, JSX.Element>;
} & T;

export type Rows<T = unknown> = Row<T>[];
