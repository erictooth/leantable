export abstract class DataSource<Data = unknown> {
	protected _viewportRange: [start: number, end: number] | null = null;

	setViewportRange(start: number, end: number): void {
		this._viewportRange = [start, end];
	}

	abstract getRow(index: number): { id: string; data: Data } | null;
	abstract getRowCount(): number | null;
}
