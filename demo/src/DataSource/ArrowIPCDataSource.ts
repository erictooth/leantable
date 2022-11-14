import { DataSource } from "./DataSource";
import { tableFromIPC, type Table } from "apache-arrow";
import * as aq from "arquero";

export class ArrowIPCDataSource<Row = unknown> extends DataSource<Row> {
	private _table: Table | null = null;
	private _filteredTable = this._table;
	private _dataChangedCb: (() => void) | null = null;
	private _sort = "";

	private _setData(data: Table): void {
		this._table = data;
		this._updateFilteredTable();
	}

	private _updateFilteredTable() {
		if (!this._table) {
			return;
		}
		let dt = aq.fromArrow(this._table);
		if (this._sort) {
			if (this._sort.charAt(0) === "-") {
				dt = dt.orderby(aq.desc(this._sort.replace("-", "")));
			} else {
				dt = dt.orderby(this._sort);
			}
		}
		this._filteredTable = aq.toArrow(dt);
		this._dataChangedCb?.();
	}

	setSort(sort: string): void {
		this._sort = sort;
		this._updateFilteredTable();
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
		if (!this._filteredTable) {
			return null;
		}
		const row = this._filteredTable.get(index);
		if (!row) {
			return null;
		}
		return { id: row.id, data: row };
	}

	getRowCount() {
		if (!this._filteredTable) {
			return 0;
		}
		return this._filteredTable.numRows;
	}

	onDataChanged(cb: typeof this._dataChangedCb) {
		this._dataChangedCb = cb;
	}
}
