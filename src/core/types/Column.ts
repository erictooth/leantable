export type ColumnIdentifier = string;

export type Column<T = unknown> = {
  id: ColumnIdentifier;
  cell?: JSX.Element;
  width?: string;
} & T;

export type Columns<T = unknown> = Column<T>[];
