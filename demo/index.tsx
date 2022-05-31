import React from "react";
import ReactDOM from "react-dom";
import { createTable } from "../src/core";
import {
  columnHiding,
  columnSorting,
  gridLayout,
  rowSelection,
  columnPinning,
  rowSelectionCheckboxColumnId,
} from "../src/plugins";
import { SmartResource } from "smart-resource";
import { useResourceSnapshot } from "smart-resource/dist-esm/react.js";
import { useMemo } from "react";

const getUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

const usersResource = new SmartResource(getUsers);

usersResource.fetch();

const columns = [
  { id: "name", cell: "Name", width: "1fr" },
  { id: "email", cell: "Email", width: "1fr" },
  { id: "body", cell: "Body", width: "2fr" },
];

const userTable = createTable({
  plugins: [
    columnPinning({ initiallyPinned: [rowSelectionCheckboxColumnId, "name"] }),
    columnHiding(),
    columnSorting(),
    rowSelection(),
    gridLayout(),
  ],
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
