import { createRoot } from "react-dom/client";
import { PhotosTable } from "./tables/PhotosTable/PhotosTable";

const App = () => {
	return <PhotosTable />;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
