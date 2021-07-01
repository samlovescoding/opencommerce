import { useState } from "react";

export default function DataTable({
  columns,
  rows,
  scoped = {},
  page = 1,
  limit = 10,
  totalCount = null,
  query = "",
  onChangeLimit = () => {},
  onChangePage = () => {},
  onChangeQuery = () => {},
}) {
  const [current, setCurrent] = useState(page - 1);
  // const [query, setQuery] = useState(query);

  if (totalCount === null) {
    totalCount = rows.length;
  }

  return (
    <>
      <div className="d-flex mb-4">
        <input
          type="search"
          className="form-control w-30"
          value={query}
          onChange={(e) => {
            onChangeQuery(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            // .filter((row) => {
            //   if (query !== "") {
            //     return Object.values(row).some((column) => {
            //       return column
            //         .toString()
            //         .toLowerCase()
            //         .includes(query.toLowerCase());
            //     });
            //   }
            //   return true;
            // })
            // .slice(current * limit, current * limit + limit)
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, index) => {
                  if (scoped[column]) {
                    return (
                      <td key={index}>
                        {scoped[column](row, rowIndex, column)}
                      </td>
                    );
                  }
                  return <td key={index}>{row[column]}</td>;
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="mt-4 d-flex justify-content-between">
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setCurrent(parseInt(page) - 1);
            onChangePage(parseInt(page) - 1);
          }}
          disabled={parseInt(page) <= 0}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            setCurrent(parseInt(page) + 1);
            onChangePage(parseInt(page) + 1);
          }}
          disabled={parseInt(page) > Math.floor(totalCount / limit) - 1}
        >
          Next
        </button>
      </div>
    </>
  );
}
