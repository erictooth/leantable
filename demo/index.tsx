import { h, render } from "preact";
import { template } from "solid-js/web";
import "../dist-esm/element";
import { createTable } from "../dist-esm";
import {
  columnHiding,
  columnSorting,
  gridLayout,
  rowSelection,
  columnPinning,
} from "../dist-esm/plugins";
import { SmartResource } from "smart-resource";
import { useResourceSnapshot } from "../node_modules/smart-resource/dist-esm/preact.js";
import { useMemo } from "preact/hooks";
import "../dist-esm/element";
import { createEffect } from "solid-js";

const getUsers = () =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json());

const usersResource = new SmartResource(getUsers);

usersResource.fetch();

const columns = [
  { id: "name", cell: template(`Name`, 1), width: "1fr" },
  { id: "email", cell: "Email", width: "1fr" },
  { id: "body", cell: "Body", width: "2fr" },
];

const userTable = createTable({
  plugins: [
    columnPinning(),
    columnHiding(),
    columnSorting(),
    rowSelection(),
    gridLayout(),
  ],
});

userTable.dispatch({ type: "PIN_COLUMN", id: "body" });

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
    <div>
      <button
        onClick={() =>
          userTable.dispatch({ type: "HIDE_COLUMN_TOGGLE", id: "name" })
        }
      >
        Toggle name column
      </button>
      <lean-table table={userTable} rows={rows} columns={columns}></lean-table>
    </div>
  );
};

render(<App />, document.getElementById("root"));
