import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import axios from 'axios';

const DevanHeadTable = ({ orders }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleSaveChanges = async (orderId) => {
    try {
      await axios.put(`/api/commission/devan/${orderId}`, editedData[orderId]);
      console.log('Changes saved successfully for order:', orderId);
      setEditingRowId(null);
      setEditedData({});
      // Refresh orders here if needed
    } catch (error) {
      console.error('Error saving changes for order:', orderId, error);
    }
  };

  const handleEditClick = (orderId) => {
    setEditingRowId(orderId);
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
    setEditedData({});
  };

  const handleFieldChange = (event, orderId, columnId) => {
    const { value } = event.target;
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [orderId]: {
        ...prevEditedData[orderId],
        [columnId]: value
      }
    }));
    // Implement any validation if needed
    // For simplicity, we directly update the state here
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [orderId]: {
        ...prevErrors[orderId],
        [columnId]: null
      }
    }));
  };

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
        <table>
          <thead>
            <TableRow>
              <TableCell>Actions</TableCell>
              {Object.keys(orders[0]).map((key) => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  {editingRowId === order._id ? (
                    <>
                      <Button onClick={() => handleSaveChanges(order._id)}>
                        <DoneAllTwoToneIcon />
                      </Button>
                      <Button onClick={handleCancelClick}>
                        <ModeEditOutlineTwoToneIcon />
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => handleEditClick(order._id)}>
                      <ModeEditOutlineTwoToneIcon />
                    </Button>
                  )}
                </TableCell>
                {Object.entries(order).map(([key, value]) => (
                  <TableCell key={key}>
                    {editingRowId === order._id ? (
                      <TextField
                        value={editedData[order._id]?.[key] || value || ''}
                        onChange={(event) =>
                          handleFieldChange(event, order._id, key)
                        }
                      />
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </table>
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

DevanHeadTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Add other prop validations here
    })
  ).isRequired,
};

export default DevanHeadTable;
