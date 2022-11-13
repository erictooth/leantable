import { DataSource } from "./DataSource";

export class FetchDataSource<Row = unknown> extends DataSource<Row> {
	private _data: Row[] | null = null;
	private _dataChangedCb: Function | null = null;

	private _setData(data: typeof this._data): void {
		this._data = data;
		this._dataChangedCb?.();
	}

	constructor(url: string) {
		super();

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				this._setData(data);
			});
	}

	getRow(index: number) {
		if (!this._data) {
			return null;
		}
		return this._data[index];
	}

	getRowCount() {
		if (!this._data) {
			return 0;
		}
		return this._data.length;
	}

	onDataChanged(cb: Function) {
		this._dataChangedCb = cb;
	}
}
