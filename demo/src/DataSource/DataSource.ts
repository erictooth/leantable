export abstract class DataSource<Row = unknown> {
	protected _viewportRange: [start: number, end: number] | null = null;

	setViewportRange(start: number, end: number): void {
		this._viewportRange = [start, end];
	}

	abstract getRow(index: number): Row | null;
	abstract getRowCount(): number | null;
}
