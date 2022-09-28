import { createRoot } from "react-dom/client";
import { createTable } from "../src/core";
import { testPlugin } from "../src/plugins";
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
	{ id: "name", cell: "Name", width: "1fr" },
	{ id: "email", cell: "Email", width: "1fr" },
	{ id: "body", cell: "Body", width: "2fr" },
];

const userTable = createTable({
	plugins: [testPlugin()],
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

	return <div>{userTable.render({ columns, rows })}</div>;
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
