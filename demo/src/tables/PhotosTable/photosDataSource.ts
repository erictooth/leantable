import { FetchDataSource } from "../../DataSource/FetchDataSource";

export type Photo = {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
};

export const createPhotosDataSource = () =>
	new FetchDataSource<Photo>("https://jsonplaceholder.typicode.com/photos");
