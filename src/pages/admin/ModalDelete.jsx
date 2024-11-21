import React from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, Snackbar, IconButton } from '@mui/material';
import { style } from '../../utils/Constants';

function ModalDelete({ deleteModalOpen, handleDeleteModalClose, handleDelete  }) {
    return (
        <div>
             {/* Modal xác nhận xóa */}
        <Modal
          open={deleteModalOpen}
          onClose={handleDeleteModalClose}
          aria-labelledby="delete-category-modal-title"
          aria-describedby="delete-category-modal-description"
        >
          <Box sx={style}>
            <Typography id="delete-category-modal-title" variant="h6" component="h2">
              Confirm Delete
            </Typography>
            <Typography id="delete-category-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this category?
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
              sx={{ mt: 2, mr: 2 }}
            >
              Yes, Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleDeleteModalClose}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
        </div>
    );
}

export default ModalDelete;