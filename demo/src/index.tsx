import { createRoot } from "react-dom/client";
import { PhotosTable } from "./tables/PhotosTable/PhotosTable";
import { UsersTable } from "./tables/UsersTable/UsersTable";

const App = () => {
	return <UsersTable />;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
