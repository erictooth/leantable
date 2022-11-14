import { FetchDataSource } from "../../DataSource/FetchDataSource";
import { ArrowIPCDataSource } from "../../DataSource/ArrowIPCDataSource";

export type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "basic";
};

// export const createUsersDataSource = () =>
// 	new FetchDataSource<User>("/data/userData.json");

export const createUsersDataSource = () =>
	new ArrowIPCDataSource<User>("/data/userData.arrow");
