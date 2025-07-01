import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { max } from "date-fns";
import LoadingSpinner from "../LoadingSpinner";

export default function DynamicTable({
  columns = [],
  rows = [],
  pageSizeOptions = [10, 25, 100],
  initialPageSize = 10,
  maxHeight,
  stickyHeader = true,
  fontFamily = "Poppins, sans-serif",
  headerStyle = {},
  cellStyle = {},
  order,
  orderBy,
  setOrder,
  setOrderBy,
  loading = true,
  error,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(initialPageSize);

  const handleRequestSort = (property) => {
    const nonSortableFields = ["srNo", "image", "action"];

    if (nonSortableFields.includes(property)) return;

    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", fontFamily, boxShadow: "none" }}
      className="flex flex-col"
    >
      <TableContainer sx={{ fontFamily }} className="flex-1 ">
        <Table stickyHeader={stickyHeader} aria-label="dynamic table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{
                    // backgroundColor: "#ff8c12",
                    // color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    fontFamily,
                    minWidth: column.minWidth,
                    ...headerStyle,
                  }}
                  onClick={() => handleRequestSort(column.id)}
                >
                  {!["srNo", "image", "action"].includes(column.id) ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      sx={{
                        color: "  !important",
                        "& .MuiTableSortLabel-icon": {
                          color: "  !important",
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : error ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <span className="text-red-500 font-semibold text-lg">
                    {error}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : rows.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <span className="font-semibold text-lg ">No data found.</span>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {rows
                .sort((a, b) => {
                  if (!orderBy) return 0;

                  const aValue = a[orderBy];
                  const bValue = b[orderBy];

                  // Handle object with sortValue
                  const aSort =
                    typeof aValue === "object" &&
                    aValue?.sortValue !== undefined
                      ? aValue.sortValue
                      : aValue;
                  const bSort =
                    typeof bValue === "object" &&
                    bValue?.sortValue !== undefined
                      ? bValue.sortValue
                      : bValue;

                  if (aSort === undefined || bSort === undefined) return 0;

                  if (typeof aSort === "string") {
                    return order === "asc"
                      ? aSort.localeCompare(bSort)
                      : bSort.localeCompare(aSort);
                  }

                  return order === "asc" ? aSort - bSort : bSort - aSort;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow hover tabIndex={-1} key={row.id || rowIndex}  sx={{ '& td': { borderBottom: 'none' } }}>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || "left"}
                          sx={{ fontFamily, ...cellStyle }}
                        >
                          {column.id === "srNo"
                            ? String(
                                page * rowsPerPage + rowIndex + 1
                              ).padStart(2, "0")
                            : typeof row[column.id] === "object" &&
                              row[column.id]?.render !== undefined
                            ? row[column.id].render
                            : row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-4 px-4 py-3"> */}
      {/* <span className="text-center sm:text-left block">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, rows.length)} of {rows.length}{" "}
          Entries
        </span> */}

      <div className="flex justify-end items-center text-sm gap-2 pt-2 text-[#7F7D7D] mr-3">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className={`border border-[#7F7D7D] rounded-md px-2 py-0.5 ${
            page === 0 ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        <button className="border border-[#7F7D7D] rounded-md px-2 py-0.5 ">
          {page + 1}
        </button>

        <button
          disabled={(page + 1) * rowsPerPage >= rows.length}
          onClick={() =>
            setPage((p) => ((p + 1) * rowsPerPage < rows.length ? p + 1 : p))
          }
          className={`border border-[#7F7D7D] rounded-md px-2 py-0.5 ${
            (page + 1) * rowsPerPage >= rows.length
              ? "opacity-60 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
      {/* </div> */}
    </Paper>
  );
}
