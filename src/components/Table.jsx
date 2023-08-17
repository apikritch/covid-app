import React from "react";
import {
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableBody,
  TableContainer,
  Table as TB,
} from "@mui/material";

const columns = [
  { id: "date", label: "Date", minWidth: 170 },
  {
    id: "people",
    label: "People",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const Table = (props) => {
  const { data } = props;

  const rows = data;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex justify-center">
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        className="!rounded-2xl !shadow-sm !drop-shadow-sm">
        <TableContainer sx={{ maxHeight: 535 }}>
          <TB
            stickyHeader
            aria-label="sticky TB">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="!bg-black !text-white 2xs:!px-4 xs:!px-8 sm:!px-28 md:!px-32 lg:!px-48 xl:!px-12 2xl:!px-36 3xl:!px-44">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            className="2xs:!px-4 xs:!px-8 sm:!px-28 md:!px-32 lg:!px-48 xl:!px-12 2xl:!px-36 3xl:!px-44"
                            key={column.id}
                            align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </TB>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Table;
