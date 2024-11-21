import React, { useEffect, useState } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, ButtonGroup, Box, TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDocument, fetchDocuments, deleteDocument, updateDocument } from "../../../services/FirebaseService";
import ModalDelete from '../ModalDelete';
import { style } from '../../../utils/Constants';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Brands(props) {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({ name: '', description: '' });
    const [brands, setbrands] = useState([]);
    const [brand, setbrand] = useState({});
    const [update, setUpdate] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Trạng thái mở Modal Delete
    const [idDelete, setIdDelete] = useState(null);
    const [search, setSearch] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success', });
    const [productsFilter, setProductFiler] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const brandData = await fetchDocuments('Brands');
            setbrands(brandData);
            const filteredBrands = search ? brandData.filter(brand =>
                brand.name.toLowerCase().includes(search.toLowerCase())) : brandData;
            setProductFiler(filteredBrands);
        };
        fetchData();
    }, [update, search]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = brand.name ? '' : 'Name is required';
        tempErrors.description = brand.description ? '' : 'Description is required';
        setErrors(tempErrors);
        return !tempErrors.name && !tempErrors.description;
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (brand.id) {
                // Nếu đang chỉnh sửa thì cập nhật danh mục
                await updateDocument("Brands", brand.id, brand);
                setSnackbar({
                    open: true,
                    message: 'Brands edited successfully!',
                    severity: 'info',
                });
            } else {
                // Nếu không thì thêm mới danh mục
                await addDocument("Brands", brand);
                setSnackbar({
                    open: true,
                    message: 'Brands added successfully!',
                    severity: 'success',
                });
            }
            handleClose();
            setUpdate(!update);
        }
    };
    const handleDelete = async () => {
        if (idDelete) {
            await deleteDocument("Brands", idDelete);
            setUpdate(!update);
            setDeleteModalOpen(false);
            setSnackbar({
                open: true,
                message: 'Brands deleted successfully!',
                severity: 'warning',
            });
            
        }
    };

    const onEdit = (element) => {
        setbrand(element); // Gán danh mục vào state
        setErrors({});
        setOpen(true); // Mở modal
    };

    const onDelete = (element) => {
        setDeleteModalOpen(true);
        setIdDelete(element.id);
    };

    const handleOpen = () => {
        setOpen(true);
        setbrand({});
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
            <div>
                <div className="flex justify-between p-6">
                    <h1 className='text-2xl'><b>List Brand</b></h1>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <div class="input-group">
                            <input onChange={(e) => setSearch(e.target.value)} type="text" class="form-control" placeholder="Seacrh ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <Button><i class="fa-solid fa-magnifying-glass"></i></Button>
                        </div>
                    </ButtonGroup>
                    <div className="div">
                        <Button variant="contained" onClick={handleOpen}>Add brand</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="add-brand-modal-title"
                            aria-describedby="add-brand-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="add-brand-modal-title" variant="h6" component="h2">
                                    {brand.id ? "Edit" : "Add"}  Brands
                                </Typography>
                                <TextField
                                    id="brand-name"
                                    label="Brand Name"
                                    fullWidth
                                    value={brand && brand.name}
                                    onChange={(e) => setbrand({ ...brand, name: e.target.value })}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    margin="normal"
                                />
                                <TextField
                                    id="brand-description"
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={brand && brand.description}
                                    onChange={(e) => setbrand({ ...brand, description: e.target.value })}
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
                                    {brand.id ? "Edit" : "Add"}  Brands
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
                        {/* Phân trang */}
                        <TablePagination
                            component="div"
                            count={brands.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Rows per page"
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </TableContainer>
                </div>
            </div>
            <ModalDelete handleDelete={handleDelete} deleteModalOpen={deleteModalOpen} handleDeleteModalClose={handleDeleteModalClose} />
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
        </div>
    );
}

export default Brands;