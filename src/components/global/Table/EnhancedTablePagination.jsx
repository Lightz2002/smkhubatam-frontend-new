import { TablePagination } from "@mui/material";

function EnhancedTablePagination(props) {
  const { rows, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    props;

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default EnhancedTablePagination;
