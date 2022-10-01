export type ColumnIdentifier = string;

export type Column = {
	id: ColumnIdentifier;
	cell?: JSX.Element | string | number;
	width?: string;
};

export type Columns = Column[];
