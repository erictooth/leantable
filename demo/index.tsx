import { createRoot } from "react-dom/client";
import { UserTable } from "./UserTable";

const App = () => {
	return <UserTable />;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
