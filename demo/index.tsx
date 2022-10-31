import { createRoot } from "react-dom/client";
import { createTable } from "../src/core";
import { virtualized } from "../src/plugins";
import { SmartResource } from "smart-resource";
import { useResourceSnapshot } from "smart-resource/dist-cjs/react.js";
import { StrictMode, useMemo } from "react";

const getUsers = (): Promise<
	{
		id: string;
		name: string;
		email: string;
		company: {
			name: string;
			catchPhrase: string;
		};
	}[]
> =>
	fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

const usersResource = new SmartResource(getUsers);

usersResource.fetch();

const columns = [
	{ id: "name", cell: "Name", width: "100px" },
	{ id: "email", cell: "Email", width: "200px" },
	{ id: "body", cell: "Body", width: "200px" },
];

const userTable = createTable({
	plugins: [virtualized({ rowHeight: () => 40 })] as const,
});

const App = () => {
	const [users] = useResourceSnapshot(usersResource);

	const rows = useMemo(() => {
		if (!users) {
			return [];
		}
		return users.map((user) => {
			return {
				id: user.id,
				cells: {
					name: user.name,
					email: user.email,
					body: user.company.catchPhrase,
				},
			};
		});
	}, [users]);

	return (
		<div>{userTable.render({ columns, rows, totalRows: rows.length })}</div>
	);
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
