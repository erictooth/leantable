import { createMutable } from "solid-js/store";
import { render } from "solid-js/web";
import { createTable } from "../core/createTable";
import type { Columns } from "../core/types/Column";
import type { Rows } from "../core/types/Row";

class Leantable extends HTMLElement {
  private _dispose?: () => void;

  private _table!: ReturnType<typeof createTable>;

  private _props = createMutable({ columns: [] as Columns, rows: [] as Rows });

  get columns() {
    return this._props.columns;
  }

  set columns(columns: Columns) {
    this._props.columns = columns;
  }

  get rows() {
    return this._props.rows;
  }
  set rows(rows: Rows) {
    this._props.rows = rows;
  }

  get table() {
    return this._table;
  }

  set table(table) {
    if (this._table === table) {
      return;
    }

    this._table = table;
    this._render();
  }

  disconnectedCallback() {
    this._dispose?.();
  }

  private _render() {
    if (!this._table) {
      return;
    }

    this._dispose?.();
    this.innerHTML = "";

    const dispose = render(() => {
      return this.table.render(this._props);
    }, this);

    this._dispose = () => {
      dispose();
      this._dispose = undefined;
    };
  }
}

window.customElements.define("lean-table", Leantable);
