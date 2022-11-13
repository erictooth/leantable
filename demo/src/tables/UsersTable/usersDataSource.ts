import { FetchDataSource } from "../../DataSource/FetchDataSource";

export type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "basic";
};

export const createUsersDataSource = () =>
	new FetchDataSource<User>("/data/userData.json");
