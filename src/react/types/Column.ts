import { type Cell } from "./Cell";
import { type Column as CoreColumn } from "../../core";

export type Column<Data> = CoreColumn<Data, Cell>;
