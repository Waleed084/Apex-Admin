import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'submissionDate', label: 'Submission Date', minWidth: 170 },
  { id: 'Type', label: 'Type', minWidth: 100 },
  { id: 'Seller', label: 'Seller Name', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'route', label: 'Route', minWidth: 100 },
  { id: 'size', label: 'Size', minWidth: 100 },
  { id: 'Color', label: 'Color', minWidth: 100 },
  { id: 'HeadBoard', label: 'Head Board', minWidth: 170 },
  { id: 'mattress', label: 'Mattress', minWidth: 120 },
  { id: 'ottoman', label: 'Ottoman Box', minWidth: 100 },
  { id: 'Glift', label: 'Gas lift', minWidth: 100 },
  { id: 'threeD', label: '3D Upgrade', minWidth: 100 },
  { id: 'Company', label: 'Company', minWidth: 100 },
  { id: 'totalPrice', label: 'Calculated Price', minWidth: 100 },
  { id: 'customerDetails', label: 'Customer Details', minWidth: 150 },
  { id: 'postalCode', label: 'Postal Code', minWidth: 100 },
  { id: 'remarks', label: 'Seller Remarks', minWidth: 100 },
  { id: 'sprice', label: 'Seller Price', minWidth: 100 },
  { id: 'profit', label: 'Topup/Less', minWidth: 100 }
  // Add more columns as needed based on your schema
];

const SleighHeadTable = ({ orders }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left" // Align left for text-based data
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const submissionDate = new Date(row.submissionDate);
                const formattedSubmissionDate = submissionDate.toLocaleString();

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                  >
                    {columns.map((column) => {
                      const value = column.id === 'submissionDate' ? formattedSubmissionDate : row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

SleighHeadTable.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default SleighHeadTable;
