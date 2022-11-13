import userData from "./userData.json";

export type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "basic";
};

export const users = userData as User[];
