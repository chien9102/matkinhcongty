import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Modal, Box, Typography, TextField, Button, Alert, Snackbar, IconButton ,TablePagination } from '@mui/material';
import { addDocument, fetchDocuments, deleteDocument, updateDocument } from "../../services/FirebaseService";
import ModalDelete from './ModalDelete';
import { style } from '../../utils/Constants';

function Categories(props) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [errors, setErrors] = useState({ name: '', description: '' });
  const [update, setUpdate] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
  const [idDelete, setIdDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success', });
  const [search, setSearch] = useState("");
  const [productsFilter, setProductFiler] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchDocuments('categories');
      setCategories(categoriesData);
      const filteredCategory = search ? categoriesData.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())) : categoriesData;
      setProductFiler(filteredCategory);
    };
    fetchData();
  }, [update, search]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = category.name ? '' : 'Name is required';
    tempErrors.description = category.description ? '' : 'Description is required';
    setErrors(tempErrors);
    return !tempErrors.name && !tempErrors.description;
  };
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleSubmit = async () => {
    if (validate()) {
      if (category.id) {
        // Nếu đang chỉnh sửa thì cập nhật danh mục
        await updateDocument("categories", category.id, category);
        setSnackbar({
          open: true,
          message: 'Category edited successfully!',
          severity: 'info',
        });
      } else {
        // Nếu không thì thêm mới danh mục
        await addDocument("categories", category);
        setSnackbar({
          open: true,
          message: 'Category added successfully!',
          severity: 'success',
        });
      }
      handleClose();
      setUpdate(!update);
    }
  };

  const onEdit = (element) => {
    setCategory(element); // Gán danh mục vào state
    setOpen(true); // Mở modal
  };

  const onDelete = (element) => {
    setDeleteModalOpen(true);
    setIdDelete(element.id);
  };

  const handleDelete = async () => {
    if (idDelete) {
      await deleteDocument("categories", idDelete);
      setSnackbar({
        open: true,
        message: 'Category deleted successfully!',
        severity: 'warning',
      });
      setUpdate(!update);
      setDeleteModalOpen(false);
    }
  };

  const handleOpen = () => {
    setCategory([]);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  // State quản lý trang hiện tại và số hàng mỗi trang
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng mỗi trang

  // Hàm thay đổi trang
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  // Hàm thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };
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
            <input onChange={(e) => setSearch(e.target.value)} type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                {category.id ? "Edit" : "Add"} Category
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
                {category.id ? "Edit" : "Add"} Category
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
              {productsFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, index) => (
                <TableRow
                  key={element.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{element.name}</TableCell>
                  <TableCell align="right">{element.description.length > 25 ? `${element.description.substring(0, 25)}...` : element.description}</TableCell>
                  <TableCell className='flex' align="right">
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
          {/* Phân trang */}
          <TablePagination
                            component="div"
                            count={categories.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Rows per page"
                            rowsPerPageOptions={[5, 10, 25]}
                        />
        </TableContainer>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        <ModalDelete handleDelete={handleDelete} deleteModalOpen={deleteModalOpen} handleDeleteModalClose={handleDeleteModalClose} />
      </div>
    </div>
  );
}

export default Categories;