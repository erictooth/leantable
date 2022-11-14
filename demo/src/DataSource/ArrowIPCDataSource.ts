import { DataSource } from "./DataSource";
import { tableFromIPC, type Table } from "apache-arrow";

export class ArrowIPCDataSource<Row = unknown> extends DataSource<Row> {
	private _table: Table | null = null;
	private _dataChangedCb: Function | null = null;

	private _setData(data: typeof this._table): void {
		this._table = data;
		this._dataChangedCb?.();
	}

	constructor(url: string) {
		super();

		fetch(url)
			.then((res) => res.arrayBuffer())
			.then((data) => {
				this._setData(tableFromIPC(data));
			});
	}

	getRow(index: number) {
		if (!this._table) {
			return null;
		}
		const row = this._table.get(index) as any;
		return { id: row.id, data: row };
	}

	getRowCount() {
		if (!this._table) {
			return 0;
		}
		return this._table.numRows;
	}

	onDataChanged(cb: Function) {
		this._dataChangedCb = cb;
	}
}
