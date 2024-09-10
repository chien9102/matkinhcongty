import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Modal, Box, Typography, TextField, Button, Alert, Snackbar, IconButton } from '@mui/material';
import { addDocument, fetchDocuments, deleteDocument } from "../../services/FirebaseService";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Categories(props) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [errors, setErrors] = useState({ name: '', description: '' });
  const [successMessage, setSuccessMessage] = useState(false); // Trạng thái cho Snackbar
  const [update,setUpdate] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
  const [idDelete,setIdDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchDocuments('categories');
      setCategories(categoriesData);
    };
    fetchData();
  }, [update]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = category.name ? '' : 'Name is required';
    tempErrors.description = category.description ? '' : 'Description is required';
    setErrors(tempErrors);
    return !tempErrors.name && !tempErrors.description;
  };

  const handleSubmit = async () => {
    if (validate()) {
      await addDocument("categories", category);
      setCategory({});
      handleClose();
      setUpdate(!update);
      // Hiển thị thông báo thành công
      setSuccessMessage(true);
    }
  };

  const onEdit = () => {

  }

  const onDelete = (element) => {
     setDeleteModalOpen(true);
     setIdDelete(element.id);
  }
  const handleDelete = async () => {
        if(idDelete) {
           await  deleteDocument("categories", idDelete);  
           setUpdate(!update);
           setDeleteModalOpen(false);
        }
  };
  const handleSnackbarClose = () => {
    setSuccessMessage(false); // Đóng Snackbar khi hết thời gian
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);
  return (
    <div>
      <div className="flex justify-between p-6">
        <h1 className='text-2xl'><b>List Categories</b></h1>
        <div >
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <Button><i class="fa-solid fa-magnifying-glass"></i></Button>
            </div>

          </ButtonGroup>
        </div>

        <div>
          <Button variant="contained" onClick={handleOpen}>Add Category</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-category-modal-title"
            aria-describedby="add-category-modal-description"
          >
            <Box sx={style}>
              <Typography id="add-category-modal-title" variant="h6" component="h2">
                Add New Category
              </Typography>
              <TextField
                id="category-name"
                label="Category Name"
                fullWidth
                value={category && category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
              />
              <TextField
                id="category-description"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={category && category.description}
                onChange={(e) => setCategory({ ...category, description: e.target.value })}
                error={!!errors.description}
                helperText={errors.description}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Add Category
              </Button>
            </Box>
          </Modal>
        </div>
      </div>

      <div className='w-11/12 ml-11'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((element, index) => (
                <TableRow
                  key={element.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{element.name}</TableCell>
                  <TableCell align="right">{element.description}</TableCell>
                  <TableCell align="right">
                    {/* Nút Edit */}
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(element)}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </IconButton>

                    {/* Nút Delete */}
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(element)}
                    >
                      <i class="fa-solid fa-trash"></i>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Snackbar hiển thị thông báo thành công */}
        <Snackbar
          open={successMessage}
          autoHideDuration={3000} // 3 giây
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Category added successfully!
          </Alert>
        </Snackbar>
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
    </div>
  );
}

export default Categories;